class ScriptsController < ApplicationController

  def index
    scripts = Script.all
    render json: ScriptSerializer.new(scripts)
  end

  def show
    script = Script.find_by(id: params[:id])
    render json: ScriptSerializer.new(script)
  end

end
