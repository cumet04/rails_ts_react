class ApplicationController < ActionController::Base
  def view_props
    @_view_props ||= {}
  end

  # override ActionController::ImplicitRender for omitting view file per action
  def default_render
    render(html: "", layout: true)
  end
end
