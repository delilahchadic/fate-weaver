# Generated by Django 5.1.7 on 2025-03-30 10:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tarot_cards', '0003_rename_x_spreadposition_left_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='spreadposition',
            name='position',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
