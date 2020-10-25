module ApplicationHelper
  def view_uri
    key = "#{params[:controller]}##{params[:action]}"
    Rails.application.config._routing_map[key]
  end

  def prop_data_json
    json = @_view_props || {}
    validate_json(json) if Rails.env.development? || Rails.env.test?
    json.to_json
  end

  def validate_json(json)
    # ruby-json-schemaが古くてtypescript-json-schemaが吐くJSON Schemaのバージョンと合わなかった。終了。
    name = view_uri.delete_prefix("/").tr("/", "_")
    schema = "#{Rails.root}/lib/schema/PagePropsType.#{name}.json"
    JSON::Validator.validate!(schema, json)
  end
end
