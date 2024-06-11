from rest_framework import renderers
import json

# this will return output like: {"errors": "some error message"} if error occurs, otherwise, the output of the request like: {"token": "some token"}
class UserRenderer(renderers.JSONRenderer):
    charset = 'utf-8'
    def render(self, data, accepted_media_type=None, renderer_context=None):
        response = ''
        if 'ErrorDetail' in str(data):
            response = json.dumps({'errors':data})
        else:
            response = json.dumps(data)
        return response