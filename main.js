document.addEventListener('DOMContentLoaded', function(){
	var goButton = document.querySelector(".js-go");
	var sectionSetup = document.querySelector(".js-setup");
	var sectionBoard = document.querySelector(".js-board");

	// var paletteConsole = document.querySelector(".js-palette-console");
	// var ulColor = document.querySelector("ul.color");

	var nameInput = document.querySelector(".js-name");
	var widthInput = document.querySelector(".js-width");
	var heightInput = document.querySelector(".js-height");
	var frameInput = document.querySelector(".js-frames");
	
	// console.log(ColorPalette);

	// for(var key in ColorPalette){
	// 	var a = document.createElement('a');
	// 	a.href = "#";
	// 	a.textContent = key;
	// 	a.dataset.console = key;
	// 	a.addEventListener('click', changePalette);
	// 	paletteConsole.appendChild(a);
	// }

	// function changePalette(e){
	// 	var cons = this.dataset.console;

	// 	for(var i = 0; i < ColorPalette[cons].length; i++){
	// 		var li = document.createElement('li');
	// 		li.dataset.color = ColorPalette[cons][i];
	// 		ulColor.appendChild(li);
	// 	}

	// }

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