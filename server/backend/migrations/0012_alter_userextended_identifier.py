# Generated by Django 4.2.6 on 2023-10-27 15:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0011_alter_userextended_identifier_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userextended',
            name='identifier',
            field=models.CharField(max_length=900, unique=True),
        ),
    ]
