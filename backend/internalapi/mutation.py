import graphene

from .mutations.user.create_user import CreateUser
from .mutations.user.authenticate_user import AuthenticateUser
from .mutations.user.is_authenticated import IsAuthenticated


class RootMutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    authenticate_user = AuthenticateUser.Field()
    is_authenticated = IsAuthenticated.Field()
