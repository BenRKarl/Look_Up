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

  setTimeout(function(){
    var planetsArray = thePlanets.models;
    var mercury = planetsArray[0].attributes;
    var venus = planetsArray[1].attributes;
    var mars = planetsArray[2].attributes;
    var jupiter = planetsArray[3].attributes;
    var saturn = planetsArray[4].attributes;
    appendPoints([[findLongitude(mercury.ra), mercury.dec]], 'mercury', 5)
    appendPoints([[findLongitude(venus.ra), venus.dec]], 'venus', 6)
    appendPoints([[findLongitude(mars.ra), mars.dec]], 'mars', 6)
    appendPoints([[findLongitude(jupiter.ra), jupiter.dec]], 'jupiter', 15)
    appendPoints([[findLongitude(saturn.ra), saturn.dec]], 'saturn', 10)
  }, 5000)


});
