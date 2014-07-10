Rails.application.routes.draw do

  get '/' => 'welcome#index'
  post '/astronomy' => 'astronomy#planets'

end
