# This code may look unusually verbose for Ruby (and it is), but
# it performs some subtle and complex validation of JSON data.
#
# To parse this JSON, add 'dry-struct' and 'dry-types' gems, then do:
#
#   page_props_type_index = PagePropsTypeIndex.from_json! "{…}"
#   puts page_props_type_index.user.user_name
#
#   page_props_type_posts_xid = PagePropsTypePostsXID.from_json! "{…}"
#   puts page_props_type_posts_xid.post.content
#
#   page_props_type_posts = PagePropsTypePosts.from_json! "{…}"
#   puts page_props_type_posts.posts.first.content
#
# If from_json! succeeds, the value returned matches the schema.

require 'json'
require 'dry-types'
require 'dry-struct'

module Types
  include Dry::Types.module

  Hash   = Strict::Hash
  String = Strict::String
  Double = Strict::Float | Strict::Int
end

class User < Dry::Struct
  attribute :user_name, Types::String

  def self.from_dynamic!(d)
    d = Types::Hash[d]
    new(
      user_name: d.fetch("name"),
    )
  end

  def self.from_json!(json)
    from_dynamic!(JSON.parse(json))
  end

  def to_dynamic
    {
      "name" => @user_name,
    }
  end

  def to_json(options = nil)
    JSON.generate(to_dynamic, options)
  end
end

class PagePropsTypeIndex < Dry::Struct
  attribute :user, User

  def self.from_dynamic!(d)
    d = Types::Hash[d]
    new(
      user: User.from_dynamic!(d.fetch("user")),
    )
  end

  def self.from_json!(json)
    from_dynamic!(JSON.parse(json))
  end

  def to_dynamic
    {
      "user" => @user.to_dynamic,
    }
  end

  def to_json(options = nil)
    JSON.generate(to_dynamic, options)
  end
end

class PagePropsTypePostsXIDPost < Dry::Struct
  attribute :content, Types::String
  attribute :id,      Types::Double
  attribute :title,   Types::String

  def self.from_dynamic!(d)
    d = Types::Hash[d]
    new(
      content: d.fetch("content"),
      id:      d.fetch("id"),
      title:   d.fetch("title"),
    )
  end

  def self.from_json!(json)
    from_dynamic!(JSON.parse(json))
  end

  def to_dynamic
    {
      "content" => @content,
      "id"      => @id,
      "title"   => @title,
    }
  end

  def to_json(options = nil)
    JSON.generate(to_dynamic, options)
  end
end

class PagePropsTypePostsXID < Dry::Struct
  attribute :post, PagePropsTypePostsXIDPost

  def self.from_dynamic!(d)
    d = Types::Hash[d]
    new(
      post: PagePropsTypePostsXIDPost.from_dynamic!(d.fetch("post")),
    )
  end

  def self.from_json!(json)
    from_dynamic!(JSON.parse(json))
  end

  def to_dynamic
    {
      "post" => @post.to_dynamic,
    }
  end

  def to_json(options = nil)
    JSON.generate(to_dynamic, options)
  end
end

class PostElement < Dry::Struct
  attribute :content, Types::String
  attribute :id,      Types::Double
  attribute :title,   Types::String

  def self.from_dynamic!(d)
    d = Types::Hash[d]
    new(
      content: d.fetch("content"),
      id:      d.fetch("id"),
      title:   d.fetch("title"),
    )
  end

  def self.from_json!(json)
    from_dynamic!(JSON.parse(json))
  end

  def to_dynamic
    {
      "content" => @content,
      "id"      => @id,
      "title"   => @title,
    }
  end

  def to_json(options = nil)
    JSON.generate(to_dynamic, options)
  end
end

class PagePropsTypePosts < Dry::Struct
  attribute :posts, Types.Array(PostElement)

  def self.from_dynamic!(d)
    d = Types::Hash[d]
    new(
      posts: d.fetch("posts").map { |x| PostElement.from_dynamic!(x) },
    )
  end

  def self.from_json!(json)
    from_dynamic!(JSON.parse(json))
  end

  def to_dynamic
    {
      "posts" => @posts.map { |x| x.to_dynamic },
    }
  end

  def to_json(options = nil)
    JSON.generate(to_dynamic, options)
  end
end
