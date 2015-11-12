/* JavaScript code */
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

var videoStream;

//function startCam(){
//console.log('start cam');
MediaStreamTrack.getSources(function(sourceInfos) {
  //var audioSource = null;
  var videoSource = null;
  console.log('got sources');

  for (var i = sourceInfos.length - 1; i > 0; --i) {
    var sourceInfo = sourceInfos[i];
    if (sourceInfo && sourceInfo.kind === 'video') {
      console.log(sourceInfo.id, sourceInfo.label || 'camera');
      console.log('FACING: ', sourceInfo.facing, ' ID: ', sourceInfo.id, ' Label: ', sourceInfo.label);
      if (!videoSource || sourceInfo.facing == "environment") {
        videoSource = sourceInfo.id;
      }
    }
  }

  sourceSelected(videoSource);

});
//}

function sourceSelected(videoSource) {
  var constraints = {
    audio: false,
    video: {
      optional: [{
        sourceId: videoSource
      }]
    }
  };

  //console.log("Selected video=", videoSource)

  var successCallback = function(stream) {
    videoStream = stream;
    console.log('succes!!!!');
    var video = document.getElementById("camsource");
    console.log(video);
    video.src = (window.URL && window.URL.createObjectURL(stream));
  };

  var errorCallback = function(e) {
    console.log('Error connecting to camera ', e);
  };

  navigator.getUserMedia(constraints, successCallback, errorCallback);
}


function stopVideo() {
  if (videoStream) {
    videoStream.stop();
  }
}

window.setTimeout(function() {
  if (!navigator.getUserMedia) return;

  var cam_video_id = "camsource";
  console.log('camsource', cam_video_id);
  cam = camera(cam_video_id);
  cam.start();
  //startCam();
}, 2000);