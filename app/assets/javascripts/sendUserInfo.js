navigator.geolocation.sendUserInfo = function(){
  var options = {
    enableHighAccuracy: true,
  };

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };

  function formatCoord(coord){
    var coord = coord.toString();
    if (coord[0] === '-'){
      return coord.replace('.', ',').substring(0, 6) + ',0'
    } else {
      return coord.replace('.', ',').substring(0, 5) + ',0'
    }
  }

  function success(pos) {
    var rightNow = new Date();
    var crd = pos.coords;
    userLat = crd.latitude;
    userLon = crd.longitude;
    var lng = formatCoord(crd.longitude);
    var lat = formatCoord(crd.latitude);
    var date = rightNow.formattedDate();
    var time = rightNow.formattedTime();
    var tz = rightNow.getTimezoneOffset() / 60;
    getPlanets(lat, lng, date, time, tz);
    appendPoints([[crd.longitude, crd.latitude]], 'user-point', 7); //function renders users location on globe
  };
  return this.getCurrentPosition(success, error, options);
}

