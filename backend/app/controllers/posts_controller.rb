class PostsController < ApplicationController
  def index
    posts = Post.all
    view_props[:posts] = posts.map { |p| map_post(p) }
  end

  def show
    post = Post.find(params[:id])
    view_props[:post] = map_post(post)
  end

  private

  def map_post(post)
    p = post
    {
      id: p.id,
      title: p.title,
      content: p.content
    }
  end
end
