from rest_framework import serializers
from django.utils.encoding import force_bytes, smart_str
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import DjangoUnicodeDecodeError
from .models import User
from .utils import Util
from .tokens import account_activation_token  

class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(
        write_only=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['email', 'name', 'tc', 'password', 'password2']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        password = data.get('password')
        password2 = data.get('password2')

        if password != password2:
            raise serializers.ValidationError("Passwords must match")

        return data

    def create(self, validated_data):
        # It is crucial to ensure that sensitive data like password2 is not inadvertently passed to the create_user method to maintain data security and prevent potential vulnerabilities.
        if 'password2' in validated_data:
            del validated_data['password2']
        user = User.objects.create_user(**validated_data)
        user.is_active = False  # Deactivate account until it is confirmed
        user.save()

        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = account_activation_token.make_token(user)
        activation_link = f"http://localhost:8000/api/user/activate/{
            uid}/{token}"

        # Send activation email
        email_body = f"Hi {user.name},\nUse the link below to activate your account:\n{
            activation_link}"
        data = {
            'subject': 'Activate your account',
            'body': email_body,
            'to_email': user.email
        }
        # Handle potential email sending failures gracefully
        try:
            Util.send_email(data)
        except Exception as e:
            print(f"Failed to send activation email: {e}")
        # print(activation_link)

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
