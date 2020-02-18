myApp.controller("stockGraphController", [
  "StockService",
  function(StockService) {
    //create a context
    let main = this;
    StockService.getAllStock().then(value => {
      main.data = value;
    });
    // main.firstStartDate = "2007-01-01";
    // main.firstEndDate = "2011-01-31";
    // main.secoundStartDate = "2007-01-01";
    // main.secoundEndDate = "2011-01-31";
    // //gets graph
    // this.getFirstGraph = () => {
    //   main.firstStartDate = firstStartDate.value;
    //   main.firstEndDate = firstEndDate.value;
    // }; // end load all blogs

    // //gets graph
    // this.getSecoundGraph = () => {
    //   main.secoundStartDate = secoundStartDate.value;
    //   main.secoundEndDate = secoundEndDate.value;
    // }; // end load all blogs
  }
]);
