var staticUrl = 'http://localhost/exercise/index.php';

$.ajax({
  url: staticUrl,
  crossOrigin: true,
  type: 'GET',
  //xhrFields: { withCredentials: true },
  accept: 'application/json'
}).done(function (jsonData) {
  var myObj = JSON.parse(jsonData);
  var dataset1 = [];
  var dataset2 = [];
  var dataset3 = [];

  //Dataset preparation
  for (var i = 0; i < 100; i++) {
    var time = myObj[i].timeval;
    var pulse = myObj[i].pulseval;
    dataset1.push({
      label: time,
      y: parseInt(pulse),

    });

    var errorValue = parseInt(pulse) + Math.floor(Math.random() * 10);

    dataset2.push({
      label: time,
      y: errorValue,
    });


    dataset3.push({
      lablel: time,
      y: errorValue - parseInt(pulse),
    });

  }

  //Charts preparation
  var feeds1 = {
    title: {
      text: "Real pulse rate"
    },
    zoomEnabled: true,
    exportEnabled: true,
    animationEnabled: true,
    data: [{
      type: "line",
      dataPoints: dataset1
    }]
  };
  var feeds2 = {
    title: {
      text: "Predicted pulse rate"
    },
    zoomEnabled: true,
    exportEnabled: true,
    animationEnabled: true,
    data: [{
      type: "line",
      dataPoints: dataset2
    }]
  };
  var feeds3 = {
    title: {
      text: "Improved Predicted pulse rate"
    },
    zoomEnabled: true,
    exportEnabled: true,
    animationEnabled: true,
    data: [{
      type: "line",
      dataPoints: dataset3
    }]
  };

  $("#Chart1").CanvasJSChart(feeds1);
  $("#Chart2").CanvasJSChart(feeds2);
  $("#Chart3").CanvasJSChart(feeds3);

})







