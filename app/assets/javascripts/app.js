var thePlanets = new LookUp.Collections.PlanetCollection();

var rightNow = new Date();
var date = rightNow.formattedDate();
var time = rightNow.formattedTime();

$(function(){
  console.log('My celestial body is ready...');

  var planetListView = new LookUp.Views.PlanetListView({
    el: $('.planet-list'),
    collection: thePlanets
  });

  getPlanets(date, time);
  console.log("Current date and time was sent to API")



  console.log('The user\'s location was rendered')

});
