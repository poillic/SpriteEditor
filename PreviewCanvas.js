var PreviewCanvas = function(_x, _y){
	console.log(_x,_y);
	this.cvs = document.querySelector('.js-preview');
	this.ctx = this.cvs.getContext('2d');
	this.dimension = {x: _x, y: _y}
	this.cvs.width = _x;
	this.cvs.height = _y;
	this.ctx.scale(1,1);

	this.renderFromData = function(data){
		this.ctx.clearRect(0,0,this.cvs.width, this.cvs.height);
		for(var y = 0; y < this.dimension.y; y++){
			for(var x = 0; x < this.dimension.x; x++){
				this.ctx.fillStyle = data[y][x];
				this.ctx.fillRect(x, y , 1, 1);
			}
		}
	}

}