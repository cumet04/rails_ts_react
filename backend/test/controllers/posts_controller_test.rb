require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get posts_url
    assert_response :success
    @controller.view_props.has_key?(:posts)
  end

  test "should get show" do
    get post_url(posts(:one).id)
    assert_response :success
    @controller.view_props.has_key?(:post)
  end
end
