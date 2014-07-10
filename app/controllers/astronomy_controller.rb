class AstronomyController < ApplicationController

  def planets
    binding.pry
    @query = Astronomy.new(params)
    @query.almanac
  end

end
