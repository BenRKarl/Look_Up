function assignPlanetNames(data){
  var mercury = data.mercury;
  var venus   = data.venus;
  var mars    = data.mars;
  var jupiter = data.jupiter;
  var saturn  = data.saturn;
  mercury.name  = 'Mercury'
  venus.name    = 'Venus'
  mars.name     = 'Mars'
  jupiter.name  = 'Jupiter'
  saturn.name   = 'Saturn'
  return [mercury, venus, mars, jupiter, saturn];
}

function initiatePlanets(planetArray){
  _.each(planetArray, function(planet){
    thePlanets.create({
      name: planet.name,
      dec: planet.dec,
      mag: planet.mag,
      phase: planet.phase,
      ra: planet.ra,
      rise: planet.rise,
      set: planet.set,
      size: planet.size,
      transit: planet.transit
    });
  });
}

function resetPlanets(planetArray){
  thePlanets.set(planetArray);
}

function getPlanets(date, time){
  $.ajax({
    url: '/astronomy',
    dataType: 'json',
    method: 'post',
    data: {
            date: date,
            time: time
          },
    success: function(response){
      var data = response.data;
      console.log('Mars ra: ' + data.mars.ra + ' da: ' + data.mars.dec);
      var planetArray = assignPlanetNames(data);
      if (thePlanets.isEmpty()) {
        initiatePlanets(planetArray);
      } else {
        resetPlanets(planetArray);
      }
    }
  });
}
