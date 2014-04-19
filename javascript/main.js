//@prepros-prepend vendor/preloadjs-0.4.1.min.js
//@prepros-prepend vendor/jquery.min.js
//@prepros-prepend vendor/modernizr.min.js  

var MAIN;
$(function(){
	MAIN = {
		init: function(){
			this.fnNavMenu();
		},
		fnNavMenu: function(){
			var nav = $('#nav');
			var cantBotones = nav.find('li').length;

			var liW = nav.find('li').width();

			var arrow = nav.children('.arrow');
			var arrorW = arrow.width();

			//Posición inicial de la flecha
			var iInicial = nav.find('li').index(nav.find('.active'));
			var posInicial = iInicial*liW + (liW - arrorW)/2;
			arrow.css('left',posInicial);

			//Animación de la flecha
			nav.find('li').on('mouseover', function(){
				var iDestino = nav.find('li').index(this);
				var posDestino= iDestino*liW + (liW - arrorW)/2;
				arrow.stop().animate({
					left: posDestino
				}, 600);
			});

			nav.find('li').on('mouseout', function(){
				arrow.stop().animate({
					left: posInicial
				}, 600);
			});
		}
	}
	

	MAIN.init();
});