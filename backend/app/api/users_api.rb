class UsersApi < ApplicationApi
  def self.current
    {
      id: 1,
      name: "test_user"
    }
  end
end
