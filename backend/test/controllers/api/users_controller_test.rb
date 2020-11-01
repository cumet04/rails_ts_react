require "test_helper"

class Api::UsersControllerTest < ActionDispatch::IntegrationTest
  test "should get current" do
    get api_users_current_url
    assert_response :success
  end
end
