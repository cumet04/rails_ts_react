Rails.application.configure do
  config.cache_classes = false
  config.eager_load = false
  config.action_controller.perform_caching = false
  config.consider_all_requests_local = true

  config.log_level = :debug
  config.active_support.deprecation = :stderr
  config.active_record.verbose_query_logs = true

  config.active_record.migration_error = :page_load
  config.active_record.dump_schema_after_migration = true
  config.i18n.fallbacks = false
  config.public_file_server.enabled = true

  config.cache_store = :null_store

  config.file_watcher = ActiveSupport::EventedFileUpdateChecker
end
