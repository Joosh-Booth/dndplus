# Generated by Django 3.1.7 on 2021-05-17 16:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('campaign', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='campaign',
            name='roomCode',
        ),
        migrations.AddField(
            model_name='campaign',
            name='room_code',
            field=models.CharField(default='CF0217E', max_length=7, unique=True),
        ),
        migrations.AlterField(
            model_name='campaign',
            name='title',
            field=models.CharField(max_length=30),
        ),
    ]
