defmodule MapStore do
  @moduledoc """
  Uses a named genserver to maintain / wrap a Map.
  """

  alias MapStore.Interface

  defdelegate            start(name, args \\ %{}), to: Interface
  defdelegate              get(name),              to: Interface
  defdelegate              get(name, key),         to: Interface
  defdelegate              add(name, key, val),    to: Interface
  defdelegate           remove(name, key),         to: Interface
  defdelegate    contains_key?(name, key),         to: Interface

end