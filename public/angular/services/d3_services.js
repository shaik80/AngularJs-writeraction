myApp.service("StockService", function($http) {
  var baseUrl = "http://localhost:3000/api/";

  this.getAllStock = () => {
    
    return $http.get(baseUrl + "stock/");
  };
});
