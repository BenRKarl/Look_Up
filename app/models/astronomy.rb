class Astronomy
  include HTTParty
  base_uri 'http://www.astronomyapi.com/api_v1'

  Astronomy_Key = ENV.fetch('ASTRONOMY_KEY')
  Astronomy_Secret = ENV.fetch('ASTRONOMY_SECRET')

  def initialize(params)
    @options = { query: {
      appid: Astronomy_Key,
      appsecret: Astronomy_Secret,
      date: params[:date],
      time: params[:time],
      lat: params[:lat],
      lng: params[:lng],
      tz: params[:tz],
      ds: false
    }}
  end

  def almanac
    self.class.get('/almanac', @options)
  end
end
