defmodule MapSetStore do
  @moduledoc """
  Uses a genserver to store a mapset. Seriously mindblowing documentation.
  """

  defdelegate start(default \\ []), to: Interface
  defdelegate add(server, args),    to: Interface
  defdelegate remove(server, args), to: Interface
  defdelegate get(server),          to: Interface

end
