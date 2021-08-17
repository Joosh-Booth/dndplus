from campaign.models import Campaign
import graphene

from campaign.models import Campaign as DjangoCampaign
from user.models import User as DjangoUser
from .definitions.campaign import Campaign
from .definitions.invitation import Invitation
from .definitions.user import User
from .definitions.authentication import PageInput

class RootQuery(graphene.ObjectType):

    user_by_reference = graphene.Field(User, required=False, reference=graphene.String(required=True))
    is_allowed_on_page = graphene.Boolean(required=True, page=PageInput(required=True,name="input"))
    campaign_by_reference = graphene.Field(Campaign, required=False, reference=graphene.String(required=True))
    campaign_by_user = graphene.List(Campaign, required=True)
    invitations_by_user = graphene.List(Invitation, required=True)

    def resolve_user_by_reference(root, info, reference):
      return DjangoUser.objects.filter(reference=reference).first()

    def resolve_is_allowed_on_page(root, info, page):
      # get contexr.use.id and check if theyre allowed on page. If page is campaign get campaign reference.
      return page_authentication(page, info.context.user)

    def resolve_campaign_by_reference(root, info, reference):
      return DjangoCampaign.objects.filter(room_code=reference).first()

    def resolve_campaign_by_user(root, info):
      return info.context.user.campaigns.all()

    def resolve_invitation_by_user(root, info):
      return info.context.user.invitations.all()

def page_authentication(page, user):
    if page.page == "campaign":
        if user.campaigns.filter(room_code=page.params).exists():
            return True
    return False  