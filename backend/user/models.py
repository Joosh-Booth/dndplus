from configuration.utils import (tz_now, number_generator)
from django.db import models


# class UserManager(BaseUserManager):
#     use_in_migrations = True

#     def active_non_staff(self):
#         return self.get_queryset().filter(is_active=True, is_staff=False, user_type__isnull=False)

#     def _create_user(self, email, password, **extra_fields):
#         if not email:
#             raise ValueError('An email is required')

#         email = self.normalize_email(email)
#         user = self.model(email=email, **extra_fields)
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, email, password, **kwargs):
#         kwargs.update({
#             'email': email,
#             'password': password,
#             'is_staff': True
#         })
#         return self._create_user(**kwargs)


# def reference_generator():
#     return number_generator(10)


# def profile_photo_upload_destination(instance, filename):
#     return f'people/{instance.reference}/images/{filename}'






def reference_generator():
    return number_generator(10)


class User(models.Model):
    email = models.EmailField(primary_key=True, unique=True)
    email_verified = models.BooleanField(default=False)
    given_names = models.CharField(max_length=127, null=True, blank=True)
    last_name = models.CharField(max_length=127, null=True, blank=True)
    status = models.BooleanField(default=True)
    date_of_birth = models.DateField(null=True, blank=True)
    date_joined = models.DateField(default=tz_now)
#    profile_photo = models.ImageField(
#        max_length=250, upload_to=profile_photo_upload_destination_TO_BE_CHANGED, null=True, blank=True
#    )

    # Permissions
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    reference = models.CharField(max_length=10, default=reference_generator, unique=True)

    # REQUIRED_FIELDS = []
    # USERNAME_FIELD = "email"

    # objects = UserManager()

    # @property
    # def name(self):
    #     return f"{self.given_names} {self.last_name}"

    # def has_perm(self, perm, obj=None):
    #     return True

    # def has_module_perms(self, app_label):
    #     return True

    # def get_absolute_url(self):
    #     return build_website_url(f"profile/{self.reference}")
