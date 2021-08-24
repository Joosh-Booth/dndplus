import graphene

from django.core.exceptions import NON_FIELD_ERRORS
from graphql_jwt.decorators import login_required
from internalapi.definitions.campaign import Campaign
from campaign.models.campaign import Campaign as DjangoCampaign


class LeaveCampaignInput(graphene.InputObjectType):
    room_code = graphene.String(required=True)

class LeaveCampaignFieldName(graphene.Enum):
    ROOM_CODE = 'room_code'

class LeaveCampaignInvalidField(graphene.ObjectType):
    field_name = graphene.Field(LeaveCampaignFieldName, required=True)
    errors = graphene.List(graphene.NonNull(graphene.String), required=True)


class LeaveCampaignError(graphene.ObjectType):
    non_field_errors = graphene.List(graphene.NonNull(graphene.String), required=True)
    field_errors = graphene.List(
        graphene.NonNull(LeaveCampaignInvalidField), required=True
    )


class LeaveCampaignSuccess(graphene.ObjectType):
    message = graphene.String(required=True)


class LeaveCampaignPayload(graphene.Union):
    class Meta:
        types = (LeaveCampaignError, LeaveCampaignSuccess)


class LeaveCampaign(graphene.Mutation):
    class Arguments:
        input_data = LeaveCampaignInput(required=True, name="input")

    Output = graphene.NonNull(LeaveCampaignPayload)

    @login_required
    def mutate(self, info, input_data):
        
        campaign = DjangoCampaign.objects.get(room_code=input_data.room_code)
        if campaign:
            info.context.user.campaigns.remove(campaign)
            
            #if owner then delete campagin - create owner field as its not always created_by
            if campaign.owner == info.context.user:
                campaign.delete()

            elif campaign.user_set.count()<1:
                campaign.delete()

            return LeaveCampaignSuccess(message="success")
        print("fail")
        # field_errors = []
        # non_field_errors = []
        # for field, errors in form.errors.items():
        #     if field == NON_FIELD_ERRORS:
        #         non_field_errors.extend(errors)
        #         continue
        #     field_name = LeaveCampaignFieldName.get(field)
        #     field_errors.append(
        #         LeaveCampaignInvalidField(field_name=field_name.value, errors=errors)
        #     )

        # return LeaveCampaignError(
        #     non_field_errors=non_field_errors, field_errors=field_errors
        # )