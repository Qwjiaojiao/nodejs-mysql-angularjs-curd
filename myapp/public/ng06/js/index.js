// 1.定义模块
angular.module('App', ['ngRoute'])

// 2.定义路由
.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: "tpl/one.html",
            controller: "OneController"
        })
        .when('/shop', {
            templateUrl: "tpl/shop.html",
            controller: "ShopController"
        })
        .when('/cart', {
            templateUrl: "tpl/cart.html",
            controller: "CartController"
        })
        .otherwise({
            redirectTo: "/"
        })
})

// 定义控制器
.controller('IndexController',function($scope,$http){
	// 商品列表数据
    $http.get('data/1.json').then(function(msg){
	   $scope.shoplist = msg.data;	// [{1},{2},{3}]
    })

	$scope.cartlist = [];	
})

// 商品控制器
.controller('ShopController', function($scope) {
    $scope.add = function(index){	// index是shoplist的索引下标
    	// 当前的商品是否在cartlist数组中存在
    	if ($scope.cartlist.indexOf($scope.shoplist[index]) != -1) {
    		$scope.shoplist[index]['num']++;
    	} else {
    		$scope.cartlist.push($scope.shoplist[index]);
    	}
    }
})

// 购物车控制器
.controller('CartController', function($scope) {
	// $scope.cartlist = [
	// 	{id:1,title:"黄瓜",price:3.49,num:5},
	// 	{id:2,title:"茄子",price:2.39,num:3},
	// 	{id:3,title:"香肠",price:1.00,num:10},
	// 	{id:4,title:"芒果",price:5.99,num:8},
	// 	{id:5,title:"榴莲",price:12.99,num:1},
	// 	{id:6,title:"捣蒜锤",price:1.99,num:1}
	// ];

	//减法运算
	$scope.jian = function(index){
		$scope.cartlist[index].num--;

		if ($scope.cartlist[index].num <= 1) {
			$scope.cartlist[index].num = 1;
		}
	}

	// 加法运算
	$scope.jia = function(index){
		$scope.cartlist[index].num++;
	}

	// 删除数据
	$scope.del = function(index){
		$scope.cartlist.splice(index,1);
	}

	// 当监听isCheck的值发生变化的时候，重新计算总价格和总数量
	$scope.$watch('cartlist',function(){
    	// 总数量
    	$scope.total = {sum:0,price:0,isAll:true};

    	angular.forEach($scope.cartlist,function(value,key){
    		// 计算被选中的总价格和总数量
    		if (value.isCheck) {
	    		$scope.total.sum += value.num;
	    		$scope.total.price += value.num * value.price;
    		} else {
                $scope.total.isAll = false;
            }
    	})
	},true)

	// 让isCheck和全选/全不选按钮挂钩
	$scope.change = function(){
		angular.forEach($scope.cartlist,function(value){
			value.isCheck = $scope.all;
		})
	}
})