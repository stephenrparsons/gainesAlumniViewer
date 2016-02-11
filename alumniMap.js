var map;
var geocoder;

function initMap() {
    var mapOptions = {
	zoom: 3,
	center: {lat: 40, lng: -100},
    };

    map = new google.maps.Map(document.getElementById('alumniMap'), mapOptions);
    geocoder = new google.maps.Geocoder();

    Tabletop.init({
	key: '18bMBLhFDkPSANuJkpytZ9Eq-gedWaJRh09_3IkcDMSM',
	callback: processInfo,
	simpleSheet: true,
    });

    var markers = [];
    var markerCluster;
    var infoWindow;
    function processInfo(data, tabletop) {
	infoWindow = new google.maps.InfoWindow({maxWidth: 250});
	for (var i = 0; i < data.length; i++) {
	    var latLng = data[i].latLong.split(',');
	    var position = {'lat': parseFloat(latLng[0]), 'lng': parseFloat(latLng[1])};
	    var marker = new google.maps.Marker({'position': position, map: map});
	    marker.addListener('click', (openInfoWindow(marker, data[i])));
	    markers.push(marker);
	}
	// markerCluster = new MarkerClusterer(map, markers);
    }

    function openInfoWindow(marker, personInfo) {
	var contentString = '<p style="margin: 20px 0 20px 0"><h3>'+
	    personInfo.name +
	    '</h3></p>'+
	    '<p style="margin: 20px 0 20px 0">'+
	    personInfo.description +
	    '<p style="margin: 20px 0 20px 0">Email: <a href="mailto:'+
	    personInfo.email +
	    '">'+
	    personInfo.email +
	    '</a></p>';

	return function() {
	    infoWindow.setContent(contentString);
	    infoWindow.open(map, marker);
	};
    }
}
