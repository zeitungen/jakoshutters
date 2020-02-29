document.addEventListener("DOMContentLoaded", function() {
	const bigbedroom = {
		up: document.querySelector(".jako-bigbedroom.jako-btn-up"),
		home: document.querySelector(".jako-bigbedroom.jako-btn-home"),
		down: document.querySelector(".jako-bigbedroom.jako-btn-down"),
	};

	const littlebedroom = {
		up: document.querySelector(".jako-littlebedroom.jako-btn-up"),
		home: document.querySelector(".jako-littlebedroom.jako-btn-home"),
		down: document.querySelector(".jako-littlebedroom.jako-btn-down"),
	};

	const office = {
		up: document.querySelector(".jako-office.jako-btn-up"),
		home: document.querySelector(".jako-office.jako-btn-home"),
		down: document.querySelector(".jako-office.jako-btn-down"),
	};

	const stairs = {
		up: document.querySelector(".jako-stairs.jako-btn-up"),
		home: document.querySelector(".jako-stairs.jako-btn-home"),
		down: document.querySelector(".jako-stairs.jako-btn-down"),
	};

	bigbedroom.up.addEventListener("click", function() {
		console.log("bigbedroom up");
	}, false);

	bigbedroom.home.addEventListener("click", function() {
		console.log("bigbedroom home");
	}, false);

	bigbedroom.down.addEventListener("click", function() {
		console.log("bigbedroom down");
	}, false);

	littlebedroom.up.addEventListener("click", function() {
		console.log("littlebedroom up");
	}, false);

	littlebedroom.home.addEventListener("click", function() {
		console.log("littlebedroom home");
	}, false);

	littlebedroom.down.addEventListener("click", function() {
		console.log("littlebedroom down");
	}, false);

	office.up.addEventListener("click", function() {
		console.log("office up");
	}, false);

	office.home.addEventListener("click", function() {
		console.log("office home");
	}, false);

	office.down.addEventListener("click", function() {
		console.log("office down");
	}, false);

	stairs.up.addEventListener("click", function() {
		console.log("stairs up");
	}, false);

	stairs.home.addEventListener("click", function() {
		console.log("stairs home");
	}, false);

	stairs.down.addEventListener("click", function() {
		console.log("stairs down");
	}, false);
});