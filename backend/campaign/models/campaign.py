import uuid 
import random
from django.db import models
from configuration.utils import tz_now
from user.models import User


def room_code_gen():
    return uuid.uuid4().hex[:7].upper()

class Campaign(models.Model):
    room_code = models.CharField(max_length=7, unique=True, default=room_code_gen)
    title = models.CharField(max_length=30, blank=False)
    created_at = models.DateField(default=tz_now)
    created_by = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)

    def save(self, *args, **kwargs):
        chars = list(range(48,57))+list(range(65,90))
        code = ""
        while code in Campaign.objects.filter(room_code=code) or code == "":
            code = ""
            for _ in range(7):
                code += chr(chars[random.randrange(len(chars))])

        self.room_code = code
        super(Campaign, self).save(*args,**kwargs)


