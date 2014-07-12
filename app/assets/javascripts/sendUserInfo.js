navigator.geolocation.getUserInfo = function(){
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
    var lng = formatCoord(crd.longitude);
    var lat = formatCoord(crd.latitude);
    var date = rightNow.formattedDate();
    var time = rightNow.formattedTime();
    var tz = rightNow.getTimezoneOffset() / 60;
    getPlanets(date, time);
  };
  return this.getCurrentPosition(success, error, options);
}



