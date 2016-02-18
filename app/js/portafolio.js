jQuery = $ = require('../components/jquery/dist/jquery');
require('../components/ResponsiveSlides/responsiveslides');
require('../components/spritely/src/jquery.spritely');

var Backbone = require('backbone'),
	PortafolioRouter = require('./routers/portafolio');
	Main = require('../js/main');
	Backbone.$ = $;

$(function(){
	Backbone.app = new PortafolioRouter();
	Main.init();
	Backbone.Portafolio = {
		animacionProgress : false,
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
		fnAnimacionProgress: function(){

			self = this;

			if(self.animacionProgress === true){
				$('.progress').destroy();
				self.animacionProgress = false;
			}
			$('.progress').sprite({
				fps: 8,
				no_of_frames: 8
			});
			self.animacionProgress = true;
		}
	};

});
