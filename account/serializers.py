from rest_framework import serializers

from account.utils import Util
from .models import User
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator


class UserRegistrationSerializer(serializers.ModelSerializer):
    # We are writing this because we need to confirm password field in our Registration Request
    password2 = serializers.CharField(
        write_only=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['email', 'name', 'tc', 'password', 'password2']
        extra_kwargs = {'password': {'write_only': True}}

    # Validating password and confirm password while Registration
    def validate(self, data):
        password = data.get('password')
        password2 = data.get('password2')

        if password != password2:
            raise serializers.ValidationError("Passwords must match")

        return data

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)

        return user


class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.CharField(max_length=255)

    class Meta:
        model = User
        fields = ['email', 'password']


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'tc']


class ChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255,
                                     write_only=True, style={'input_type': 'password'})
    confirm_password = serializers.CharField(max_length=255,
                                             write_only=True, style={'input_type': 'password'})

    class Meta:
        fields = ['password', 'confirm_password']

    def validate(self, data):
        password = data.get('password')
        confirm_password = data.get('confirm_password')
        user = self.context.get('user')

        if password != confirm_password:
            raise serializers.ValidationError("Passwords must match")

        user.set_password(password)
        user.save()

        return data

    def create(self, validated_data):
        return validated_data


class SendPasswordResetEmailSerializer(serializers.Serializer):
    email = serializers.EmailField()

    class Meta:
        fields = ['email']

    def validate(self, data):
        email = data.get('email')
        if not User.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                "User with this email does not exist")

        user = User.objects.get(email=email)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = PasswordResetTokenGenerator().make_token(user)
        # link = f"http://localhost:8000/api/user/password-reset-confirm/{
        #     uid}/{token}/"
        link = f"http://localhost:5173/api/user/reset/{uid}/{token}"
        # Send Email
        body = "Click Following Link to Reset Your Password: "+link

        data = {
            "subject": "Reset Your Password",
            "body": body,
            "to_email": user.email
        }

        # Uncomment below code to send email for reseting password
        # Util.send_email(data)
        print("link "+link)
        return data


class PasswordResetConfirmSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255,
                                     write_only=True, style={'input_type': 'password'})
    confirm_password = serializers.CharField(max_length=255,
                                             write_only=True, style={'input_type': 'password'})

    class Meta:
        fields = ['password', 'confirm_password']

    def validate(self, data):
        try:
            password = data.get('password')
            confirm_password = data.get('confirm_password')
            uid = self.context.get('uid')
            token = self.context.get('token')

            if password != confirm_password:
                raise serializers.ValidationError("Passwords must match")

            id = smart_str(urlsafe_base64_decode(uid))
            print("id "+id)
            if not User.objects.filter(pk=id).exists():
                raise serializers.ValidationError("User does not exist")
            user = User.objects.get(pk=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise serializers.ValidationError("Token is not valid")

            user.set_password(password)
            user.save()
            return data

        except DjangoUnicodeDecodeError as identifier:
            PasswordResetTokenGenerator().check_token(user, token)
            raise serializers.ValidationError("Token is not valid")

        def create(self, validated_data):
            return validated_data
