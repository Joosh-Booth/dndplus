import graphene
from django.core.exceptions import NON_FIELD_ERRORS
from graphql_jwt.decorators import login_required
from internalapi.definitions.campaign import Campaign
from campaign.forms.create_invitation import NewInvitationForm
from campaign.models import Campaign
from user.models import User


class CreateInvitationInput(graphene.InputObjectType):
    sent_to = graphene.String(required=True)
    room_code=graphene.String(required=True)

class CreateInvitationFieldName(graphene.Enum):
    SENT_TO = 'sent_to'
    ROOM_CODE = "room_code"

class CreateInvitationInvalidField(graphene.ObjectType):
    field_name = graphene.Field(CreateInvitationFieldName, required=True)
    errors = graphene.List(graphene.NonNull(graphene.String), required=True)


class CreateInvitationError(graphene.ObjectType):
    non_field_errors = graphene.List(graphene.NonNull(graphene.String), required=True)
    field_errors = graphene.List(
        graphene.NonNull(CreateInvitationInvalidField), required=True
    )


class CreateInvitationSuccess(graphene.ObjectType):
    message = graphene.String()


class CreateInvitationPayload(graphene.Union):
    class Meta:
        types = (CreateInvitationError, CreateInvitationSuccess)


class CreateInvitation(graphene.Mutation):
    class Arguments:
        input_data = CreateInvitationInput(required=True, name="input")

    Output = graphene.NonNull(CreateInvitationPayload)

    @login_required
    def mutate(self, info, input_data):
        data={}
        data["sent_by"] =  info.context.user

        field_errors = []
        non_field_errors = []

        if User.objects.filter(username=input_data.sent_to).exists():
            sent_to = User.objects.filter(username=input_data.sent_to).first()
            data["sent_to"]=sent_to
        else:
            field_errors.append(
                CreateInvitationInvalidField(
                    field_name=CreateInvitationFieldName.get("sent_to"),
                    errors="User does not Exist"
                )
            )

        if Campaign.objects.filter(room_code=input_data.room_code).exists():
            data["game"] = Campaign.objects.filter(room_code=input_data.room_code).first()
        else:
            field_errors.append(
                CreateInvitationInvalidField(
                    field_name=CreateInvitationFieldName.get("room_code"),
                    errors="Game does not Exist"
                )
            )

        if not len(field_errors)>0:
            form = NewInvitationForm(data=data)
            if form.is_valid():
                invitation = form.save()
                data["sent_to"].invitations.add(invitation)
                
                return CreateInvitationSuccess(message="Success")

            
            for field, errors in form.errors.items():
                if field == NON_FIELD_ERRORS:
                    non_field_errors.extend(errors)
                    continue
                field_name = CreateInvitationFieldName.get(field)
                field_errors.append(
                    CreateInvitationInvalidField(field_name=field_name.value, errors=errors)
                )

        return CreateInvitationError(
            non_field_errors=non_field_errors, field_errors=field_errors
        )
