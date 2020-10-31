class PostsController < ApplicationController
  def index
    posts = PostsApi.index
    view_props[:posts] = posts
  end

  def show
    post = PostsApi.show(params[:id])
    if post
      view_props[:post] = post
    else
      head 404
    end
  end
end
