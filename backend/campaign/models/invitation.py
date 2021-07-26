from django.db import models
from configuration.utils import tz_now
from user.models import User
from campaign.models import Campaign

class Invitation(models.Model):
    sent_by = models.ForeignKey(User, related_name="invitation_from", on_delete=models.CASCADE)
    sent_to = models.ForeignKey(User, related_name="Invitation_to", on_delete=models.CASCADE)
    game = models.ForeignKey(Campaign, on_delete=models.CASCADE)
    responded = models.BooleanField(default=False, required=True)
