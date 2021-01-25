$(document).ready(function(){

  var newIP = '';


  $('.goBtn').click( function(){

    let input = $('#input-ip');
    newIP = input.val();
    input.val('');
    getIpInfo(newIP);

  });


  function getMyIP() {
    $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
      (json) => {
        newIP = json.ip;
      }
    );
    getIpInfo(newIP);
  };


  function getIpInfo(ip) {

    $.getJSON('https://geo.ipify.org/api/v1?apiKey=at_kD4aq6c7HneluEyyXOWHROzms2IRM&ipAddress=' + ip,

      function( json ) {

        $('.current-ip').text(json.ip);
        $('.current-loc').text(json.location.country + "," + json.location.city);
        $('.current-tz').text(json.location.timezone);
        $('.current-isp').text(json.isp);

        $('.map-block').html("<div id='mapid'></div>");
        defGeoloc(json.location.lat, json.location.lng);
      })
      .fail(function(){
        alert(newIP + " is invalid ip address.")
      });

  };




  function defGeoloc(latitude, longitude) {

    const mymap = L.map('mapid').setView([latitude, longitude], 13);

    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tileAttribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
    L.tileLayer(tileUrl, { tileAttribution }).addTo(mymap);

  };

  getMyIP();


});
