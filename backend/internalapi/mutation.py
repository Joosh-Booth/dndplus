import graphene

from .mutations.user.create_user import CreateUser


class RootMutation(graphene.ObjectType):
    create_user = CreateUser.Field()
