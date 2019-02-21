let startTimer = document.querySelector("#startTimer");
let stopTimer = document.querySelector("#stopTimer");
let addSes = document.querySelector("#sesPlus");
let subtractSes = document.querySelector("#sesMinus");
let addBreak = document.querySelector("#breakPlus");
let subtractBreak = document.querySelector("#breakMinus");
let time = document.querySelector("#getMinsAndSecs");
let sesVal = document.querySelector("#sessionValue");
let breakVal = document.querySelector("#breakValue");
let b = true;
let startPause = true;

startTimer.addEventListener("click", countDown);
addSes.addEventListener("click", changeValSes);
subtractSes.addEventListener("click", changeValSes);
addBreak.addEventListener("click", changeValBreak);
subtractBreak.addEventListener("click", changeValBreak);

function countDown() {
	stopTimer.addEventListener("click", stopCtDown);
	
	if (startPause) {
		startTimer.src = "images/pause.png";
		startPause = !startPause;
		
		interval = setInterval(function() {
			let secs = time.textContent.split(":");
			secs = secs[1];
			let mins = time.textContent.split(":");
			mins = mins[0];
			secs--;
		
			if (secs < 0) {
				secs = 59;
				mins--;
				if (mins < 0) {
					if (b) {
						updateMinsAndSecs(breakVal.textContent);
						b = !b;
					}
				
					else if (!b) {
						updateMinsAndSecs(sesVal.textContent);
						b = !b;
					}
				}
			
				else if (mins < 10) {
					time.textContent = `0${mins}:${secs}`
				}
			
				else {
					time.textContent = `${mins}:${secs}`;
				}
			}
		
			else if (secs < 10) {
				if (mins < 10 && mins.length < 2) {
					time.textContent = `0${mins}:0${secs}`;
				}
			
				else {
					time.textContent = `${mins}:0${secs}`;
				}
			}
		
			else {
				if (mins < 10 && mins.length < 2) {
					time.textContent = `0${mins}:${secs}`;
				}
			
				else {
					time.textContent = `${mins}:${secs}`;
				}
			}
		}, 1000);
	}
	
	else if (!startPause) {
		clearInterval(interval);
		startTimer.src = "images/play.png";
		startPause = !startPause;
	}
	
	function stopCtDown() {
		clearInterval(interval);
		updateMinsAndSecs(sesVal.textContent);
		startTimer.src = "images/play.png";
		startPause = true;
	}
}

function changeValSes(e) {
	let number = Number(sesVal.textContent);

	if (e.path[0].alt == "plus" && number < 99) {
		number++;
		sesVal.textContent = number;
		updateMinsAndSecs(sesVal.textContent);
	}
	
	else if (e.path[0].alt == "minus" && number > 1) {
		number--;
		sesVal.textContent = number;
		updateMinsAndSecs(sesVal.textContent);
	}
	
}

function changeValBreak(e) {
	let number = Number(breakVal.textContent);
	
	if (e.path[0].alt == "plus" && number < 99) {
		number++;
		breakVal.textContent = number;
	}
	
	else if (e.path[0].alt == "minus" && number > 1) {
		number--;
		breakVal.textContent = number;
	}
}

function updateMinsAndSecs(value) {
	if (value < 10)
		time.textContent = `0${value}:00`;
	
	else
		time.textContent = `${value}:00`;
}