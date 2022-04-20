class PalettesController < ApplicationController
    
    def index
        palettes = Palette.all
        render json: palettes, include: ["recipes.ingredient", "user"], status: :ok
    end

    def show
        palette = find_palette
        render json: palette, include: ["recipes.ingredient", "user"], status: :ok
    end

    def create
        palette = Palette.create!(palette_params)
        palette.save
        render json: palette, status: :created
    end

    def update
        palette = find_palette
        palette.update(palette_params)
        render json: palette, status: :ok
    end

    def destroy
        palette = find_palette
        palette.destroy
        head :no_content
    end
    
    private

    def find_palette
        Palette.find(params[:id])
    end

    def palette_params
        params.permit(:palette)
    end
end
