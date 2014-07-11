var LookUp = LookUp || { Models: {}, Collections: {}, Views: {} };

LookUp.Views.PlanetListView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'all', this.render);
  },
  render: function(){
    var that = this;
    this.$el.empty();
    _.each(this.collection.models, function(planet){
      var newPlanetView = new LookUp.Views.PlanetView({model: planet});
      that.$el.append(newPlanetView.render().el);
    });
    return this;
  }
});
