var Editor = function(_x, _y, _step, _frames, _name) {
	this.cvs = document.querySelector(".js-canvas");
	this.ctx = this.cvs.getContext('2d');
	this.dimension = {x: _x * _frames, y: _y };
	this.frameDim = {x: _x, y: _y };
	this.cvs.width = this.dimension.x * 30;
	this.cvs.height = this.dimension.y * 30;
	this.step = _step;
	this.frames = _frames;
	this.state = "none";
	this.projectName = (_name || Math.random().toString(16).slice(2)) + ".png";
	this.grid = [];
	this.animInterval = -1;

	/* Buttons */
	this.saveButton = document.querySelector(".js-save");
	this.eraserButton = document.querySelector(".js-eraser");
	this.playAnimButton = document.querySelector(".js-playAnim");
	this.previewAnim = document.querySelector(".js-previewAnim");
	this.penButton = document.querySelector(".js-pen");

	/* SubObjects */
	this.colorStamp = new ColorStamp();
	this.previewCanvas = new PreviewCanvas(this.dimension.x, this.dimension.y);


	this.generateGrid = function(){
		this.ctx.lineWdith = 1;

		for(var y = 0; y < this.dimension.y; y++){
			for(var x = 0; x < this.dimension.x; x++){
				if( Math.floor(x/this.frameDim.x) % 2 ){
					this.ctx.strokeStyle = "rgba(128, 128, 0,1)";
				}else{
					this.ctx.strokeStyle = "rgba(0,128,128,1)";
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

	this.onClick = function(e){
		this.state = "draw";
		this.getClickPosition(e);
	}

	this.onMouseMove = function(e){
		if(this.state == "draw"){
			this.getClickPosition(e);
		}
	}

	this.onMouseUp = function(){
		this.state = "none";
	}

	this.initialize = function(){
		this.generateGrid();

		this.cvs.addEventListener('mousedown', this.onClick.bind(this));
		this.cvs.addEventListener('mousemove', this.onMouseMove.bind(this));
		this.cvs.addEventListener('mouseup', this.onMouseUp.bind(this));
		this.cvs.addEventListener('mouseleave', this.onMouseUp.bind(this));

		for(var y = 0; y < this.dimension.y; y++){
			this.grid[y] = [];
			for(var x = 0; x < this.dimension.x; x++){
				this.grid[y][x] = "rgba(0,0,0,0)";
			}
		}

		this.saveButton.addEventListener('click', this.saveSheet.bind(this));
		this.eraserButton .addEventListener('click', this.erase.bind(this));
		this.penButton.addEventListener('click', this.pen.bind(this));
		this.playAnimButton.addEventListener('click', this.playAnimHandler.bind(this));
	}

	this.render = function(){
		this.ctx.clearRect(0,0,this.cvs.width, this.cvs.height);
		for(var y = 0; y < this.dimension.y; y++){
			for(var x = 0; x < this.dimension.x; x++){
				this.ctx.fillStyle = this.grid[y][x];
				this.ctx.fillRect(30*x,30*y,30,30);
			}
		}

		this.previewCanvas.renderFromData(this.grid);
		this.generateGrid();
	}

	this.playAnimHandler = function(){
		
		this.previewAnim.style.backgroundPosition = "0px 0px";
		this.previewAnim.dataset.frame = 0;

		if(this.animInterval != -1){
			clearInterval(this.animInterval);
		}
		
		this.animInterval = setInterval(this.playAnim.bind(this) , 200);
	}

	this.playAnim = function(){
		this.previewAnim.style.background = "url("+this.previewCanvas.cvs.toDataURL()+")";
		this.previewAnim.dataset.frame++;
		var posX = this.previewAnim.dataset.frame * -16;
		this.previewAnim.style.backgroundPosition = posX + "px 0px";

	}

	this.saveSheet = function(){
		var url = this.previewCanvas.cvs.toDataURL();
		this.saveButton.download = this.projectName;
		this.saveButton.href = url;
	}

	this.erase = function(){
		this.colorStamp.changeToEraser();
	}

	this.pen = function(){
		this.colorStamp.changeToPen();
	}
	this.initialize();

};