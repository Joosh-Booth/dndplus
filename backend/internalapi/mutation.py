import graphene

from .mutations.user.create_user import CreateUser
from .mutations.user.authorise_user import AuthoriseUser


class RootMutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    authorise_user = AuthoriseUser.Field()
