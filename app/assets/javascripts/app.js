var thePlanets = new LookUp.Collections.PlanetCollection();

$(function(){
  console.log('My celestial body is ready...');

  var planetListView = new LookUp.Views.PlanetListView({
    el: $('.planet-list'),
    collection: thePlanets
  });

  navigator.geolocation.sendUserInfo();
  console.log('A request was sent to the API')

  setInterval(function(){
    navigator.geolocation.sendUserInfo();
    console.log('A request was sent to the API')
  }, 60000)
});
