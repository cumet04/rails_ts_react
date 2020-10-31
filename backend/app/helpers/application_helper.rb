module ApplicationHelper
  def view_uri
    key = "#{params[:controller]}##{params[:action]}"
    Rails.application.config._routing_map[key]
  end

  def prop_data_json
    json = @_view_props || {}
    json.to_json
  end
end
