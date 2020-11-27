var staticUrl = 'http://localhost/exercise/index.php';

window.onload = async function () {
  await chartGenerator(100);
}
async function chartGenerator() {

  await fetch("http://localhost/exercise/index.php").then(function (res) {
    return res.json();
  }).then(function (jsonData) {

    var dataset1 = [];
    var dataset2 = [];
    var dataset3 = [];

//Dataset preparation
    for (var i = 0; i < jsonData.length; i++) {
      var datetime = jsonData[i].time.split('T');
      var firstArray = datetime[1];
      var secondArray = firstArray.split('Z');
      var finalTime = secondArray[0];
      var value = jsonData[i].value;
      dataset1.push({
        x: finalTime,
        y: value
      });
	  
	  var errorVal = value + Math.floor(Math.random() * 10);
      dataset2.push({
        x: finalTime,
        y: errorVal,
      });
	  
      dataset3.push({
        x: finalTime,
        y: errorVal - value,
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

  }).catch(function (error) {
    console.log("error: " + error);
  });

}