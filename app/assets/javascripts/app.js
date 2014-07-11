var thePlanets = new LookUp.Collections.PlanetCollection();

$(function(){
  console.log('My celestial body is ready...');

  var planetListView = new LookUp.Views.PlanetListView({
    el: $('.planet-list'),
    collection: thePlanets
  });

  setInterval(function(){
    navigator.geolocation.sendUserInfo();
    console.log('Planet data was extracted')
  }, 5000)
});
