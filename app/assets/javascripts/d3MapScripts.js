function renderGlobe(){
  var width   = 960,
      height  = 500,
      velocityFast = .01,
      velocitySlow = .001,
      then = Date.now();

  window.projection = d3.geo.orthographic()
      .scale(250)
      .translate([width / 2, height / 2])
      .clipAngle(90);

  window.path = d3.geo.path()
      .projection(projection)
      .pointRadius(function(d){
        return d.radius
      })

  window.skyProjection = d3.geo.orthographic()
      .scale(250)
      .translate([width / 2, height / 2])
      .clipAngle(90);

  window.skyPath = d3.geo.path()
      .projection(skyProjection)
      .pointRadius(function(d){
        return d.radius
      })

  window.svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);

  var λ = d3.scale.linear()
      .domain([0, width])
      .range([-180, 180]);

  var φ = d3.scale.linear()
      .domain([0, height])
      .range([90, -90]);

  var γ = d3.scale.linear()
      .domain([0, height])
      .range([90, -90]);

  d3.timer(function(){
      var planetAngle = velocityFast * (Date.now() - then);
      var earthAngle = velocitySlow * (Date.now() - then);
      projection.rotate([earthAngle, 0, 0])
      svg.selectAll('path')
        .attr('d', path.projection(projection))

      skyProjection.rotate([planetAngle, -15, 0])
      svg.selectAll('path.planet')
        .attr('d', skyPath.projection(skyProjection))
  })

  d3.json("world-110m.json", function(error, world) {
    svg.append("path")
        .datum(topojson.feature(world, world.objects.ocean))
        .attr("class", "ocean")
        .attr("d", path)

    svg.append("path")
        .datum(topojson.feature(world, world.objects.land))
        .attr("class", "land")
        .attr("d", path)
  });

}

function appendPoints(data, pointClass, pointId, radius){
  window.svg.selectAll('path.point')
            .data(data)
            .enter()
            .append('path')
            .datum(function(d){
              return {'type': 'Point', 'coordinates': d, 'radius': radius}
            })
            .attr('class', pointClass)
            .attr('id', pointId)
            .attr('d', window.skyPath)
}
