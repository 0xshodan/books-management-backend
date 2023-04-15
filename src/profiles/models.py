from django.db import models

class Profile(models.Model):
    column_name = models.CharField(max_length=10, verbose_name="Название столбца")
    is_visible = models.FloatField(verbose_name="Видимость столбца")