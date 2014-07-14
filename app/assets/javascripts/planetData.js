function findLongitude(rightAscension){
  var hourInt = rightAscension[0] + (rightAscension[1]/60);
  var angle = hourInt * 15;
  if (angle > 180){
    return angle - 360;
  } else {
    return angle;
  }
};

function modifyRA(planetObj){
  var raArray = [];
  var ra = planetObj.ra;
  raArray.push(parseInt(ra[0] + ra[1]))
  raArray.push(parseInt(ra[4] + ra[5]))
  planetObj.ra = raArray;
}

function modifyPlanetAttributes(data){
  var mercury = data.mercury;
  var venus   = data.venus;
  var mars    = data.mars;
  var jupiter = data.jupiter;
  var saturn  = data.saturn;
  mercury.name  = 'mercury'
  venus.name    = 'venus'
  mars.name     = 'mars'
  jupiter.name  = 'jupiter'
  saturn.name   = 'saturn'
  modifyRA(mercury);
  modifyRA(venus);
  modifyRA(mars);
  modifyRA(jupiter);
  modifyRA(saturn);
  mercury.position  = [[findLongitude(mercury.ra), mercury.dec]];
  venus.position    = [[findLongitude(venus.ra), venus.dec]];
  mars.position     = [[findLongitude(mars.ra), mars.dec]];
  jupiter.position  = [[findLongitude(jupiter.ra), jupiter.dec]];
  saturn.position   = [[findLongitude(saturn.ra), saturn.dec]];
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
      transit: planet.transit,
      position: planet.position
    });
  });
}

function resetPlanets(planetArray){
  thePlanets.set(planetArray);
}

function getPlanets(lat, lng, date, time, tz){
  $.ajax({
    url: '/astronomy',
    dataType: 'json',
    method: 'post',
    data: {
            lat:  lat,
            lng:  lng,
            date: date,
            time: time,
            tz:   tz
          },
    success: function(response){
      var data = response.data;
      var planetArray = modifyPlanetAttributes(data);
      if (thePlanets.isEmpty()) {
        initiatePlanets(planetArray);
      } else {
        resetPlanets(planetArray);
      }
    }
  });
}
