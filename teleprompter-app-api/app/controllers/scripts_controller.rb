class ScriptsController < ApplicationController

    def index
      scripts = Script.all
      render json: scripts
    end
  
    def show
      script = Script.find_by(id: params[:id])
      render json: script
    end
  
     def create
       script = Script.create(script_params)
       render json: script
     end
  
     def update
       script = Script.find_by(id: params[:id])
       script.update(script_params)
       render json: script
     end
  
     def destroy
       script = Script.find_by(id: params[:id])
       script.destroy
     end
  
  
     private
     def script_params
       params.require(:script).permit(:title, :content)
     end
  
  end
  