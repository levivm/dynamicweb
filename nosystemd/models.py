from django.db import models
from membership.models import StripeCustomer, CustomUser
from utils.models import BillingAddress


class DonatorStatus(models.Model):
    ACTIVE = 'active'
    CANCELED = 'canceled'

    STATUS_CHOICES = (
        (ACTIVE, 'Active'),
        (CANCELED, 'Canceled')
    )
    user = models.OneToOneField(CustomUser)
    status = models.CharField(choices=STATUS_CHOICES, max_length=10, default=ACTIVE)

    def __str__(self):
        return "%s - %s " % (self.user.email, self.status)

    @classmethod
    def create(cls, user):
        cls.objects.get_or_create(user=user)

    def set_active(self):
        self.status = DonatorStatus.ACTIVE
        self.save()


class Donation(models.Model):

    donation = models.FloatField()
    donator = models.ForeignKey(StripeCustomer)
    created_at = models.DateTimeField(auto_now_add=True)
    billing_address = models.ForeignKey(BillingAddress)
    last4 = models.CharField(max_length=4)
    cc_brand = models.CharField(max_length=10)
    stripe_charge_id = models.CharField(max_length=100, null=True)

    @classmethod
    def create(cls, data):
        obj = cls.objects.create(**data)
        return obj

    @classmethod
    def get_total_donations_amount(cls):
        return sum(cls.objects.all().values_list('donation', flat=True))

    def set_stripe_charge(self, stripe_charge):
        self.stripe_charge_id = stripe_charge.id
        self.last4 = stripe_charge.source.last4
        self.cc_brand = stripe_charge.source.brand
        self.save
