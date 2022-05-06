class SearchController < ApplicationController
	def index
  end

  def search
    filter = params[:term].strip
    # offset and limit for the pagination feature
    @videos = Video.where("lower(title) LIKE ?", "%#{filter.downcase}%")#.offset(0).limit(5)
    render "index"
  end
end
