# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-06-21 05:22
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hosting', '0024_auto_20160607_0231'),
    ]

    operations = [
        migrations.AlterField(
            model_name='virtualmachineplan',
            name='ip',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='virtualmachineplan',
            name='public_key',
            field=models.TextField(blank=True),
        ),
    ]
