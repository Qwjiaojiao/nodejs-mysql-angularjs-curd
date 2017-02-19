var myApp = angular.module("myApp", ['ui.router']);

myApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when("", "/page3");
    $urlRouterProvider.when("/", "/page2");
//state 状态 与ui-sref匹配
// url 浏览器url跳转路径显示
// templateUrl:跳转页面
// controller：业务逻辑处理
    $stateProvider
        .state("page1", {
            url: "/page1",
            templateUrl: "page_1.html",
            controller: 'Page1Controller'
        })
        .state("page2", {
            url:"/page2",
            templateUrl: "page_2.html",
            controller: 'Page2Controller'

})
        .state("page3", {
            url:"/page3",
            templateUrl: "page_3.html",
            controller: 'Page3Controller'
        });
})

// 定义page1控制器
.controller('Page1Controller',function($scope,$http){
    console.log("处理业务逻辑page1页面");
})

// 定义page1控制器
    .controller('Page2Controller',function($scope,$http){
        console.log("处理业务逻辑page2页面");
    })
    // 定义page1控制器
    .controller('Page3Controller',function($scope,$http){
        console.log("处理业务逻辑page3页面");
    })
