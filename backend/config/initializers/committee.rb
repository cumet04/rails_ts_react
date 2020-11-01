if Rails.env.development? || Rails.env.test?
  committee_params = {
    schema_path: Rails.root.join("../api/openapi.yml").to_s,
    prefix: "/api",
    raise: true,
    parse_response_by_content_type: false
  }
  m = Rails.application.config.middleware
  m.use(Committee::Middleware::RequestValidation, committee_params)
  m.use(Committee::Middleware::ResponseValidation, committee_params)
end
