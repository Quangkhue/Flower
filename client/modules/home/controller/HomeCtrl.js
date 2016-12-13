app.controller("HomeCtrl", function($scope, $rootScope){
    console.log("Home Ctrl");

    $scope.init = function(){
        $scope.sliderImgs = [
            {
                src: "/images/flowers/slider2.jpg",
                title: "Hoa tươi Đà Lạt.",
                description: "Tellus sit amet massa condimentum, vitae tincidunt lectus imperdiet. Nunc consectetur risus justo."
            },
            {
                src: "/images/flowers/slider3.jpg",
                title: "Hoa tươi Đà Lạt.",
                description: "Tellus sit amet massa condimentum, vitae tincidunt lectus imperdiet. Nunc consectetur risus justo."
            }
        ];
    }
});
