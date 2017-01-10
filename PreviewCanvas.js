var PreviewCanvas = function(_x, _y){
	console.log(_x,_y);
	this.cvs = document.querySelector('.js-preview');
	this.ctx = this.cvs.getContext('2d');
	this.dimension = {x: _x, y: _y}
	this.cvs.width = _x*2;
	this.cvs.height = _y*2;
	this.ctx.scale(2,2);

	this.renderFromData = function(data){
		for(var y = 0; y < this.dimension.y; y++){
			for(var x = 0; x < this.dimension.x; x++){
				this.ctx.fillStyle = data[y][x];
				this.ctx.fillRect(x, y , 1, 1);
			}
		}
	}

}