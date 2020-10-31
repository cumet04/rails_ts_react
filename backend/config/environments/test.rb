Rails.application.configure do
  config.cache_classes = false
  config.eager_load = false
  config.action_controller.perform_caching = false
  config.consider_all_requests_local = true

  config.log_level = :warn

  config.cache_store = :null_store
  config.action_dispatch.show_exceptions = false
  config.action_controller.allow_forgery_protection = false
  config.active_support.deprecation = :stderr

  committee_params = {
    schema_path: Rails.root.join("../api/openapi.yml").to_s,
    prefix: "/api",
    raise: true
  }
  config.middleware.use(Committee::Middleware::RequestValidation, committee_params)
  config.middleware.use(Committee::Middleware::ResponseValidation, committee_params)
end
