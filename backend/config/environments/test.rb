Rails.application.configure do
  config.cache_classes = false
  config.eager_load = false
  config.action_controller.perform_caching = false
  config.consider_all_requests_local = true

  config.cache_store = :null_store
  config.action_dispatch.show_exceptions = false
  config.action_controller.allow_forgery_protection = false
  config.active_support.deprecation = :stderr
end
