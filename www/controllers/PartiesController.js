angular.module('FindAParty')
  .controller('PartiesController', function($scope, $routeParams, Party, User){
    window.scroll(0,1);
    
    //check if the user is logged in:
    User.verifyLogin($scope.storeUser);
    
    $scope.partyType = "public";
    
    $scope.parties = Party.findAll();
    
    if($routeParams.id !== undefined){
      
      $scope.party = Party.find(parseInt($routeParams.id));
    }
    
    $scope.date = new Date();
    
    $scope.getStaticMapUrl = function(location){
      var url = "https://maps.googleapis.com/maps/api/staticmap?";
      
      url += "center="+location.lat+","+location.lng+"&";
      url += "zoom=16&";
      url += "size=500x125&";
      url += "scale=2&";
      url += "markers="+location.lat+","+location.lng;
      url += "&key=AIzaSyCqWrMqngMfbrwJ18PZffg10wcyQj6w4S4";
      
      return url;
    };
    
    /*
    this.drawChart = function(){
      var data = google.visualization.arrayToDataTable([
        ["Rate", "Value", { role: "style" } ],
        ["5", 10, "color: #88b131;"],
        ["4", 8, "color: #99cc00;"],
        ["3", 6, "color: #ffcf02;"],
        ["2", 4, "color: #ff9f02;"],
        ["1", 2, "color: #ff6f31;"]
      ]);
      
      var view = new google.visualization.DataView(data);
      
      var options = {
        title: '',
        legend: 'none',
        hAxis: {baselineColor: 'none', gridlines: {color: 'none'}, textPosition: 'none'},
        vAxis: {baselineColor: 'none', gridlines: {color: 'none'}}
      };
      var chart = new google.visualization.BarChart(document.getElementById("barchart_values"));
      chart.draw(view,options);
    };
    
    this.loadChartsApiCallback = function(){
      google.charts.load('current', {'packages':['corechart']});
      
      google.charts.setOnLoadCallback(this.drawChart);
      
    };
    
    this.loadChartsApi = function(){
      var script = document.createElement('script');
      script.src = 'https://www.gstatic.com/charts/loader.js';
      script.addEventListener('load', this.loadChartsApiCallback);
      document.body.appendChild(script);
    };
    
    this.loadChart = function(party){
      this.loadChartsApi();
    };
    
    this.loadChart();
    */
    
  });