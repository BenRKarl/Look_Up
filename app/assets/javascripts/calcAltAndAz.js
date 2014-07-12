function compute()
{
    var dec_degrees = parseInt(calc.dec_degrees.value, 10);
    var dec_minutes = parseInt(calc.dec_minutes.value, 10);
    var ra_hours    = parseInt(calc.ra_hours.value, 10);
    var ra_minutes  = parseInt(calc.ra_minutes.value, 10);
    var lat_degrees = parseInt(calc.lat_degrees.value, 10);
    var lat_minutes = parseInt(calc.lat_minutes.value, 10);
    var lon_degrees = parseInt(calc.lon_degrees.value, 10);
    var lon_minutes = parseInt(calc.lon_minutes.value, 10);
    var dtg_year    = parseInt(calc.dtg_year.value, 10);
    var dtg_month   = parseInt(calc.dtg_month.value, 10);
    var dtg_day     = parseInt(calc.dtg_day.value, 10);
    var dtg_hour    = parseInt(calc.dtg_hour.value, 10);
    var dtg_minute  = parseInt(calc.dtg_minute.value, 10);
    var dtg_second  = parseInt(calc.dtg_second.value, 10);

    if (isNaN(dec_degrees)||(Math.abs(dec_degrees) >=  90)||
        isNaN(dec_minutes)||(dec_minutes < 0)||(dec_minutes >=  60)||
        isNaN(ra_hours)   ||(ra_hours    < 0)||(ra_hours    >=  24)||
        isNaN(ra_minutes) ||(ra_minutes  < 0)||(ra_minutes  >=  60))
    {
        window.alert("Invalid Object data!");
        return;
    }

    if (isNaN(lat_degrees)||(Math.abs(lat_degrees) >=  90)||
        isNaN(lat_minutes)||(lat_minutes < 0)||(lat_minutes >=  60)||
        isNaN(lon_degrees)||(Math.abs(lon_degrees) >= 180)||
        isNaN(lon_minutes)||(lon_minutes < 0)||(lon_minutes >=  60))
    {
        window.alert("Invalid Observer data!");
        return;
    }

    var now = new Date(dtg_year, dtg_month - 1, dtg_day, dtg_hour, dtg_minute, dtg_second);

    if (isNaN(now.getTime())||
        (dtg_month  < 1)||(dtg_month  >=  13)||
        (dtg_day    < 1)||(dtg_day    >=  32)||
        (dtg_hour   < 0)||(dtg_hour   >=  24)||
        (dtg_minute < 0)||(dtg_minute >=  60)||
        (dtg_second < 0)||(dtg_second >=  60))
    {
        window.alert("Invalid Date/Time data!");
        return;
    }

    var ra  = ra2real( ra_hours, ra_minutes );
    var dec = dms2real( dec_degrees, dec_minutes );
    var lat = dms2real( lat_degrees, lat_minutes );
    var lon = dms2real( lon_degrees, lon_minutes );

    coord_to_horizon(now, ra, dec, lat, lon);
    calc.alt_degrees.value = hrz_altitude;
    calc.azm_degrees.value = hrz_azimuth;
    calc.date_time.value   = now.toUTCString();
}

// compute horizon coordinates from ra, dec, lat, lon, and utc
// ra, dec, lat, lon in  degrees
// utc is a Date object
// results returned in hrz_altitude, hrz_azimuth
function coord_to_horizon( utc, ra, dec, lat, lon )
{
    // compute hour angle in degrees
    var ha = mean_sidereal_time( utc, lon ) - ra;
    if (ha < 0) ha = ha + 360;

    // convert degrees to radians
    ha  = ha*Math.PI/180
    dec = dec*Math.PI/180
    lat = lat*Math.PI/180

    // compute altitude in radians
    var sin_alt = Math.sin(dec)*Math.sin(lat) + Math.cos(dec)*Math.cos(lat)*Math.cos(ha);
    var alt = Math.asin(sin_alt);

    // compute azimuth in radians
    // divide by zero error at poles or if alt = 90 deg
    var cos_az = (Math.sin(dec) - Math.sin(alt)*Math.sin(lat))/(Math.cos(alt)*Math.cos(lat));
    var az  = Math.acos(cos_az);

    // convert radians to degrees
    hrz_altitude = alt*180/Math.PI;
    hrz_azimuth  = az*180/Math.PI;

    // choose hemisphere
    if (Math.sin(ha) > 0) hrz_azimuth = 360 - hrz_azimuth;
}

// Compute the Mean Sidereal Time in units of degrees.
// Use lon := 0 to get the Greenwich MST.
// East longitudes are positive; West longitudes are negative
// returns: time in degrees
function mean_sidereal_time(now, lon)
{
    var year   = now.getUTCFullYear();
    var month  = now.getUTCMonth() + 1;
    var day    = now.getUTCDate();
    var hour   = now.getUTCHours();
    var minute = now.getUTCMinutes();
    var second = now.getUTCSeconds();

    if ((month == 1)||(month == 2))
    {
        year  = year - 1;
        month = month + 12;
    }

    var a = Math.floor(year/100);
    var b = 2 - a + Math.floor(a/4);
    var c = Math.floor(365.25*year);
    var d = Math.floor(30.6001*(month + 1));

    // days since J2000.0
    var jd = b + c + d - 730550.5 + day + (hour + minute/60.0 + second/3600.0)/24.0;

    // julian centuries since J2000.0
    var jt = jd/36525.0;

    // the mean sidereal time in degrees
    var mst = 280.46061837 + 360.98564736629*jd + 0.000387933*jt*jt - jt*jt*jt/38710000 + lon;

    // in degrees modulo 360.0
    if (mst > 0.0)
        while (mst > 360.0) mst = mst - 360.0;
    else
        while (mst < 0.0)   mst = mst + 360.0;

    return mst;
}

function getDateTime()
{
    // date and time at Greenwich (UTC)
    var now = new Date();
    calc.date_time.value = now.toUTCString();
}

// format two digits with leading zero if needed
function d2( n )
{
    var s = "";

    if (n < 10) s = "0" + n;
    else        s = n;

    return s;
}

// convert right ascension (hours, minutes) to degrees as real
function ra2real( hr, min )
{
    return 15*(hr + min/60);
}

// convert angle (deg, min) to degrees as real
function dms2real( deg, min )
{
    var rv;

    if (deg < 0)
        rv = deg - min/60;
    else
        rv = deg + min/60;

    return rv;
}
