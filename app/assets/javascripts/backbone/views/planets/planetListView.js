var LookUp = LookUp || { Models: {}, Collections: {}, Views: {} };

LookUp.Views.PlanetListView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'add', this.render);
  },
  render: function(){
    var that = this;
    _.each(this.collection.models, function(planet){
      var newPlanetView = new LookUp.Views.PlanetView({model: planet});
      newPlanetView.render()
    });
    return this;
  }
});
