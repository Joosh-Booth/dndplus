from django import forms

from user.models import User, username_allowed
from campaign.models import Campaign, Invitation

class InvitationForm(forms.ModelForm):
    def clean(self, *args, **kwargs):
        cleaned_data=super().clean()
        sent_to = cleaned_data.get("sent_to")
        room_code = cleaned_data.get("room_code")
        sent_by = cleaned_data.get("sent_by")

        user = User.objects.filter(username=sent_to).first()
        game = Campaign.objects.filter(room_code=room_code)

        if not user:
            self.add_error("sent_to", "User does not exist")

        if user and user == sent_by:
            self.add_error("sent_to", "You cannot invite yourself")

        if user and game:
            if game in user.invitations.filter(responded=False).all():
                self.add_error("sent_to", "This user already has an invitation")
            if game in user.campaigns.all():
                self.add_error("sent_to", "This user is already in the campaign")

        if not game:
            self.add_error("room_code", "Game does not exist")



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
