import graphene
from django.contrib.auth import authenticate

from django.core.exceptions import NON_FIELD_ERRORS
from graphql_jwt.shortcuts import get_token, get_user_by_token
from internalapi.definitions.user import User


class AuthoriseUserInput(graphene.InputObjectType):
    username = graphene.String(required=True)
    password = graphene.String(required=True)

class AuthoriseUserFieldName(graphene.Enum):
    USERNAME = 'username'
    PASSWORD = 'password'

class AuthoriseUserInvalidField(graphene.ObjectType):
    field_name = graphene.Field(AuthoriseUserFieldName, required=True)
    errors = graphene.List(graphene.NonNull(graphene.String), required=True)


class AuthoriseUserError(graphene.ObjectType):
    non_field_errors = graphene.List(graphene.NonNull(graphene.String), required=True)


class AuthoriseUserSuccess(graphene.ObjectType):
    user = graphene.Field(User, required=True)
    token = graphene.String(required=True)


class AuthoriseUserPayload(graphene.Union):
    class Meta:
        types = (AuthoriseUserError, AuthoriseUserSuccess)


class AuthoriseUser(graphene.Mutation):
    class Arguments:
        input_data = AuthoriseUserInput(required=True, name="input")

    Output = graphene.NonNull(AuthoriseUserPayload)

    def mutate(self, info, input_data):
        user = authenticate(username=input_data.username, password=input_data.password)

        if user:
          auth_token = get_token(user)
          print(get_user_by_token(auth_token))
          info.context.set_jwt_cookie=auth_token
          return(AuthoriseUserSuccess(user=user, token=auth_token))
        
        return AuthoriseUserError(non_field_errors=["failed"])
