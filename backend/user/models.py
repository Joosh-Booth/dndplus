import re
from configuration.utils import (tz_now, number_generator)
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.db import models


class UserManager(BaseUserManager):
    use_in_migrations = True

    def active_non_staff(self):
        return self.get_queryset().filter(is_active=True, is_staff=False, user_type__isnull=False)

    def _create_user(self,  username, email, password, **extra_fields):
        if not email:
            raise ValueError('An email is required')
        if not username:
            raise ValueError('A username is required')

        
        username = username
        email = self.normalize_email(email)
        user = self.model(username=username,email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password, **kwargs):
        print(username)
        kwargs.update({
            'email': username,
            'username':username,
            'password': password,
            'is_staff': True
        })
        return self._create_user(**kwargs)


def reference_generator():
    return number_generator(10)

def username_allowed(string):
    return re.compile("^[a-zA-Z0-9]*$").search(string) if string else False

class User(AbstractBaseUser):
    email = models.EmailField(unique=True)
    email_verified = models.BooleanField(default=False)
    username = models.CharField(max_length=15, null=True, unique=True)
    campaigns = models.ManyToManyField("campaign.Campaign", null=False)

    #status = models.BooleanField(default=True)
    date_of_birth = models.DateField(null=True, blank=True)
    date_joined = models.DateField(default=tz_now)
    
    # Permissions
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    reference = models.CharField(max_length=10, default=reference_generator, unique=True)

    #REQUIRED_FIELDS = ['email']
    USERNAME_FIELD = "username"
    EMAIL_FIELD='email'
    objects = UserManager()

    @property
    def name(self):
        return f"{self.given_names} {self.last_name}"

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    def get_absolute_url(self):
        return build_website_url(f"profile/{self.reference}")
