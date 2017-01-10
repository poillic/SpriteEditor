var Editor = function(_x, _y, _step) {
	this.cvs = document.querySelector(".js-canvas");
	this.ctx = this.cvs.getContext('2d');
	this.cvs.width = _x * 30;
	this.cvs.height = _y * 30;
	this.dimension = {x: _x, y: _y };
	this.step = _step;
	this.state = "draw";
	this.projectName = "";
	/* Buttons */

	this.saveButton = document.querySelector(".js-save");
	this.eraserButton = document.querySelector(".js-eraser");

	/* SubObjects */
	this.colorStamp = new ColorStamp();
	this.previewCanvas = new PreviewCanvas(this.dimension.x, this.dimension.y);

	this.grid = [];

	this.generateGrid = function(){
		this.ctx.lineWdith = 1;

		var gridSize = this.dimension.x * this.dimension.y;

		for(var y = 0; y < this.dimension.y; y++){
			for(var x = 0; x < this.dimension.x; x++){
				if(x % this.step == 0 ){
					this.ctx.strokeStyle = "rgba(255, 0, 255,1)";
				}else{
					this.ctx.strokeStyle = "rgba(0,0,0,1)";
				}

				this.ctx.strokeRect(30 * x, 30 * y, 30, 30);
			}
		}
	}

	this.getClickPosition = function(e){
		var cx = e.clientX - this.cvs.offsetLeft;
		var cy = e.clientY - this.cvs.offsetTop;

		var x = Math.floor(cx/30);
		var y = Math.floor((cy/30)%this.dimension.y);

		this.grid[y][x] = this.colorStamp.color;
		this.render();
	}

	this.initialize = function(){
		this.generateGrid();

		this.cvs.addEventListener('click', this.getClickPosition.bind(this));

		for(var y = 0; y < this.dimension.y; y++){
			this.grid[y] = [];
			for(var x = 0; x < this.dimension.x; x++){
				this.grid[y][x] = "rgba(0,0,0,0)";
			}
		}

		this.saveButton.addEventListener('click', this.saveSheet.bind(this));
		this.eraserButton .addEventListener('click', this.erase.bind(this));
	}

	this.render = function(){
		for(var y = 0; y < this.dimension.y; y++){
			for(var x = 0; x < this.dimension.x; x++){
				this.ctx.fillStyle = this.grid[y][x];
				this.ctx.fillRect(30*x,30*y,30,30);
			}
		}

		this.previewCanvas.renderFromData(this.grid);
		this.generateGrid();
	}

	this.saveSheet = function(){
		var url = this.previewCanvas.cvs.toDataURL();
		this.saveButton.download = (this.projectName || Math.random().toString(16).slice(2)) + ".png";
		this.saveButton.href = url;
	}

	this.erase = function(){
		this.state = "erase";
	}

	this.initialize();

};

var editor = new Editor(24, 8, 8);