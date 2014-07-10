class Astronomy < ActiveRecord::Base
  include 'httparty'
  attr_reader :options

  def initialize(params)
    @options = { query: {
        date: params.date,
        time: params.time,
        lat:  params.lat,
        lng:  params.lng,
        tz:   params.tz,
        ds:   false
      }}
  end

  def almanac
    self.class.get('/almanac', @options)
  end
end
