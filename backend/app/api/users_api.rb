class UsersApi < ApplicationApi
  def self.current
    {
      name: "test_user"
    }
  end
end
