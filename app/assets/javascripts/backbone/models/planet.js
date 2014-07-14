var LookUp = LookUp || { Models: {}, Collections: {}, Views: {} };

LookUp.Models.Planet = Backbone.Model.extend({
  defaults:{
    name:     "",
    dec:      "",
    mag:      "",
    phase:    "",
    ra:       "",
    rise:     "",
    set:      "",
    size:     "",
    transit:  "",
    position: [[0, 0]],
  }
})
