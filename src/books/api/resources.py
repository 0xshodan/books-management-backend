from tastypie.authorization import Authorization
from tastypie.resources import ModelResource
from .serializers import BookSerializer
from books.models import Book


class BookResource(ModelResource):
    class Meta:
        queryset = Book.objects.all()
        resource_name = "books"
        authorization = Authorization()
        ordering = ["id"]
        serializer = BookSerializer()