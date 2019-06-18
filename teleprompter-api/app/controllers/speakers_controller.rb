class SpeakersController < ApplicationController
  def index
    speakers = Speaker.all
    render json: SpeakerSerializer.new(speakers)
  end

  def show
  speaker = Speaker.find_by(id: params[:id])
  render json: SpeakerSerializer.new(speaker)
end

end
