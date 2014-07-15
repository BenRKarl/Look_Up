function longitude(rightAscension){
  var hourInt = rightAscension[0] + (rightAscension[1]/60);
  var angle = hourInt * 15;
  if (angle > 180){
    return angle - 360;
  } else {
    return angle;
  }
};

function modifyTransit(planetObj){
  var transitArray = [];
  var transit = planetObj.transit;
  transitArray.push(parseInt(transit[0] + transit[1]))
  transitArray.push(parseInt(transit[3] + transit[4]))
  planetObj.transit = transitArray;
}

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
  mercury.name  = 'Mercury'
  venus.name    = 'Venus'
  mars.name     = 'Mars'
  jupiter.name  = 'Jupiter'
  saturn.name   = 'Saturn'
  modifyRA(mercury);
  modifyRA(venus);
  modifyRA(mars);
  modifyRA(jupiter);
  modifyRA(saturn);
  modifyTransit(mercury);
  modifyTransit(venus);
  modifyTransit(mars);
  modifyTransit(jupiter);
  modifyTransit(saturn);
  mercury.position  = [longitude(mercury.transit), mercury.dec];
  venus.position    = [longitude(venus.transit), venus.dec];
  mars.position     = [longitude(mars.transit), mars.dec];
  jupiter.position  = [longitude(jupiter.transit), jupiter.dec];
  saturn.position   = [longitude(saturn.transit), saturn.dec];
  return [mercury, venus, mars, jupiter, saturn];
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
        thePlanets.add(planetArray);
      } else {
        thePlanets.set(planetArray);
      }
    }
  });
}
