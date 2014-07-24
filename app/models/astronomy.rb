class Astronomy
  include HTTParty
  base_uri 'http://www.astronomyapi.com/api_v1'

  def initialize(params)
    @options = { query: {
      appid: astronomy_key,
      appsecret: astronomy_secret,
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
  
  private
  
  def astronomy_key
    ENV.fetch('ASTRONOMY_KEY')
  end
  
  def astronomy_secret
    ENV.fetch('ASTRONOMY_SECRET')
  end
end
