from django.db import models

class Book(models.Model):
    name = models.CharField(max_length=20, verbose_name="Название")
    title = models.CharField(max_length=30, verbose_name="Заголовок", blank=True, null=True)
    author = models.CharField(max_length=30, verbose_name="Автор")
    description = models.CharField(max_length=512, verbose_name="Описание", blank=True, null=True)
    price = models.DecimalField(max_digits=5, decimal_places=0, verbose_name="Цена")