class Api::PostsController < Api::ApplicationController
  def index
    render json: PostsApi.index
  end

  def show
    post = PostsApi.show(params[:id])
    if post
      render(json: post)
    else
      head 404
    end
  end
end
