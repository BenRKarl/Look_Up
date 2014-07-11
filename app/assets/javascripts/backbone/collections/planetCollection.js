var LookUp = LookUp || { Models: {}, Collections: {}, Views: {} };

LookUp.Collections.PlanetCollection = Backbone.Collection.extend({
  model: LookUp.Models.Planet,
  url: '/astronomy'
});
