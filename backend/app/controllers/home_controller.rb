class HomeController < ApplicationController
  def index
    view_props[:user] = UsersApi.current
  end
end
