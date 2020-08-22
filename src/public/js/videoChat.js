function closeVideoStream(stream){
    return stream.getTracks().forEach(track => track.stop())
  }
  function playVideoStream(videoTagId,stream){ 
    let video = document.getElementById(videoTagId);
    video.srcObject = stream;
    video.onloadeddata=function(){
        video.play()
    }
    video.addEventListener("play", () => {
      $("canvas").remove()
      const canvas = faceapi.createCanvasFromMedia(video)
      $(".modal-body").prepend(canvas)
      const displaySize = { width: video.width, height: video.height }
      faceapi.matchDimensions(canvas, displaySize)
      setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        console.log(detections)
        // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
      }, 100)
    })
  }
  function startVideo() {
    let getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia).bind(navigator);
     getUserMedia({ video:true  },function(stream){
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models")
      ]).then(playVideoStream("remote-stream",stream))
  
      $("#streamModal").on("hidden.bs.modal",function(){
        closeVideoStream(stream);
        $("canvas").remove()
      })
    },function(err){
      console.log(err)
    })
  }
  
  $(document).ready(function(){
    $("#video-chat").bind("click",function(){
      $("#streamModal").modal("show");
      startVideo();
    })
  })
  
  