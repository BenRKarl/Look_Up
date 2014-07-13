var thePlanets = new LookUp.Collections.PlanetCollection();

var rightNow = new Date();
var date = rightNow.formattedDate();
var time = rightNow.formattedTime();

$(function(){

  var planetListView = new LookUp.Views.PlanetListView({
    el: $('.planet-list'),
    collection: thePlanets
  });

  navigator.geolocation.sendUserInfo();
  console.log("Current date and time was sent to API")

  //Calls function that renders globe on screen
  renderGlobe();


  //test array of sample alts and az. format is [ALT, AX]
  var planetData = [ [115, -43], [117, -42], [34, 109], [111, 14], [110, 15] ];
  var userData = [[-75, 43]];

  setTimeout(function(){
    appendPoints(planetData, 'planet-point', 6);
  }, 2000);


});
