var thePlanets = new LookUp.Collections.PlanetCollection();
var rightNow = new Date();
var date = rightNow.formattedDate();
var time = rightNow.formattedTime();
var userLat;
var userLon;


$(function(){
  renderGlobe();
  navigator.geolocation.sendUserInfo();

  var planetListView = new LookUp.Views.PlanetListView({
    el: $('.planet-list'),
    collection: thePlanets
  });



});


