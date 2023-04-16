from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from books.models import Book


class BookResource(ModelResource):
    class Meta:
        queryset = Book.objects.all()
        resource_name = "book"
        authorization = Authorization()
