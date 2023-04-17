from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from profiles.models import Profile


class BookResource(ModelResource):
    class Meta:
        queryset = Profile.objects.all()
        resource_name = "profile"
        authorization = Authorization()
        list_allowed_methods = ['get', 'patch']
