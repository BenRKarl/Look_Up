var LookUp = LookUp || { Models: {}, Collections: {}, Views: {} };

LookUp.Views.PlanetView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model, 'all', this.render);
  },
  tagName: 'li', //baseline for initial rendering
  template: _.template($('.planet-template').html()),
  render: function(){
    var renderedPlanet = this.template(this.model.attributes);
    this.$el.html(renderedPlanet);
    return this;
  }
});
