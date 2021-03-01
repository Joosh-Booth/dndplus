import graphene
from .query import RootQuery


schema = graphene.Schema(query=RootQuery)