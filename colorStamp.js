var ColorStamp = function(){
	this.lis = [];
	this.preview = document.querySelector('div.preview');
	this.color = "#000";
	this.oldColor = "";
	this.state = "pen";


	this.initialize = function(){
		this.lis = document.querySelectorAll('ul.color li');

		for(var i = 0; i < this.lis.length; i++){
			var color = this.lis[i].dataset.color;
			this.lis[i].style.backgroundColor = "#"+color;
			this.lis[i].addEventListener('click', this.pickColor.bind(this));
		}

		this.displayColor();
	}

	this.pickColor = function(e){
		if(this.state == "pen"){
			this.color = "#" + e.currentTarget.dataset.color;
			this.displayColor();
		}
	};

	this.displayColor = function(){
		this.preview.style.backgroundColor = this.color;
	}

	this.changeToEraser = function(){
		if( this.state == "pen"){
			this.oldColor = this.color;
			this.color = "rgba(0,0,0,0)";
		}

		this.state = "erase";
	}

	this.changeToPen = function(){
		if( this.state == "erase"){
			this.color = this.oldColor;
		}
		
		this.state = "pen";
	}

	this.initialize();

};