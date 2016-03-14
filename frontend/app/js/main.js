jQuery = $ = require('../components/jquery/dist/jquery');

var Main = {
	init: function(){

		this.fnNavMenu();
	},
	fnNavMenu: function(){
		var nav = $('#nav');
		var cantBotones = nav.find('li').length;

		// Menú movil
		var menuMobile = $('#btn-menu');
		menuMobile.on('click', function(){
			nav.slideToggle();
		});

		var liW;
		var arrowW;
		var iInicial;
		var posInicial;
		var arrow = nav.children('.arrow');

		$(window).resize(function(){

			actualizandoMedidas();

			if(menuMobile.css('display') == 'none'){
				nav.show();
			}

		});

		function actualizandoMedidas(){
			arrowW = arrow.width();
			liW = nav.find('li').width();

			//Posición inicial de la flecha
			iInicial = nav.find('li').index(nav.find('.active'));
			posInicial = iInicial*liW + (liW - arrowW)/2;
			arrow.css('left',posInicial);
		}

		actualizandoMedidas();

		//Animación de la flecha
		nav.find('li').on('mouseover', function(){
			var iDestino = nav.find('li').index(this);
			var posDestino= iDestino*liW + (liW - arrowW)/2;
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
};

module.exports = Main;
