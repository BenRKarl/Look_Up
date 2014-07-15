var LookUp = LookUp || { Models: {}, Collections: {}, Views: {} };

LookUp.Views.PlanetView = Backbone.View.extend({
  template: _.template($('.planet-key-template').html()),
  render: function(){
    planet = this.model.attributes;
    // renderedHTML = this.template(planet);
    // this.$el.html(renderedHTML)
    appendPoints(planet.position, 'planet', planet.name.toLowerCase(), planet.size);
    return this;
  }
});
