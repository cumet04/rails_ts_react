class PostsApi < ApplicationApi
  def self.index
    rsc = Post.all
    rsc.map { |p| post_json(p) }
  end

  def self.show(id)
    rsc = Post.find_by(id)
    rsc && post_json(rsc)
  end

  private

  def self.post_json(post)
    o = post
    {
      id: o.id,
      title: o.title,
      content: o.content
    }
  end
end
