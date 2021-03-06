class TagsController < ApplicationController

  def index
    tags = Tag.all
    render json: tags
  end

  def create
    tag = Tag.new(tag_params)
    if tag.save
      render json: tag
    else
      render json: { errors: tag.errors.full_messages }, status: 422
    end
  end

  private

  def tag_params
    params.permit(:name)
  end

end