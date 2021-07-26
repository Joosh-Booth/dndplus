from django import forms

from user.models import User, username_allowed
from campaign.models import Campaign, Invitation

class InvitationForm(forms.ModelForm):
    def clean(self):
        cleaned_data=super().clean()
        sent_to = cleaned_data.get("sent_to")
        game = cleaned_data.get("game")
        sent_by = cleaned_data.get("sent_by")

        if sent_to == sent_by:
            self.add_error("sent_to", "You cannot invite yourself")

        if Invitation.objects.filter(sent_to=sent_to, game=game, responded=False).exists():
            self.add_error("sent_to", "This user already has an invitation")
            
        if game in sent_to.campaigns.all():
            self.add_error("sent_to", "This user is already in the campaign")


    class Meta:
        model = Invitation
        fields = (
            'sent_by',
            'sent_to',
            'game',
        )


class NewInvitationForm(InvitationForm):

    def save(self, commit=True):
        invitation = super().save()
        return invitation
