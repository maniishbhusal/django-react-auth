from rest_framework_simplejwt.tokens import RefreshToken

# generates and returns refresh and access tokens for a given user
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }