
app.controller("HomeCtrl", function($scope, $rootScope, ProductSvc, CategorySvc, $state){
    console.log("Home Ctrl");

    $scope.init = function(){
        console.log("categories: ", $rootScope.categories);
        $scope.sliderImgs = [
            {
                src: "/images/flowers/slider2.jpg",
                title: "Hoa Tươi Đà Lạt.",
                description: "Chuyên cung cấp hoa tươi giá sỉ Uy Tín - Chất Lượng - Miễn Phí Giao Hàng Toàn Quốc"
            },
            {
                src: "/images/flowers/slider3.jpg",
                title: "Hoa Tươi Đà Lạt.",
                description: "Chuyên cung cấp hoa tươi giá sỉ Uy Tín - Chất Lượng - Miễn Phí Giao Hàng Toàn Quốc"
            }
        ];
    }
    $scope.viewDetail = function(){
        $scope.goToPage("app.contact");
    }
});
