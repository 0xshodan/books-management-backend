from tastypie.authorization import Authorization
from tastypie.resources import ModelResource

from profiles.models import Profile


class ProfileResource(ModelResource):
    class Meta:
        queryset = Profile.objects.all()
        resource_name = "profiles"
        authorization = Authorization()
        list_allowed_methods = ["get", "patch"]
