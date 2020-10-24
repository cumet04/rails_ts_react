Rails.application.routes.draw do
  scope format: false do
    root "home#index"
  end
end

# memonize routing map
Rails.application.config._routing_map =
  Rails.application.routes.routes.map { |r|
    ActionDispatch::Routing::RouteWrapper.new(r)
  }.reject(&:internal?)
    .to_h { |r|
    [
      r.endpoint,
      r.path.tr(":", "_") # for path param
    ]
  }
