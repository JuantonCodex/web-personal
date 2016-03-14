jQuery = $ = require('../components/jquery/dist/jquery');
require('../components/ResponsiveSlides/responsiveslides');

var Backbone = require('backbone'),
	HomeRouter = require('./routers/home');
	Main = require('../js/main');
	Backbone.$ = $;

$(function(){

	Backbone.app = new HomeRouter();
	Main.init();

	var initFx = false;
	Backbone.Home = {
		init: function(){
			this.fnSlide();
		},
		fnSlide: function(){

			$(".rslides").responsiveSlides({
				nav: false,
				pagination: true,
					pager: true
			});

		},
		fnEfectoExplosion: function(e){
			var fx = $('.sprite-explosion');
			function moverEfecto(pos){

				var left = pos.left;
				var top = pos.top;

				var incrX = 0;
				var incrY = 0;
				var contMovimiento = 1;
				var timerVibracion = setInterval(vibrar,15);
				function vibrar(){

					if(contMovimiento == 1){
						incrX = incrX + 10;
						incrY = incrY + 10;
					}else if(contMovimiento == 2){
						incrX = incrX;
						incrY = incrY - 10;
						console.log(incrY);
					}else if(contMovimiento == 3){
						incrX = incrX - 10;
						incrY = incrY;
					}else if(contMovimiento == 4){
						incrX = incrX;
						incrY = incrY + 10;
						clearInterval(timerVibracion);
					}

					var css = {
						'top':top + incrY + 'px',
						'left':left + incrX + 'px'
					}
					fx.css(css);
					contMovimiento++;
				}
			}

			// Logo al que se le dio click
			var boxCliente = e.currentTarget;

			//Coordenadas
			var posX, posY;

			if(e.offsetX === undefined){
				posX = e.originalEvent.layerX - $(e.target).position().left;
			}else{
				posX = e.offsetX;
			}

			if(e.offsetX === undefined){
				posY = e.originalEvent.layerY - $(e.target).position().top;
			}else{
				posY = e.offsetY;
			}

			// Validamos que se cree una animacion
			// sólo después de haber terminado la anterior que ya existe.
			if(initFx == false){
				initFx = true;

				$(boxCliente).prepend(fx);
				fx.css({
					'top': (posY - 68) + 'px',
					'left': posX + 'px'
				});
				fx.show(0, function(){
					setTimeout(function(){
						fx.hide();
						initFx = false;
					}, 500);
				});
			}


		}
	};
	Backbone.Home.init();
});
