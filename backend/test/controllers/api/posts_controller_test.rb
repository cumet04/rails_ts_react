require "test_helper"

class Api::PostsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_posts_url
    assert_response :success
  end

  test "should get show" do
    get api_post_url(posts(:one).id)
    assert_response :success
  end
end
