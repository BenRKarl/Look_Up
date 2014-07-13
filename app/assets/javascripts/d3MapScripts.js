function renderGlobe(){
  var width   = 960,
      height  = 500;

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
      .range([-180, 180]);

  var φ = d3.scale.linear()
      .domain([0, height])
      .range([90, -90]);

  svg.on("mousemove", function() {
    var p = d3.mouse(this);
    projection.rotate([λ(p[0]), φ(p[1])]);
    svg.selectAll("path").attr("d", path);
    svg.selectAll('circle').attr('transform', function(d){
            return 'translate(' + window.projection(d) + ')';
          });
  });

  d3.json("world-110m.json", function(error, world) {
    svg.append("path")
        .datum(topojson.feature(world, world.objects.land))
        .attr("class", "land")
        .attr("d", path);
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