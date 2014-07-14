var LookUp = LookUp || { Models: {}, Collections: {}, Views: {} };

LookUp.Views.PlanetView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model, 'change', this.render);
  },
  render: function(){
    planet = this.model.attributes;
    appendPoints(planet.position, planet.name.toLowerCase(), planet.size);
    return this;
  }
});
