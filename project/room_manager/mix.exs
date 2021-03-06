defmodule RoomManager.MixProject do
  use Mix.Project

  def project do
    [
      app: :room_manager,
      version: "0.1.0",
      elixir: "~> 1.6",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger],
      mod: {RoomManager.Application, []}
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:map_store,     path: "../map_store",     app: false},
      {:map_set_store, path: "../map_set_store", app: false},
      {:room,          path: "../room",          app: false},
      {:id_generator,  path: "../id_generator",  app: false}
    ]
  end
end
