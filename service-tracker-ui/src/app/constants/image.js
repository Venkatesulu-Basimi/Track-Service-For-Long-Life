// Create the module
var subscriptionControllers = angular.module("subscriptionControllers", []);

// Define the controller
subscriptionControllers.controller("imagesController", function ($scope) {
  $scope.images = [
    {
      src: "../../assests/images/logo.png", // Correct path to your local image
    },
  ];
});
