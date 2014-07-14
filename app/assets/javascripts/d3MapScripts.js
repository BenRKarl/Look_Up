function renderGlobe(){
  var width   = 960,
      height  = 500,
      velocity = .001,
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

  window.svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);

  var λ = d3.scale.linear()
      .domain([0, width])
      .range([-180, 179]);

  var φ = d3.scale.linear()
      .domain([0, height])
      .range([90, -90]);

  d3.timer(function(){
    setInterval(function(){
      var angle = velocity * (Date.now() - then);
      projection.rotate([angle, 0, 0])
      svg.selectAll('path.point')
        .attr('d', path.projection(projection));
    })
  })

  // svg.on("mousemove", function() {
  //   var p = d3.mouse(this);
  //   projection.rotate([λ(p[0]), 0]);
  //   svg.selectAll("path").attr("d", path);
  //   svg.selectAll('circle').attr('transform', function(d){
  //           return 'translate(' + window.projection(d) + ')';
  //         });
  // });

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

function appendPoints(data, pointClass, radius){
  window.svg.selectAll('path.point')
            .data(data)
            .enter()
            .append('path')
            .datum(function(d){
              return {'type': 'Point', 'coordinates': d, 'radius': radius}
            })
            .attr('class', pointClass)
            .attr('d', window.path)
}
