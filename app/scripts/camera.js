var camera = (function(p_vid_id, p_inter, p_scale) {

	if (p_vid_id == undefined) {
		console.log("ERROR: You need to specify the id of the <video> element with the camera data stream.");
		return;
	}

	var vid_id = "camsource";
	var interval = p_inter != undefined ? p_inter : 1000;
	var scale = p_scale != undefined ? p_scale : 0.5;

	var video = document.getElementById("camsource");
	console.log('video', video);
	var int_id = null;

	function start() {
		int_id = setInterval(function(video, scale) {
			capture()
		}, interval);
	}

	function stop() {
		console.log("Clearing interval with id " + int_id);
		clearInterval(int_id);
	}

	function capture() {
		if (!video) {
			video = document.getElementById("camsource");
		}
		if (!video) {
			console.log('cannot find camsource element');
		}
		//console.time('capture');
		var w = video.videoWidth * scale;
		var h = video.videoHeight * scale;
		var qr_can = document.getElementById('qr-canvas').getContext('2d');
		qr_can.drawImage(video, 0, 0, w, h);
		try {
			var test = qrcode.decode();
			console.log(test);
			// fire event 'qrcoderead'
			var event = new CustomEvent("qrcoderead", {
				"detail": test
			});
			// Dispatch/Trigger/Fire the event
			document.dispatchEvent(event);
		} catch (err) {
			$("#qr-value").text(err);
			console.log('error? ', err);
		}
		//console.timeEnd('capture');
	}

	return {
		interval: interval,
		scale: scale,
		start: start,
		stop: stop,
		capture: capture
	}

})