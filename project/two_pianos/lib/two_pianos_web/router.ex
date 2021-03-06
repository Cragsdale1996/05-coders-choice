defmodule TwoPianosWeb.Router do
  use TwoPianosWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", TwoPianosWeb do
    pipe_through :browser # Use the default browser stack

    get "/",     LobbyController, :index
    get "/room", RoomController,  :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", TwoPianosWeb do
  #   pipe_through :api
  # end
end
