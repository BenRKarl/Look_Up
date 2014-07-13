var LookUp = LookUp || { Models: {}, Collections: {}, Views: {} };

LookUp.Views.PlanetView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model, 'all', this.render);
  },
  render: function(){
    var renderedPlanet = this.template(this.model.attributes);
    this.$el.html(renderedPlanet);
    return this;
  }
});
