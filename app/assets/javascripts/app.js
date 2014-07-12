var thePlanets = new LookUp.Collections.PlanetCollection();

$(function(){
  console.log('My celestial body is ready...');

  var planetListView = new LookUp.Views.PlanetListView({
    el: $('.planet-list'),
    collection: thePlanets
  });

  navigator.geolocation.getUserInfo();
  console.log('The user\'s info was gotten')

});
