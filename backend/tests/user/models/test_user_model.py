import pytest

from tests.user.factories import UserFactory
from user.models import User

@pytest.mark.django_db
class TestUserModel:

    @pytest.fixture
    def user(self):
        return UserFactory(is_active=True, is_staff=False)

    @pytest.fixture
    def staff_user(self):
        return UserFactory(is_active=True, is_staff=True)

    @pytest.fixture
    def inactive_user(self):
        return UserFactory(is_active=False, is_staff=False)

    def test_active_non_staff(self, user, staff_user, inactive_user):
        assert User.objects.count() == 3
        assert User.objects.get_queryset().filter(is_active=True, is_staff=False).count() == 1