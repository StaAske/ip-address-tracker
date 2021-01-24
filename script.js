$(document).ready(function(){

  let myIP = '';

  $.getJSON("https://api.ipify.org?format=jsonp&callback=?",(json) => { myIP = json.ip; });


  $.getJSON('https://geo.ipify.org/api/v1?apiKey=at_kD4aq6c7HneluEyyXOWHROzms2IRM&ipAddress=' + myIP,
    function( json ) {
      $('.current-ip').text(json.ip);
      $('.current-loc').text(json.location.country + "," + json.location.city);
      $('.current-tz').text(json.location.timezone);
      $('.current-isp').text(json.isp);

      defGeoloc(json.location.lat, json.location.lng);
    }
  );

  function defGeoloc(latitude, longitude) {

    const mymap = L.map('mapid').setView([latitude, longitude], 13);

    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tileAttribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
    L.tileLayer(tileUrl, { tileAttribution }).addTo(mymap);

  };



});
