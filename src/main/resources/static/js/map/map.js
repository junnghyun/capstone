var mapContainer = document.getElementById('map'),
    mapOption = {
        center: new kakao.maps.LatLng(36.911602, 127.12831),
        level: 3,
        mapTypeId: kakao.maps.MapTypeId.ROADMAP
    };

var map = new kakao.maps.Map(mapContainer, mapOption);

var mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude,
            lon = position.coords.longitude;
        var locPosition = new kakao.maps.LatLng(lat, lon),
            message = '<div style="padding:5px;">Current Location</div>';

        map.setCenter(locPosition);

        var marker = new kakao.maps.Marker({
            map: map,
            position: locPosition
        });

        var infowindow = new kakao.maps.InfoWindow({
            content: message,
            removable: true
        });
        infowindow.open(map, marker);

        kakao.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });
    });
} else {
    alert("Unable to use your current location.");
}

var markerPosition = new kakao.maps.LatLng(36.911602, 127.12831);

var roadPath = [
    new kakao.maps.LatLng(36.911663, 127.1282),
    new kakao.maps.LatLng(36.911161, 127.12859)
];

var content = '<img id="roadImage" src="/img/rotated_DJI_0333.JPG" alt="도로 이미지" style="position: absolute;">';

var customOverlay = new kakao.maps.CustomOverlay({
    map: map,
    clickable: true,
    content: content,
    position: roadPath[0],
    xAnchor: 0.5,
    yAnchor: 0.5
});

function adjustOverlaySize() {
    var image = document.getElementById('roadImage');
    if (!image) return;

    var projection = map.getProjection();
    var point1 = projection.pointFromCoords(roadPath[0]);
    var point2 = projection.pointFromCoords(roadPath[1]);
    var width = Math.abs(point2.x - point1.x);
    var height = Math.abs(point2.y - point1.y);

    image.style.width = width + 'px';
    image.style.height = height + 'px';
}

kakao.maps.event.addListener(map, 'zoom_changed', adjustOverlaySize);
kakao.maps.event.addListener(map, 'center_changed', adjustOverlaySize);

adjustOverlaySize();

kakao.maps.event.addListener(marker2, 'click', function() {
    alert('You clicked the additional marker!');
});
