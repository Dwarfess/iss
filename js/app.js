var app = angular.module('app', ['ngMap']);

app.controller('myCtrl', function($scope, $http, $interval) {
    $scope.iss;
    $scope.marker;
    $scope.lat;
    $scope.lng;
    $scope.currentDate;
    
    function refresh() {
        //get people from the iss
        $http.get("http://api.open-notify.org/astros.json").then(function(response) {
            $scope.iss = response.data;

        }, function(data, status, headers, config) {
            console.log(data);
            console.log(status);
            console.log(headers);
            console.log(config);
        });

        //get info about iss
        $http.get("http://api.open-notify.org/iss-now.json").then(function(response) {
            $scope.currentDate = response.data.timestamp*1000;
            
            $scope.lat = response.data.iss_position.latitude;
            $scope.lng = response.data.iss_position.longitude;
            $scope.marker = [$scope.lat, $scope.lng];

        }, function(data, status, headers, config) {
            console.log(data);
            console.log(status);
            console.log(headers);
            console.log(config);
        });
    }
    refresh();

    $interval(refresh, 5000);









    //for style
    $scope.styles = [{
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
            "color": "#193341"
        }]
    }, {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{
            "color": "#2c5a71"
        }]
    }, {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{
            "color": "#29768a"
        }, {
            "lightness": -37
        }]
    }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
            "color": "#406d80"
        }]
    }, {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [{
            "color": "#406d80"
        }]
    }, {
        "elementType": "labels.text.stroke",
        "stylers": [{
            "visibility": "on"
        }, {
            "color": "#3e606f"
        }, {
            "weight": 2
        }, {
            "gamma": 0.84
        }]
    }, {
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#ffffff"
        }]
    }, {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [{
            "weight": 0.6
        }, {
            "color": "#1a3541"
        }]
    }, {
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{
            "color": "#2c5a71"
        }]
    }]
});