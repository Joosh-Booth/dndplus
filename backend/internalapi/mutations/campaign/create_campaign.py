import graphene

from django.core.exceptions import NON_FIELD_ERRORS
from internalapi.definitions.campaign import Campaign
#create campaign form
from user.forms.create_user import NewUserForm


class CreateCampaignInput(graphene.InputObjectType):
    title = graphene.String(required=True)

class CreateCampaignFieldName(graphene.Enum):
    TITLE = 'title'

class CreateCampaignInvalidField(graphene.ObjectType):
    field_name = graphene.Field(CreateCampaignFieldName, required=True)
    errors = graphene.List(graphene.NonNull(graphene.String), required=True)


class CreateCampaignError(graphene.ObjectType):
    non_field_errors = graphene.List(graphene.NonNull(graphene.String), required=True)
    field_errors = graphene.List(
        graphene.NonNull(CreateCampaignInvalidField), required=True
    )


class CreateCampaignSuccess(graphene.ObjectType):
    campaign = graphene.Field(Campaign, required=True)


class CreateCampaignPayload(graphene.Union):
    class Meta:
        types = (CreateCampaignError, CreateCampaignSuccess)


class CreateCampaign(graphene.Mutation):
    class Arguments:
        input_data = CreateCampaignInput(required=True, name="input")

    Output = graphene.NonNull(CreateCampaignPayload)

    def mutate(self, info, input_data):

        form = NewUserForm(data=input_data)
        if form.is_valid():
            user = form.save()
            return CreateCampaignSuccess(user=user)

        field_errors = []
        non_field_errors = []
        for field, errors in form.errors.items():
            if field == NON_FIELD_ERRORS:
                non_field_errors.extend(errors)
                continue
            field_name = CreateCampaignFieldName.get(field)
            field_errors.append(
                CreateCampaignInvalidField(field_name=field_name.value, errors=errors)
            )

        return CreateCampaignError(
            non_field_errors=non_field_errors, field_errors=field_errors
        )