import graphene

from django.core.exceptions import NON_FIELD_ERRORS
from internalapi.definitions.user import User
from user.forms.create_user import NewUserForm


class CreateUserInput(graphene.InputObjectType):
    username = graphene.String(required=True)
    email = graphene.String(required=True)
    password = graphene.String(required=True)

class CreateUserFieldName(graphene.Enum):
    EMAIL = 'email'
    PASSWORD = 'password'
    USERNAME = 'username'

class CreateUserInvalidField(graphene.ObjectType):
    field_name = graphene.Field(CreateUserFieldName, required=True)
    errors = graphene.List(graphene.NonNull(graphene.String), required=True)


class CreateUserError(graphene.ObjectType):
    non_field_errors = graphene.List(graphene.NonNull(graphene.String), required=True)
    field_errors = graphene.List(
        graphene.NonNull(CreateUserInvalidField), required=True
    )


class CreateUserSuccess(graphene.ObjectType):
    user = graphene.Field(User, required=True)


class CreateUserPayload(graphene.Union):
    class Meta:
        types = (CreateUserError, CreateUserSuccess)


class CreateUser(graphene.Mutation):
    class Arguments:
        input_data = CreateUserInput(required=True, name="input")

    Output = graphene.NonNull(CreateUserPayload)

    def mutate(self, info, input_data):

        form = NewUserForm(data=input_data)
        if form.is_valid():
            user = form.save()
            #send_new_user_email(user)
            return CreateUserSuccess(user=user)

        field_errors = []
        non_field_errors = []
        for field, errors in form.errors.items():
            if field == NON_FIELD_ERRORS:
                non_field_errors.extend(errors)
                continue
            field_name = CreateUserFieldName.get(field)
            field_errors.append(
                CreateUserInvalidField(field_name=field_name.value, errors=errors)
            )

        return CreateUserError(
            non_field_errors=non_field_errors, field_errors=field_errors
        )