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
	key: '1FPaL_WPgkac9CzJT8krX0i1AGPr4nJ17RTGd5lkVnUs',
	callback: processInfo,
	simpleSheet: true,
    });

    var markers = [];
    var markerCluster;
    var infoWindow;
    function processInfo(data, tabletop) {
	infoWindow = new google.maps.InfoWindow({maxWidth: 250});
	for (var i = 0; i < data.length; i++) {
	    var latLng = data[i].LatLong.split(',');
	    var position = {'lat': parseFloat(latLng[0]), 'lng': parseFloat(latLng[1])};
	    var marker = new google.maps.Marker({'position': position, map: map});
	    marker.addListener('click', (openInfoWindow(marker, data[i])));
	    markers.push(marker);
	}
    }

    function openInfoWindow(marker, personInfo) {
	var contentString = '<div style="max-height: 150px"><p></p><h3>'+
	    personInfo.Name +
	    '</h3><p style="margin: 0">('+
	    personInfo.Year +
	    ')</p><p style="margin: 20px 0 20px 0">'+
	    personInfo.Update +
	    '</p></div>';

	return function() {
	    infoWindow.setContent(contentString);
	    infoWindow.open(map, marker);
	};
    }
}
