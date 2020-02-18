myApp.service("BlogService", function($http) {
  var baseUrl = "http://localhost:3000/api/";

  this.getAllBlog = () => {
    return $http.get(baseUrl + "blogs");
  };

  this.getBlog = id => {
    return $http.get(baseUrl + "blog/" + id);
  };

  this.createBlog = data => {
    return $http.post(baseUrl + "blogs/create", data);
  };
  this.editBlog = (id, data) => {
    return $http.put(baseUrl + "/blogs/" + id + "/edit", data);
  };
  this.deleteBlog = id => {
    return $http.post(baseUrl + "/blogs/" + id + "/delete");
  };
});
