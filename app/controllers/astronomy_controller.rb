class AstronomyController < ApplicationController

  def planets
    binding.pry
    query = Astronomy.new(params)
    @response = query.almanac.body
    respond_to do |format|
      format.json { render :json => JSON.parse(@response) }
    end
  end

end
