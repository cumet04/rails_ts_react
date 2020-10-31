Rails.application.configure do
  config.cache_classes = false
  config.eager_load = false
  config.action_controller.perform_caching = false
  config.consider_all_requests_local = true
  BetterErrors::Middleware.allow_ip! "0.0.0.0/0"

  config.log_level = :debug
  config.log_tags = []
  config.log_formatter = proc do |severity, datetime, progname, msg|
    time = datetime.strftime("%H:%M:%S:%L")
    "[#{severity}] #{time} : #{msg}\n"
  end
  config.active_support.deprecation = :stderr
  config.active_record.verbose_query_logs = true

  config.active_record.migration_error = :page_load
  config.active_record.dump_schema_after_migration = true
  config.i18n.fallbacks = false
  config.public_file_server.enabled = true

  config.cache_store = :null_store

  committee_params = {
    schema_path: Rails.root.join("../api/openapi.yml").to_s,
    prefix: "/api",
    raise: true
  }
  config.middleware.use(Committee::Middleware::RequestValidation, committee_params)
  config.middleware.use(Committee::Middleware::ResponseValidation, committee_params)

  config.file_watcher = ActiveSupport::EventedFileUpdateChecker
end
