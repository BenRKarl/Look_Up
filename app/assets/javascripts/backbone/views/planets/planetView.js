var LookUp = LookUp || { Models: {}, Collections: {}, Views: {} };

LookUp.Views.PlanetView = Backbone.View.extend({
  render: function(){
    planet = this.model.attributes;
    appendPoints(planet.position, planet.name, planet.size);
    return this;
  }
});
