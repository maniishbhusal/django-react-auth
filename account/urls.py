from . import views
from django.urls import path

urlpatterns = [
    path('register/', views.UserRegistrationView.as_view(), name='register'),
    path('activate/<uid>/<token>/', views.ActivateUserView.as_view(), name='activate'),
    path('login/', views.UserLoginView.as_view(), name='login'),
    path('userprofile/', views.UserProfileView.as_view(), name='userprofile'),
    path('changepassword/', views.ChangePasswordView.as_view(),
         name="changepassword"),
    path('send-reset-password-email/', views.SendPasswordResetEmailView.as_view(),
         name='send-reset-password-email'),
    path('password-reset-confirm/<uid>/<token>/', views.PasswordResetConfirmView.as_view(), name='password-reset-confirm')
]
