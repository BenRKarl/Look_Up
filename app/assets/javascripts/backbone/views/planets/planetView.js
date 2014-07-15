var LookUp = LookUp || { Models: {}, Collections: {}, Views: {} };

LookUp.Views.PlanetView = Backbone.View.extend({
  render: function(){
    planet = this.model.attributes;
    appendPoints(planet.position, 'planet', planet.name.toLowerCase(), planet.size);
    return this;
  }
});
