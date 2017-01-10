var ColorStamp = function(){
	this.lis = [];
	this.preview = document.querySelector('div.preview');
	this.color = "#000";

	this.initialize = function(){
		this.lis = document.querySelectorAll('ul.color li');

		for(var i = 0; i < this.lis.length; i++){
			var color = this.lis[i].dataset.color;
			this.lis[i].style.backgroundColor = "#"+color;
			this.lis[i].addEventListener('click', this.pickColor.bind(this));
		}
	}

	this.pickColor = function(e){
		this.color = "#" + e.currentTarget.dataset.color;
		this.displayColor();
	};

	this.displayColor = function(){
		this.preview.style.backgroundColor = this.color;
	}

	this.initialize();

};