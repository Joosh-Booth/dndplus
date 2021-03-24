import graphene
from django.contrib.auth import authenticate
from django.core.exceptions import NON_FIELD_ERRORS
from graphql_jwt.shortcuts import get_token, get_user_by_token
from graphql_jwt.decorators import login_required
from internalapi.definitions.user import User


class IsAuthenticatedInput(graphene.InputObjectType):
    token = graphene.String(required=True)
    id = graphene.Int(required=True)

class IsAuthenticatedFieldName(graphene.Enum):
    TOKEN = 'token'
    ID = 'id'

class IsAuthenticatedInvalidField(graphene.ObjectType):
    field_name = graphene.Field(IsAuthenticatedFieldName, required=True)
    errors = graphene.List(graphene.NonNull(graphene.String), required=True)


class IsAuthenticatedError(graphene.ObjectType):
    non_field_errors = graphene.List(graphene.NonNull(graphene.String), required=True)


class IsAuthenticatedSuccess(graphene.ObjectType):
    string = graphene.String(required=True)


class IsAuthenticatedPayload(graphene.Union):
    class Meta:
        types = (IsAuthenticatedError, IsAuthenticatedSuccess)


class IsAuthenticated(graphene.Mutation):
    class Arguments:
        input_data = IsAuthenticatedInput(required=True, name="input")

    Output = graphene.NonNull(IsAuthenticatedPayload)
    @login_required
    def mutate(self, info, input_data):
        print(get_user_by_token(input_data.token).id)
        print(input_data.id)
        if get_user_by_token(input_data.token).id == input_data.id:
          print("Get user by token is True")
        else:
          print("Get user by token is False")
        #info.context.user = get_user_by_token(input_data.token)  
        print("Info.context.user is: ")
        print(info.context.user)

        
        return(IsAuthenticatedSuccess(string="returned"))
        
