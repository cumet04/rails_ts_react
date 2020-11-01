class Api::UsersController < Api::ApplicationController
  def current
    render json: UsersApi.current
  end
end
