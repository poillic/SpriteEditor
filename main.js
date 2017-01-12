document.addEventListener('DOMContentLoaded', function(){
	var goButton = document.querySelector(".js-go");
	var sectionSetup = document.querySelector(".js-setup");
	var sectionBoard = document.querySelector(".js-board");

	var nameInput = document.querySelector(".js-name");
	var widthInput = document.querySelector(".js-width");
	var heightInput = document.querySelector(".js-height");
	var frameInput = document.querySelector(".js-frames");
	

	goButton.addEventListener('click', function(e){
		e.preventDefault();

		var h = heightInput.value;
		var w = widthInput.value;
		var f = frameInput.value;
		var n = nameInput.value

		sectionSetup.classList.add('hide');
		var editor = new Editor(h, w, 8, f, n);
		sectionBoard.classList.remove('hide');

		return false;
	});
});