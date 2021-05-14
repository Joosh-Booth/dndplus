import graphene
from django.contrib.auth import authenticate
from django.core.exceptions import NON_FIELD_ERRORS
from graphql_jwt.exceptions import JSONWebTokenError
from graphql_jwt.shortcuts import get_token, get_user_by_token
from graphql_jwt.decorators import login_required
from internalapi.definitions.user import User

class IsAuthenticatedInput(graphene.InputObjectType):
    token = graphene.String(required=True)
    id = graphene.Int(required=True)


class IsAuthenticatedError(graphene.ObjectType):
    errors = graphene.List(graphene.NonNull(graphene.String), required=True)


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
        print(dir(info.context))
        print("info.context.errors")
        errors = []
        try:
            if get_user_by_token(input_data.token).id == input_data.id:
                return(IsAuthenticatedSuccess(string="returned"))
            else:
                errors.append("ID does not match user")
                return(IsAuthenticatedError(errors=errors))

        except Exception as e: 
            if isinstance(e, JSONWebTokenError):
                errors.append("Authentication Token invalid please relog and try again")
                return(IsAuthenticatedError(errors=errors))
        
        
