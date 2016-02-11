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

    var dataLength;
    function processInfo(data, tabletop) {
	dataLength = data.length;
	for (var i = 0; i < dataLength; i++) {
	    codeAddress(data[i], createMarker);
	}
    }

    function codeAddress(data, fn) {
	geocoder.geocode({'address': data.address}, function(results, status) {
	    if (status == google.maps.GeocoderStatus.OK) {
		fn(data, results[0].geometry.location);
	    } else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
		setTimeout(function() {
		    codeAddress(data, fn);
		}, 100);
	    }
	});
    }

    var markers = [];
    var markerCluster;
    function createMarker(data, location) {
	var marker = new google.maps.Marker({'position': location, map: map});
	markers.push(marker);
	console.log(markers.length, dataLength);
	if (markers.length == dataLength) {
	    // markerCluster = new MarkerClusterer(map, markers);	    
	}
    }
    
    // this can contain html
    var personInfo = {
	name: 'Seattle Guy',
	description: 'This guy lives in Seattle and works at a place. He used to work at another place. Before living in Seattle he lived somewhere else. He used to be a Gaines fellow.',
	email: 'guyinseattle@gmail.com',
    };

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

    var infowindow = new google.maps.InfoWindow({
	content: contentString,
	maxWidth: 250,
    });

    var marker = new google.maps.Marker({
	position: {lat: 47.6, lng: -122.3},
	map: map,
	title: 'Guy in Seattle',
    });

    marker.addListener('click', function() {
	infowindow.open(map, marker);
    });
}
