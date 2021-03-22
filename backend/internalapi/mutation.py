import graphene

from .mutations.user.create_user import CreateUser
from .mutations.user.authorise_user import AuthoriseUser
from .mutations.user.is_authenticated import IsAuthenticated


class RootMutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    authorise_user = AuthoriseUser.Field()
    is_authenticated = IsAuthenticated.Field()
