# Generated by Django 3.1.7 on 2021-03-03 15:06

from django.conf import settings
import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion
import internalapi.models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='PersistedAPISession',
            fields=[
                ('uuid', models.UUIDField(db_index=True, default=uuid.uuid4, primary_key=True, serialize=False)),
                ('data', django.contrib.postgres.fields.jsonb.JSONField(null=True)),
                ('expires_at', models.DateTimeField(db_index=True, default=internalapi.models.default_expires)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='api_sessions', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Persisted API Session',
            },
        ),
    ]
