myApp.controller("editBlogController", [
  "BlogService",
  "t$stateParams",
  function(BlogService, $stateParams) {
    //create a context
    let main = this;
    //gets all blogss
    main.id = $stateParams.id;

    this.viewBlog = id => {
      BlogService.getBlog(id).then(
        function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          console.log(response.data);
          main.blogs = response.data;
        },
        function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          if (response.status != -1) {
            alert("some error occurred. Check the console.");
            console.log(response);
          }
        }
      );
    };
  }
]); // end controller
