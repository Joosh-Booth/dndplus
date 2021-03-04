import pytest

from tests.user.factories import UserFactory
from user.models import User

@pytest.mark.django_db
class TestUserModel:

    @pytest.fixture
    def user(self):
        return UserFactory(username="user1", is_active=True, is_staff=False)

    @pytest.fixture
    def staff_user(self):
        return UserFactory(username="user2", is_active=True, is_staff=True)

    @pytest.fixture
    def inactive_user(self):
        return UserFactory(username="user3", is_active=False, is_staff=False)

    def test_active_non_staff(self, user, staff_user, inactive_user):
        assert User.objects.count() == 3
        assert User.objects.get_queryset().filter(is_active=True, is_staff=False).count() == 1