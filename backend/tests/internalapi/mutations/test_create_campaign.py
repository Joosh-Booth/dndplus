import pytest

from django.core import mail

from campaign.models import Campaign as DjangoCampaign
from tests.user.factories import UserFactory
from tests.campaign.factories import CampaignFactory
from user.models import User as DjangoUser


@pytest.mark.django_db
class TestCreateCampaignMutation:
    mutation = """
        mutation createCampaignMutation($input: CreateCampaignInput!) {
            createCampaign(input: $input) {
                __typename
                ... on CreateCampaignSuccess {
                    campaign {
                        title
                        roomCode
                    }
                }
                ... on CreateCampaignError {
                    nonFieldErrors
                    fieldErrors {
                        fieldName
                        errors
                    }
                }
            }
        }
    """


    @pytest.fixture
    def user(self):
        return UserFactory(email="testymctestface@flatmatch.com")

    @pytest.fixture
    def client(self, user, graphql_client_factory):
        return graphql_client_factory(user=user)

    @pytest.fixture
    def variable_values(self):
        return {
            "input": {
                "title": "My sick campaign",
            }
        }

    def test_create_campaign_success(self, variable_values, client, user):
        assert DjangoCampaign.objects.count() == 0
        response = client.execute(self.mutation, variable_values=variable_values)
        result = response["data"]["createCampaign"]

        assert result["__typename"] == "CreateCampaignSuccess"
        campaign_response = result["campaign"]
        assert campaign_response["title"] =="My sick campaign"
        assert DjangoCampaign.objects.count() == 0

    def test_create_campaign_fail(self, variable_values, client):
        variable_values['input']['title']="This title is too long too be accepted"
        assert DjangoCampaign.objects.count() == 0
        response = client.execute(self.mutation, variable_values=variable_values)
        result = response["data"]["createCampaign"]

        assert result["__typename"] == "CreateCampaignError"
        assert result["fieldErrors"][0]["fieldName"] =="TITLE"
        assert DjangoCampaign.objects.count() == 0