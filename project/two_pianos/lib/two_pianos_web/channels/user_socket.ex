defmodule TwoPianosWeb.UserSocket do

  use Phoenix.Socket

  ## Channels
  channel "lobby",   TwoPianosWeb.LobbyChannel
  channel "user:*",  TwoPianosWeb.UserChannel
  channel "room:*",  TwoPianosWeb.RoomChannel

  ## Transports
  transport :websocket, Phoenix.Transports.WebSocket

  def connect(_params, socket) do
    {:ok, socket}
  end

  def id(_socket), do: nil

end
