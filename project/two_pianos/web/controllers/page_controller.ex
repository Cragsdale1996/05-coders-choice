defmodule TwoPianos.PageController do

  use TwoPianos.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

end