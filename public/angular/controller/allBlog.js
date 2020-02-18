myApp.controller("allBlogController", [
  "BlogService",
  "toaster",
  "$location",
  function(BlogService, toaster, $location) {
    //create a context
    let main = this;
    //gets all blogs
    this.allBlog = () => {
      BlogService.getAllBlog().then(
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
    }; // end load all blogs

    this.deleteBlog = id => {
      BlogService.deleteBlog(id).then(
        function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          console.log(response.data);
          if (response.data.ok == 1) {
            main.allBlog();
            alert("sucessfully deleted");
            // toaster.pop("info", "title", "text");
          }
          // main.blogs = response.data;
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
    }; // end delete blogs

    this.addBlog = (title, subTitle, blogBody, allTags) => {
      let blogdetails = {
        title: title,
        subTitle: subTitle,
        blogBody: blogBody,
        allTags: allTags
      };

      BlogService.createBlog(blogdetails).then(
        function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          console.log(response.data);
          main.blogs = response.data;
          alert("sucessfully Added");
          $location.path("/");
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
