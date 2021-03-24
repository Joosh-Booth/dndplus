from graphql_jwt.shortcuts import get_token, get_user_by_token


class JWTMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        return self.get_response(request)

    def process_view(self, request, view_func, view_args, view_kwargs):
        token = request.META.get('HTTP_AUTHORIZATION', '')

        if not token.startswith('JWT'):
            return

        auth = None
        try:
            auth = get_user_by_token(token[4:])
        except Exception:
            print("Exception in AuthMiddleware raised")
            return

        request.user = auth
        print("AuthMiddleware ended successfully")