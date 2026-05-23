"""Bidirectional WebSocket — HUD frames out, commands in."""

from __future__ import annotations

import asyncio
import json
from typing import Any, Awaitable, Callable

import websockets
from websockets.server import WebSocketServerProtocol

from backend.config import settings

MessageHandler = Callable[[dict[str, Any]], Awaitable[dict[str, Any] | None]]


class HUDWebSocketServer:
    def __init__(self) -> None:
        self._clients: set[WebSocketServerProtocol] = set()
        self._host = str(settings["websocket_host"])
        self._port = int(settings["websocket_port"])
        self._server: websockets.WebSocketServer | None = None
        self._on_command: MessageHandler | None = None

    def set_command_handler(self, handler: MessageHandler) -> None:
        self._on_command = handler

    async def _handler(self, ws: WebSocketServerProtocol) -> None:
        self._clients.add(ws)
        # Send current config on connect
        await ws.send(json.dumps({"type": "config", "settings": settings.public_dict()}))
        try:
            async for raw in ws:
                try:
                    msg = json.loads(raw)
                except json.JSONDecodeError:
                    continue
                if msg.get("type") == "command" and self._on_command:
                    reply = await self._on_command(msg)
                    if reply:
                        await ws.send(json.dumps(reply))
        except websockets.ConnectionClosed:
            pass
        finally:
            self._clients.discard(ws)

    async def start(self) -> None:
        self._server = await websockets.serve(self._handler, self._host, self._port)
        print(f"[HUD] WebSocket listening on ws://{self._host}:{self._port}")

    async def broadcast(self, payload: dict[str, Any]) -> None:
        if not self._clients:
            return
        message = json.dumps(payload)
        dead: list[WebSocketServerProtocol] = []
        for client in self._clients:
            try:
                await client.send(message)
            except websockets.ConnectionClosed:
                dead.append(client)
        for client in dead:
            self._clients.discard(client)

    async def stop(self) -> None:
        if self._server:
            self._server.close()
            await self._server.wait_closed()
