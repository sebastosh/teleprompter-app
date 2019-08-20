class SpeakersController < ApplicationController
    def index
      speakers = Speaker.all
      render json: SpeakerSerializer.new(speakers)
    end
  
    def show
      speaker = Speaker.find_by(id: params[:id])
      render json: SpeakerSerializer.new(speaker)
    end
  
    def create
      speaker = Speaker.create(speaker_params)
      render json: SpeakerSerializer.new(speaker)
    end
  
    private
    def speaker_params
      params.require(:speaker).permit(:name)
    end
  
  
  end
  