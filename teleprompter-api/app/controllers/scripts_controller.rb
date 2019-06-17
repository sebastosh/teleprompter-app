class ScriptsController < ApplicationController

  def index
    scripts = Script.all
    render json: scripts
  end

  def show
    script = Script.find_by(id: params[:id])
    render json: script
  end

end
