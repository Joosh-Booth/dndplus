import graphene
from django.contrib.auth import authenticate

from django.core.exceptions import NON_FIELD_ERRORS
from graphql_jwt.shortcuts import get_token, get_user_by_token
from internalapi.definitions.user import User


class AuthenticateUserInput(graphene.InputObjectType):
    username = graphene.String(required=True)
    password = graphene.String(required=True)

class AuthenticateUserFieldName(graphene.Enum):
    USERNAME = 'username'
    PASSWORD = 'password'

class AuthenticateUserInvalidField(graphene.ObjectType):
    field_name = graphene.Field(AuthenticateUserFieldName, required=True)
    errors = graphene.List(graphene.NonNull(graphene.String), required=True)


class AuthenticateUserError(graphene.ObjectType):
    non_field_errors = graphene.List(graphene.NonNull(graphene.String), required=True)


class AuthenticateUserSuccess(graphene.ObjectType):
    user = graphene.Field(User, required=True)
    token = graphene.String(required=True)


class AuthenticateUserPayload(graphene.Union):
    class Meta:
        types = (AuthenticateUserError, AuthenticateUserSuccess)


class AuthenticateUser(graphene.Mutation):
    class Arguments:
        input_data = AuthenticateUserInput(required=True, name="input")

    Output = graphene.NonNull(AuthenticateUserPayload)

    def mutate(self, info, input_data):
        user = authenticate(username=input_data.username, password=input_data.password)

        if user:
          auth_token = get_token(user)          
          return(AuthenticateUserSuccess(user=user, token=auth_token))
        
        return AuthenticateUserError(non_field_errors=["Username and/or password was incorrect"])
