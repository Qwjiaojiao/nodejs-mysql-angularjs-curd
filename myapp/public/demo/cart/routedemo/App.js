var myApp = angular.module("myApp", ['ui.router']);

myApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when("/", "/page1");

    $stateProvider
        .state("page1", {
            url: "/page1",
            templateUrl: "page1.html"
        })
        .state("page2", {
            url:"/page2",
            templateUrl: "page2.html"
        })
        .state("page3", {
            url:"/page3",
            templateUrl: "page3.html"
        });
});