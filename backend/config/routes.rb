Rails.application.routes.draw do
  scope format: false do
    root "home#index"

    resources :posts, only: [:index, :show]

    namespace :api do
      get "users/current", to: "users#current"

      resources :posts, only: [:index, :show]
    end
  end
end

# memonize routing map
Rails.application.config._routing_map =
  Rails.application.routes.routes.map { |r|
    ActionDispatch::Routing::RouteWrapper.new(r)
  }.reject(&:internal?)
    .reject { |r| r.endpoint.starts_with?("/api") }
    .to_h { |r|
    [
      r.endpoint,
      r.path.tr(":", "_") # for path param
    ]
  }
