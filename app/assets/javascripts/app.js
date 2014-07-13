var thePlanets = new LookUp.Collections.PlanetCollection();

var rightNow = new Date();
var date = rightNow.formattedDate();
var time = rightNow.formattedTime();

$(function(){
  renderGlobe();
  navigator.geolocation.sendUserInfo();

  var planetListView = new LookUp.Views.PlanetListView({
    el: $('.planet-list'),
    collection: thePlanets
  });





  //test array of sample alts and az. format is [ALT, AX]
  var planetData = [ [115, -43], [117, -42], [34, 109], [111, 14], [110, 15] ];
  var userData = [[-75, 43]];

  setTimeout(function(){
    appendPoints(planetData, 'planet-point', 5);
  }, 2000);


});
