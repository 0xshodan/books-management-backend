from django.core.serializers.json import DjangoJSONEncoder
from tastypie.serializers import Serializer
import json

class BookSerializer(Serializer):
    def to_json(self, data, options=None):
        options = options or {}

        data = self.to_simple(data, options)

        return json.dumps(data, cls=DjangoJSONEncoder)

    def from_json(self, content):
        return json.loads(content)