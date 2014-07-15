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
    position: [0, 0],
  },
  incrementLongitude: function(){
    planetLong = this.attributes.position[0][0];
    if (planetLong >= 360){
        planetLong = 0;
    } else {
        planetLong += 5;
    }
    this.attributes.position[0][0] = planetLong;
  }
})
