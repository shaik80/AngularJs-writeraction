myApp.config([
  "$routeProvider",
  $routeProvider => {
    $routeProvider
      .when("/", {
        // location of the template
        templateUrl: "views/dashboard.html",
        // Which controller it should use
        controller: "allBlogController",
        // what is the alias of that controller.
        controllerAs: "Blogs"
      })
      .when("/create", {
        templateUrl: "views/create.html",
        controller: "addEditBlogController",
        controllerAs: "AddEditBlog"
      })
      .when("/edit/:id", {
        templateUrl: "views/edit.html"
      })
      .when("/graph", {
        templateUrl: "views/graph.html",
        controller: "stockGraphController",
        controllerAs: "StockGraph"
      })
      .otherwise({
        //redirectTo:'/'
        template: "<h1>404 page not found</h1>"
      });
  }
]);
