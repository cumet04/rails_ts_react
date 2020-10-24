class HomeController < ApplicationController
  def index
    view_props[:user] = {
      name: "testuser"
    }
  end
end
