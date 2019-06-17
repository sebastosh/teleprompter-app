class SpeakersController < ApplicationController
  def index
    speakers = Speaker.all
    render json: speakers
  end

  def show
  speaker = Speaker.find_by(id: params[:id])
  render json: speaker
end

end
