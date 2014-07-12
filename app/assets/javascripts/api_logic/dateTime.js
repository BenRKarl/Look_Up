Date.prototype.formattedDate = function(){
  var dd   = (this.getDate() < 10 ? "0" : "") + this.getDate();
  var mm   = (this.getMonth() + 1 < 10 ? "0" : "") + (this.getMonth() + 1);
  var yyyy = this.getFullYear();
  return yyyy + '/' + mm + '/' + dd;
}


Date.prototype.formattedTime = function(){
  var hours   = (this.getHours() < 10 ? "0" : "")   + this.getHours();
  var minutes = (this.getMinutes() < 10 ? "0" : "") + this.getMinutes();
  var seconds = (this.getSeconds() < 10 ? "0" : "") + this.getSeconds();
  return hours + ':' + minutes + ':' + seconds
}
