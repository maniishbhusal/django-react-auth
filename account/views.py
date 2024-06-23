from django.http import Http404, HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login

from .renderers import UserRenderer
from .tokens import get_tokens_for_user, account_activation_token
from rest_framework.permissions import IsAuthenticated

from .models import User
from .serializers import ChangePasswordSerializer, PasswordResetConfirmSerializer, SendPasswordResetEmailSerializer, UserLoginSerializer, UserProfileSerializer, UserRegistrationSerializer

from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str


# This class handles user registration, sends an activation link via email.
class UserRegistrationView(APIView):
    # renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            token = get_tokens_for_user(user)
            # return Response({'token': token, 'msg': 'Registration Success'}, status=status.HTTP_201_CREATED)
            return Response({'token': token, 'msg': 'Please confirm your email address to complete the registration'}, status=status.HTTP_200_OK)


# This class defines a view for activating a user account using a token sent via email confirmation.
class ActivateUserView(APIView):
    def get(self, request, uid, token, format=None):
        try:
            id = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=id)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and account_activation_token.check_token(user, token):
            user.is_active = True
            user.save()
            # return Response({'msg': 'Account activated successfully'}, status=status.HTTP_200_OK)
            return HttpResponse('Thank you for your email confirmation. Now you can login your account.')
        else:
            # return Response({'error': 'Invalid activation link'}, status=status.HTTP_400_BAD_REQUEST)
            return HttpResponse('Activation link is invalid!')


# This class handles user login and returns a token if successful.
class UserLoginView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            user = authenticate(request, email=email, password=password)
            if user is not None:
                token = get_tokens_for_user(user)
                login(request, user)
                return Response({'token': token, 'msg': 'Login Success'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)


# This class retrieves and returns the authenticated user's profile data.
class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


# This class handles password change requests for authenticated users.
class ChangePasswordView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = ChangePasswordSerializer(
            data=request.data, context={'user': request.user})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Password Changed Successfully'}, status=status.HTTP_200_OK)


# This class sends a password reset link to the user's email.
class SendPasswordResetEmailView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = SendPasswordResetEmailSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # send email
        return Response({'msg': 'Password Reset link send. Please check your Email'}, status=status.HTTP_200_OK)


# This class handles the password reset confirmation process using the token from the email link.
class PasswordResetConfirmView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, uid, token, format=None):
        serializer = PasswordResetConfirmSerializer(
            data=request.data, context={'uid': uid, 'token': token})
        serializer.is_valid(raise_exception=True)
        return Response({'msg': 'Password reset successfully'}, status=status.HTTP_200_OK)
