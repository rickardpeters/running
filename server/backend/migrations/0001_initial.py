# Generated by Django 4.1.1 on 2023-10-14 18:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Community',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('community_name', models.CharField(default='', max_length=255)),
                ('description', models.CharField(blank=True, default='No description.', max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='UserExtended',
            fields=[
                ('strava_key', models.CharField(blank=True, default='No key', max_length=255)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Challenge',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(default='', max_length=255)),
                ('goal', models.IntegerField()),
                ('community_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.community')),
            ],
        ),
    ]
