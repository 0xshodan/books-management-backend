import json

from django.core.serializers.json import DjangoJSONEncoder
from tastypie.serializers import Serializer


class BookSerializer(Serializer):
    def to_json(self, data, options=None):
        options = options or {}

        data = self.to_simple(data, options)

        return json.dumps(data, cls=DjangoJSONEncoder, ensure_ascii=False)

    def from_json(self, content):
        return json.loads(content)
