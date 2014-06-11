jQuery = $ = require('../components/jquery/dist/jquery');
require('../components/ResponsiveSlides/responsiveslides');
require('../components/spritely/src/jquery.spritely');
require('../components/jparallax/js/jquery.parallax');

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
			this.fnBgFullScreen();
		},
		fnBgFullScreen: function(){

			var fullscreenViewport = $('.fullscreen-viewport');
			var bgFullscreen = $('.fullscreen');

			function applyParallax(){
				jQuery(bgFullscreen).parallax({yparallax: 0.5,xparallax: 0.4});
			}
			applyParallax();

			$(window).on('resize', function(){
				applyParallax();
			});
		},
		fnSlide: function(){
			
			$(".rslides").responsiveSlides({
				nav: false,
				pagination: true,
					pager: true
			});	

			//Centrado la navegación
			var slide = $('.rslides_tabs');
			var numBotones = slide.children().length;
			var anchoBoton = slide.children('li:first-child').outerWidth(true);
			
			function alinearBotones(){
				var marginLeft = (slide.width() - (anchoBoton*numBotones))/2;
				slide.children('li:first-child').css('margin-left',marginLeft+'px');
			}
			alinearBotones();
			$(window).on('resize', function(){
				alinearBotones();
			});
		},
		fnEfectoExplosion: function(e){
			var bgFullScreen = $('.fullscreen-viewport').css('display');
			if(bgFullScreen == "none"){
				return false;
			}

	
			var fx = $('.fx-explosion');
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

			

			if(initFx == false){
				
				initFx = true;
				fx.sprite({
					fps: 24,
					speed:1,
					no_of_frames: 10,
					on_first_frame: function(obj) {
						var position = $(obj).position();
						moverEfecto(position);
				    }, 
					on_last_frame: function(obj) {
				        obj.spStop(true);
				        obj.hide();
				    },
				});
			}else{
	
				fx.spStop(true);
				fx.spStart();
			}	
			fx.show();
			
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

			var boxCliente = e.currentTarget;
			$(boxCliente).prepend(fx);
			fx.css({
				'top': (posY - 68) + 'px',
				'left': posX + 'px' 
			});
		}
	};
	Backbone.Home.init();
});


