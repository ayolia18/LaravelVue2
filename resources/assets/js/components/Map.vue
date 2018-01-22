<template>
    <section id="map-container"class="section scrollspy">
        <div id="map" class="col m12 col s12"></div><br><br>
        <div class="row"> </div>
    </section>
</template>

<script>
    export default{
        data () {
            var map;
        },
        constructor(){

        },
        mounted: function() {
            this.initMap()
        },
        methods:{
            initMap: function() {
                console.log("map: ", google.maps)
                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 12,
                    center: {lat: -34.397, lng: 150.644},
                    scrollwheel: false
                });
                var geocoder = new google.maps.Geocoder();

                var styles = [{
                    "featureType": "landscape",
                    "stylers": [{"hue": "#F1FF00"}, {"saturation": -27.4}, {"lightness": 9.4}, {"gamma": 1}]
                }, {
                    "featureType": "road.highway",
                    "stylers": [{"hue": "#0099FF"}, {"saturation": -20}, {"lightness": 36.4}, {"gamma": 1}]
                }, {
                    "featureType": "road.arterial",
                    "stylers": [{"hue": "#00FF4F"}, {"saturation": 0}, {"lightness": 0}, {"gamma": 1}]
                }, {
                    "featureType": "road.local",
                    "stylers": [{"hue": "#FFB300"}, {"saturation": -38}, {"lightness": 11.2}, {"gamma": 1}]
                }, {
                    "featureType": "water",
                    "stylers": [{"hue": "#00B6FF"}, {"saturation": 4.2}, {"lightness": -63.4}, {"gamma": 1}]
                }, {"featureType": "poi", "stylers": [{"hue": "#9FFF00"}, {"saturation": 0}, {"lightness": 0}, {"gamma": 1}]}]

                map.setOptions({styles: styles});
                this.geocodeAddress(geocoder, map);
                this.createPlace(map);
            },
            geocodeAddress:function(geocoder, resultsMap) {
                var address = 'Angers,FRANCE';
                geocoder.geocode({'address': address}, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        resultsMap.setCenter(results[0].geometry.location);
                        var marker = new google.maps.Marker({
                            map: resultsMap,
                            position: results[0].geometry.location
                        });
                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
            },
            createPlace: function(map){
                var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);
                var request = {
                    location:pyrmont,
                    radius:'500',
                    types:['cafe']
                };

                var service = new google.maps.places.PlacesService(map);

                service.nearbySearch(request, this.callback);
            },
            callback:function(results,status){
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        this.createMarker(results[i]);
                    }
                }
            },
            createMarker:function(place){
                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 12,
                    center: {lat: -34.397, lng: 150.644},
                    scrollwheel: false
                });
                var placeLoc = place.geometry.location;
                var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location
                });
                console.log(place);
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent(place.name);
                    infowindow.open(map, this);
                });
            }


        }

    }



</script>

<style scoped>
    #map {
        height:300px;
        width: 100%;
    }
</style>