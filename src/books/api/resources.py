from tastypie.authorization import Authorization
from tastypie.resources import ModelResource

from books.models import Book
from profiles.models import Profile

from .serializers import BookSerializer


class BookResource(ModelResource):
    class Meta:
        queryset = Book.objects.all()
        resource_name = "books"
        authorization = Authorization()
        ordering = ["id"]
        serializer = BookSerializer()

    def dehydrate_name(self, bundle):
        if Profile.objects.get(pk=1).is_visible:
            return bundle.data["name"]

    def dehydrate_title(self, bundle):
        if Profile.objects.get(pk=2).is_visible:
            return bundle.data["title"]

    def dehydrate_author(self, bundle):
        if Profile.objects.get(pk=3).is_visible:
            return bundle.data["author"]

    def dehydrate_description(self, bundle):
        if Profile.objects.get(pk=4).is_visible:
            return bundle.data["description"]

    def dehydrate_price(self, bundle):
        if Profile.objects.get(pk=5).is_visible:
            return bundle.data["price"]
