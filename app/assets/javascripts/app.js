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

setTimeout(function(){
  console.log('UTC Time' + rightNow);
  console.log('Mercury: ')
  console.log(thePlanets.models[0].attributes.ra)
  console.log(thePlanets.models[0].attributes.dec)
  console.log('Venus: ')
  console.log(thePlanets.models[1].attributes.ra)
  console.log(thePlanets.models[1].attributes.dec)
  console.log('Mars: ')
  console.log(thePlanets.models[2].attributes.ra)
  console.log(thePlanets.models[2].attributes.dec)
  console.log('Jupiter: ')
  console.log(thePlanets.models[3].attributes.ra)
  console.log(thePlanets.models[3].attributes.dec)
  console.log('Saturn: ')
  console.log(thePlanets.models[4].attributes.ra)
  console.log(thePlanets.models[4].attributes.dec)
}, 5000)
});
