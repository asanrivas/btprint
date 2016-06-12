// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('mainprint', function($scope){
    $scope.testbutton = "Test Button";

    function printSomeTestText() {
        window.DatecsPrinter.printText("Print Test!", 'ISO-8859-1',
            function() {
              printMyImage();
            }
        );
    }

    function printMyImage() {
      var image = new Image();
      image.src = 'img/ionic.png';
      image.onload = function() {
          var canvas = document.createElement('canvas');
          canvas.height = 100;
          canvas.width = 100;
          var context = canvas.getContext('2d');
          context.drawImage(image, 0, 0);
          var imageData = canvas.toDataURL('image/jpeg').replace(/^data:image\/(png|jpg|jpeg);base64,/, ""); //remove mimetype
          window.DatecsPrinter.printImage(
              imageData, //base64
              canvas.width,
              canvas.height,
              1,
              function() {
                printMyBarcode();
              },
              function(error) {
                  alert(JSON.stringify(error));
              }
          )
      };
    }

    function printMyBarcode() {
      window.DatecsPrinter.printBarcode(
        75, //here goes the barcode type code
        '13132498746313210584982011487', //your barcode data
        function() {
          alert('success!');
        },
        function(error) {
          alert(JSON.stringify(error));
        }
      );
    }

    $scope.address_selected = '';
    $scope.select_printer = function(){
        window.DatecsPrinter.listBluetoothDevices(function(data){
            $scope.devices = data;
            $scope.$apply();
        });
    };
    $scope.set_printer = function(address){
        $scope.address_selected = address;
    };
    $scope.start_print = function(){
        window.DatecsPrinter.connect($scope.address_selected,
         function() {
           printSomeTestText();
         },
         function(error) {
           alert(JSON.stringify(error));
         }
       );
    };
});
