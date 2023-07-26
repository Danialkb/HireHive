"""
ASGI config for src project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application

from job_board.routing import websocket_urlpatterns as job_board_ws_patterns
from chat.routing import websocket_urlpatterns as chat_ws_patterns

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'src.settings')


application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter(
                job_board_ws_patterns +
                chat_ws_patterns
            )
        )
    ),
})
