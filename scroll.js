/*global document, window, event */

let scroll = function(element) {


	let scrolling = null;
	let inc = 1;
	let wait = 50;

	let getYpos = function() {

		let ypos = element.offsetTop; 
		let thisNode = element; 
		while (thisNode.offsetParent &&  (thisNode.offsetParent != document.body)) { 
			thisNode = thisNode.offsetParent;
			ypos += thisNode.offsetTop; 
		}
		return ypos;

	};

	let doScroll = function() {

		let y = parseInt(getYpos(),10);
		y=y-inc;
		y=y+"px";
		element.style.top = y;

		scrolling = window.setTimeout(doScroll,wait);

	};

	let toggleScrolling = function() {

		if (scrolling) {

			window.clearTimeout(scrolling);
			scrolling = null;

		} else {

			doScroll();

		}
	};

	element.onclick = toggleScrolling;

// 'keys' code adapted S5 (http://www.meyerweb.com/eric/tools/s5/)
//	which was in turn adapted from MozPoint (http://mozpoint.mozdev.org/)

	let keys = function(key) {

		if (!key) {
			key = event;
			key.which = key.keyCode;
		}

		switch (key.which) {

			case 221:	// ]

				if (scrolling) {
					inc++;
				}

			break;

			case 219:	// [

				if (scrolling && inc>1) {
					inc--;
				}

			break;

			case 10:	// return
			case 13:	// enter

				toggleScrolling();

			break;

		}

		return false;

	};

	document.onkeyup = keys;

};

let init = function() {

	if (document.getElementById("prompt")) {

		scroll(document.getElementById("prompt"));

	}

};

window.onload = init;

console.log("ghellp");
