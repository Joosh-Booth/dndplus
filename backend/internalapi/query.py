import graphene

from user.models import User as DjangoUser
from .definitions.user import User

class RootQuery(graphene.ObjectType):

    user_by_reference = graphene.Field(User, required=False, reference=graphene.String(required=True))
    is_allowed_on_page = graphene.Boolean(required=True,page=graphene.String(required=True))


    def resolve_user_by_reference(root, info, reference):
      return DjangoUser.objects.filter(reference=reference).first()

    def resolve_is_allowed_on_page(root, info, page):
      print(page)
      print(info.context)
      return True