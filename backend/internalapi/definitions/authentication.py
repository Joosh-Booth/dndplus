import graphene

class PageInput(graphene.InputObjectType):
    page = graphene.String(required=True)
    params = graphene.String(required=False)
    
