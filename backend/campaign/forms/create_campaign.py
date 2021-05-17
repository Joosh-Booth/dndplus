from django import forms

from user.models import User, username_allowed
from campaign.models import Campaign

class CampaignForm(forms.ModelForm):

    class Meta:
        model = Campaign
        fields = (
            'title',
        )


class NewCampaignForm(CampaignForm):

    def save(self, commit=True):
        campaign = super().save()
        return campaign
