import uuid 
from django.db import models
from configuration.utils import tz_now
from user.models import User

class Campaign(models.Model):
    roomCode = models.CharField(max_length=7, unique=True, default=uuid.uuid4().hex[:7].upper())
    title = models.CharField(max_length=24, blank=False)
    created_at = models.DateField(default=tz_now)
    created_by = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)

    def save(self, *args, **kwargs):
        chars = list(range(48,57))+list(range(65,90))
        code = ""
        while code in Campaign.objects.filter(roomCode=code) or code == "":
            code = ""
            for _ in range(7):
                code += chr(chars[random.randrange(len(chars))])

        self.roomCode = code
        super(Campaign, self).save(*args,**kwargs)


