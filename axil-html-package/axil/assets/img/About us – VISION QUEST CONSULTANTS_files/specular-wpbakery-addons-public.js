jQuery(function($) {		

	

	$.fn.animate_on_appear = function(options_passed)
	{
			return this.each(function(){
				var self = $(this);

				self.appear( function()
				{
					var effect = $(this).data('animation');
					var delay = $(this).data('delay');
					
					$(this).delay(delay).queue( function() {
						
						$(this).removeClass('with_animation').addClass( effect );
						
					});

				});

			});
	}; 
	
	
	$.fn.chart_skill = function(options)
	{
		
		return this.each(function()
		{
			var container = $(this), elements = container.find('.chart');


			//trigger displaying of thumbnails
			container.appear(function()
			{
				elements.each(function(i)
				{
					var $chart = $(this);
			
					var color = $(this).data('color');
					var color2 = $(this).data('color2');
					loadDependencies(specular_wpb_global.FRONT_LIB_JS, ['jquery.easy-pie-chart.js'], function(){
						$chart.easyPieChart({
							lineWidth: 3, 
							size: 140,
							trackColor: color2,
							scaleColor: false,
							barColor: color,
							barColor2: color,
							animate:2000
						});
					});
					
				});
			});
		});	
	}

	$.fn.counters = function(options)
	{
		
		return this.each(function()
		{
			var container = $(this), elements = container.find('.count_to .odometer');


			//trigger displaying of thumbnails
			container.appear( function()
			{
				elements.each(function(i)
				{
					var $count = $(this);
					loadDependencies(specular_wpb_global.FRONT_LIB_JS, ['odometer.min.js'], function(){
						od = new Odometer({
							el: $count[0],
							format: '(,ddd)',
							theme: 'minimal',
							duration: $count.data('duration')
						});

						od.update($count.data('number'));
					});
											
											
											
				});
			});
		});	
			
	};

	$.fn.skills = function(options)
	{
		return this.each(function()
		{
			var container = $(this), 
				
				elements = container.find('.skill');


			//trigger displaying of thumbnails
			container.appear(function()
			{
				
				elements.each(function(i)
				{
					var element = $(this),
					percentage = $(this).data('percentage'),
					element = element.find('.prog');

					
					setTimeout(function(){ element.css('width', percentage+'%'); element.addClass('start_animation') }, (i * 250));

				});
			});
		});
			
	};


	$('.with_animation').not('#fullpage .section .with_animation').animate_on_appear();

	if($.fn.skills)
	{
		$('.block_skill').skills();
	}
		
	if($.fn.chart_skill)
	{
		$('.chart_skill').chart_skill(); 

	}	
			
	if($.fn.counters)
	{
		$('.animated_counter').counters();

	}
});

(function( $ ){
	$.fn.codelessSliderInit = function () {
		"use strict";
		
		var slider = this;
		var parent = this.parents('.codeless_slider_swiper').first();
		var slide_per_view = slider.data('slidenumber');
		var height = slider.data('height');
	
		loadDependencies(specular_wpb_global.FRONT_LIB_JS, ['swiper.min.js'], function(){
	
			if(height == 'fullscreen')
				height = $(window).height();
	
			var $loading = $('.loading', parent);
	
			if($('body').hasClass('header_7')  && $(window).width() > 970 && $('.codeless_slider_wrapper', parent).css('position') == 'fixed' ){
				var pad = $('.header_wrapper').innerWidth();
				var pos = 'left'
				if($('.pos--right').length > 0)
					pos = 'right'
				$('.codeless_slider_wrapper', parent).css('padding-'+pos, pad+'px');
				$('.codeless_slider_wrapper', parent).width( $('#slider-fullwidth').width() +'px' );
			}
	
	
	
			parent.height(height+'px');
			slider.height(height+'px');
			$('.codeless_slider_wrapper', parent).css('min-height', height+'px');
			parent.css('min-height', height+'px');
	
		/* ----uncomment this if you want a min height for slider on responsive */
		/*
			if($(window).width() < 767){
				var window_width = $(window).width();
				var new_height = (window_width * height) / 767;
				$('.codeless_slider_wrapper', parent).css('min-height', new_height+'px');
				parent.css('min-height', new_height+'px');
	
				parent.height(new_height+'px');
				slider.height(new_height+'px');
			}
			*/
	
			$('.codeless_slider').imagesLoaded(function(){
				$loading.css('display', 'none');
				var c_speed = $('.codeless_slider').data('speed');
				if(c_speed == 'undefined')
					c_speed = 800;
			
				var touch = true;
				if( $('.codeless_slider .swiper-slide').length == 1 )
					touch = false;
	
				codelessSlider = new Swiper('.codeless_slider',{ 
					slidesPerView: slide_per_view,
					paginationAsRange: false,
					loop: false,
					touchRatio: 0.7,
					autoplay: true,
					speed: c_speed,
					simulateTouch: touch,
					
					noSwiping: true,
					updateOnImagesReady:true,
					on:{
						
						/*init: function(swiper){
							console.log(codelessSlider);
							var $h1 = $(swiper.activeSlide()).find('h1');
							var $p =  $(swiper.activeSlide()).find('p');
							var $buttons =  $(swiper.activeSlide()).find('.buttons');
							var slide_color = $(swiper.activeSlide()).data('color');
							$h1.removeClass('with_animation').addClass($h1.data('animation'));
							$p.removeClass('with_animation').addClass($p.data('animation'));
							$buttons.removeClass('with_animation').addClass($buttons.data('animation'));
							if( $('.header_wrapper').hasClass('header_1'))
								$('.header_wrapper').removeClass('background--light').removeClass('background--dark').addClass('background--'+slide_color);
						},*/
						slideChangeTransitionEnd: function(swiper){
							var activeSlide = codelessSlider.slides[codelessSlider.activeIndex];
							var $h1 = $(activeSlide).find('h1');
							var $p =  $(activeSlide).find('p');
							var $buttons =  $(activeSlide).find('.buttons');
							var slide_color = $(activeSlide).data('color');
							$h1.removeClass('with_animation').addClass($h1.data('animation'));
							$p.removeClass('with_animation').addClass($p.data('animation'));
							$buttons.removeClass('with_animation').addClass($buttons.data('animation'));
	
							
							$h1 = $(activeSlide).next().find('h1');
							$p =  $(activeSlide).next().find('p');
							$buttons =  $(activeSlide).next().find('.buttons');
							$h1.addClass('with_animation').removeClass($h1.data('animation'));
							$p.addClass('with_animation').removeClass($p.data('animation'));
							$buttons.addClass('with_animation').removeClass($buttons.data('animation'));
	
							$h1 = $(activeSlide).prev().find('h1');
							$p =  $(activeSlide).prev().find('p');
							$buttons =  $(activeSlide).prev().find('.buttons');
							$h1.addClass('with_animation').removeClass($h1.data('animation'));
							$p.addClass('with_animation').removeClass($p.data('animation'));
							$buttons.addClass('with_animation').removeClass($buttons.data('animation'));
							if( $('.header_wrapper').hasClass('header_1') && !$('.header_wrapper').hasClass('open'))
								$('.header_wrapper').removeClass('background--light').removeClass('background--dark').addClass('background--'+slide_color);
						},
						slideChangeTransitionStart: function(swiper){
							var activeSlide = codelessSlider.slides[codelessSlider.activeIndex];
							var $h1 = $(activeSlide).find('h1');
							var $p =  $(activeSlide).find('p');
							var $buttons =  $(activeSlide).find('.buttons');
							var slide_color = $(activeSlide).data('color');
							$h1.addClass('with_animation').removeClass($h1.data('animation'));
							$p.addClass('with_animation').removeClass($p.data('animation'));
							$buttons.addClass('with_animation').removeClass($buttons.data('animation'));
							if( $('.header_wrapper').hasClass('header_1') && !$('.header_wrapper').hasClass('open'))
								$('.header_wrapper').removeClass('background--light').removeClass('background--dark').addClass('background--'+slide_color);
						}
					}
				});
	
				$('.nav-slider .next', parent ).on('click', function(e){ 
					e.preventDefault();
					codelessSlider.slideNext();
				});
	
				$('.nav-slider .prev', parent).on('click', function(e){
						e.preventDefault();
						codelessSlider.slidePrev();
				});
			});
	
			$.browserSelector();
	
			if(parent.hasClass('parallax_slider') && $('.container').width() > 724 && $window_width != 1024 && !$("html").hasClass("safari") ){
				loadDependencies(specular_wpb_global.FRONT_LIB_JS, ['skrollr.min.js'], function(){
					var skrollr_slider = skrollr.init({
						edgeStrategy: 'set', 
						smoothScrolling: true, 
						forceHeight: false 
					}); 
					skrollr_slider.refresh()
				});
			}
	
			if($("html").hasClass("safari")){
				$('.codeless_slider_wrapper', parent).css('-webkit-perspective', 'none').css('-webkit-transform', 'none');
			}
			
	
			if($('.swiper-slide', slider).length == 1)
				$('.nav-slider', parent).hide();
	
			$(window).resize(function(){
				if($('body').hasClass('header_7') && $(window).width() > 970 ){
					var pad = $('.header_wrapper').innerWidth();
					var pos = 'left'
					if($('.pos--right').length > 0)
						pos = 'right'
					$('.codeless_slider_wrapper', parent).css('padding-'+pos, pad+'px');
					$('.codeless_slider_wrapper', parent).width( $('#slider-fullwidth').width() +'px' );
				}else{ 
					var pos = 'left'
					if($('.pos--right').length > 0)
						pos = 'right'
					$('.codeless_slider_wrapper', parent).css('padding-'+pos, 0+'px');
					$('.codeless_slider_wrapper', parent).width( $('#slider-fullwidth').width() +'px' );
				}
	
				height = slider.data('height');
	
				if(height == 'fullscreen'){
					height = $(window).height();
					$('.codeless_slider_wrapper', parent).css('min-height', height+'px');
					parent.css('min-height', height+'px');
				}
				parent.height(height+'px');
				slider.height(height+'px');
	
				if($(window).width() < 767){
					var window_width = $(window).width();
					var new_height = (window_width * height) / 767;
					$('.codeless_slider_wrapper', parent).css('min-height', new_height+'px');
					parent.css('min-height', new_height+'px');
	
					parent.height(new_height+'px');
					slider.height(new_height+'px');
				}
	
			});  
		});
	};
})(jQuery);


(function( $ ) {
	'use strict';

	/**
	 * All of the code for your public-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */

	var $window_width = $(window).width();
	
	/*------------------------------ Lists ----------------------------- */
	
	
	$(document).ready(function () {
		/* Codeless Slider Init */
		if($('.codeless_slider').length > 0)
			$('.codeless_slider').codelessSliderInit();  
			/* Set Icon for list elements. (1 icon for all list) */

		codelessSetIconList();
		/* Fullwidth Google Map */
		codelessFullwidthMap();
		/* Styling VC section */
		codelessSectionStyle();
		/* Accordion Toggle Binding */
		accordionBinding();
		/* FAQ filter */
		codelessFaqFilter();

		/* Staff Carousel */
		codelessStaffCarousel();

		/* Portfolio Carousel */
		codelessPortfolioCarousel();

		/* Blog Latest Post */
		codelessLatestBlogCarousel();

		/* Clients Carousel Init */
		if($('.clients_caro').length > 0)
			clientsCarousel();

		/* Testimonials Carousel Init */
		if($('.testimonial_carousel').length > 0)
			testimonialsCarousel();
			
		if( $('.left_testimonial_carousel').length > 0 )
			leftTestimonialsCarousel();

		/* Testimonial Cycle */
		if($('.testimonial_cycle').length > 0)
			testimonialsCycle();	

		codelessTabsactive();
		codelessLayoutChanges();

		codelessInitParallax();

		codelessGalleryCarouselInit();
		
		if( $(".he-wrap").length > 0 ){
			loadDependencies( specular_wpb_global.FRONT_LIB_JS, ['jquery.hoverex.js'], function(){ } );
		}
	});

	

	$(window).resize(function(){
		codelessInitParallax();
		codelessLayoutChanges();
		testimonialsCycle();
		codelessPortfolioCarousel();
	});

	$(window).on( 'load', function(){
		codelessSectionStyle();
		codelessInitParallax();
	});
	

	function codelessSetIconList(){
		"use strict";
		var $ = jQuery.noConflict();
		if($('.list').length > 0){
			$('.list').each(function(){
				var icon = $(this).find('ul').data('icon');
				$('i', $(this)).each(function(){
					if( $(this).attr('class') == '' )
						$(this).addClass(icon);
				});
			});
		}
	}


	/* Parallax Init */

	function codelessInitParallax(){
		var $ = jQuery.noConflict();
		if($('.section-style.parallax_section').length || $(".header_page:not('.no_parallax')").length){
			$(".section-style.parallax_section, .header_page:not('.no_parallax')").each(function(){
				var self = $(this); 
				loadDependencies(specular_wpb_global.FRONT_LIB_JS, ['jquery.parallax.js'], function(){
					self.parallax("50%", 0.4); 
				})
			});
		}
	}


	/*------------------------------ Sections ----------------------------- */
	function codelessSectionStyle(){
		"use strict";
		$('.section-style').each(function(){
			if($(this).prev().hasClass('section-style')){
				$(this).css('margin-top', '0px');
				$(this).prev().css('margin-bottom', '0px');
			}

			if($(this).is(':last-child') && ( $(this).parent().hasClass('composer_content') || $(this).parent().hasClass('content_portfolio') )){
				$(this).parent().css('padding-bottom', '0px');
			}
			if($(this).is(':first-child') && ( $(this).parent().hasClass('composer_content') || $(this).parent().hasClass('content_portfolio') ) ){
				var style = $(this).parent().attr('style');
				if(typeof style == "undefined")
					style = ''; 
				$(this).parent().attr('style', style+'padding-top:0px !important');
			}
		});

		$('.transparency_section').each(function(){
			var height = $(this).outerHeight();
			$(this).css('margin-top', '-'+height+'px');
		});

		

		if($window_width > 979){
			$('.full-width-content.section-style ').each(function(){
				var max_height = 0;
				var full_width_section = $(this);
				full_width_section.imagesLoaded(function(){
					if($('.wpb_column:not(.wpb_column .wpb_column)', full_width_section).length > 1){ 
						$('.wpb_column:not(.wpb_column .wpb_column)', full_width_section).each(function(){
							var this_ = $(this);
							if(this_.innerHeight() > max_height)
								max_height = this_.innerHeight(); 
						});
						$('.wpb_column:not(.wpb_column .wpb_column)', full_width_section).innerHeight(max_height+'px');
					}
				});
				
				
			});
		}else{
			$('.full-width-content.section-style .wpb_column:not(.wpb_column .wpb_column)').height('auto');
		}

		$('.section-style').each(function(){
			var self = $(this);
			if(self.css('padding-bottom') == '0px'){
				var pad = $('.wpb_column', self).last().css('padding-bottom');
				if($window_width < 768){
					$('.wpb_column', self).last().css('padding-bottom', '40px');
				}else{
					$('.wpb_column', self).last().css('padding-bottom', pad);
				}
			}
		});

		$(window).resize(function(){
			$window_width = $(this).width();
			$('.full-width-content.section-style .wpb_column:not(.wpb_column .wpb_column)').height('auto');
			if($window_width > 979){
				$('.full-width-content.section-style ').each(function(){
					var max_height = 0;
					var full_width_section = $(this);
					if($('.wpb_column:not(.wpb_column .wpb_column)', full_width_section).length > 1){ 
						$('.wpb_column:not(.wpb_column .wpb_column)', full_width_section).each(function(){
							var this_ = $(this);
							if(this_.innerHeight() > max_height)
								max_height = this_.innerHeight(); 
						}); 
						$('.wpb_column:not(.wpb_column .wpb_column)', full_width_section).innerHeight(max_height+'px');
					}
					
				});
			}else{
				$('.full-width-content.section-style .wpb_column:not(.wpb_column .wpb_column)').height('auto');
			}

			$('.section-style').each(function(){
				var self = $(this);
				if(self.css('padding-bottom') == '0px'){
					var pad = $('.wpb_column', self).last().css('padding-bottom');
					
					if($window_width < 768){
						$('.wpb_column', self).last().css('padding-bottom', '40px');
					}else{
						$('.wpb_column', self).last().css('padding-bottom', pad);
					}
				}
			});

		});
	}

	/*------------------------------ Fullwidth Google MAP ----------------------------- */	

	function codelessFullwidthMap(){
		"use strict";
		var $ = jQuery.noConflict();
		if($('.googlemap.fullwidth_map').length > 0){
			$('.googlemap.fullwidth_map').each(function(){
				var $parent = $(this).parents('.row-dynamic-el').first();
				if($parent.next().hasClass('section-style'))
					$parent.css('margin-bottom', '0px');
			}); 
			$('.row-google-map').each(function(){
				if($('.fullwidth_map', $(this)).length > 0){
					var $parent = $(this).parents('.row-dynamic-el').first();
					$parent.css('margin-top', '0px');
				}
					
			});
		}
	}


	


	/*------------------------------ Accordion Toggle Binding ------------------------------ */  

	function accordionBinding(){
		"use strict";
		var $ = jQuery.noConflict();
		$(".accordion-group .accordion-toggle").on('click', function(){
			var $self = $(this).parent().parent();
			if($self.find('.accordion-heading').hasClass('in_head')){
				$self.parent().find('.accordion-heading').removeClass('in_head');
			}else{  
				$self.parent().find('.accordion-heading').removeClass('in_head');
				$self.find('.accordion-heading').addClass('in_head');
			}
		});
	}


	/*------------------------------ Blog Carousel ------------------------ */ 

	function codelessBlogCarousel(){
		"use strict";
		var $ = jQuery.noConflict();
		$(".carousel_blog").each(function(){
			var $self = $(this);
			if( $('li img', $self).size() ) {
				$('li img', $self).one("load", function(){
					loadDependencies(specular_wpb_global.FRONT_LIB_JS, ['jquery.carouFredSel-6.1.0-packed.js'], function(){
						$self.carouFredSel( {		
							circular: true,
							infinite: true,
							auto 	: false,

							scroll  : {
								items : 1
							},

							prev : {
								button : $self.parents('.latest_blog').find('.prev')
							},

							next : {
								button : $self.parents('.latest_blog').find('.next')
							}
					
						});
					});
				}).each(function() {
					if(this.complete) $(this).trigger("load");
				});
			}else{
				loadDependencies(specular_wpb_global.FRONT_LIB_JS, ['jquery.carouFredSel-6.1.0-packed.js'], function(){
					$self.carouFredSel( {		
						circular: true,
						infinite: true,
						auto 	: false,

						scroll  : {
							items : 1
						},

						prev : {
							button : $self.parents('.latest_blog').find('.prev')
						},

						next : {
							button : $self.parents('.latest_blog').find('.next')
						}
					
					});
				});
			}  	         
		});		
	}

		
	/*------------------------------ Clients Carousel ------------------------ */ 

	function clientsCarousel(){
		"use strict";
		var $ = jQuery.noConflict();
		var $self = $('.clients_caro');
		if($self.length){
			$self.css('display', 'none');
			$self.imagesLoaded(function(){
				$self.css('display', 'block');
				loadDependencies(specular_wpb_global.FRONT_LIB_JS, ['jquery.carouFredSel-6.1.0-packed.js'], function(){
					$self.carouFredSel( 
					{
								items:4,
								auto: false, 
								scroll: { items : 1 },
								prev : {
									button : $self.parents('.clients_el').first().find('.prev')
								},

								next : {
									button : $self.parents('.clients_el').first().find('.next')
								}
					});
				});
			})
		}
		
		

	}


	/*------------------------------ Testimonials Carousel ------------------------ */ 
			
	function testimonialsCarousel(){
		"use strict";
		var $ = jQuery.noConflict();
		$('.testimonial_carousel').each(function(){
			var $self = $(this);
			var c_duration = $self.data('duration');
			if(c_duration == 'undefined')
				c_duration = 500;
			loadDependencies(specular_wpb_global.FRONT_LIB_JS, ['jquery.carouFredSel-6.1.0-packed.js'], function(){
				$self.carouFredSel({
								
					auto: true,

					scroll: { items : 1, fx: 'fade', duration: c_duration },
					prev : {
						button : $self.parent('.testimonial_carousel_element').find('.prev')
					},

					next : {
						button : $self.parent('.testimonial_carousel_element').find('.next')
					}

				});
			});
		

				var max_height = 0;
				$('.item', $self).each(function(){
					if($(this).height() > max_height)
						max_height = $(this).height() + 25;
				});
				
				$('.item', $self).height(max_height+'px');

		
				

		});


	}


	function leftTestimonialsCarousel(){
		"use strict";
		var $ = jQuery.noConflict();
		$('.left_testimonial_carousel').each(function(){
			var $self = $(this);
			var c_duration = $self.data('duration');
			if(c_duration == 'undefined')
				c_duration = 500;

			loadDependencies(specular_wpb_global.FRONT_LIB_JS, ['owl.carousel.min.js'], function(){
				$self.imagesLoaded( function() {
					var owl = $self.owlCarousel({
						items: 1,
						dots: true
					});
					
				});
			});

		});


	}

	/* ---------------------------- Testimonial Cycle ----------------------------- */

	function testimonialsCycle(){
		"use strict";
		var $ = jQuery.noConflict();
		$('.testimonial_cycle').each(function(){
			var $self = $(this);
			var container_width = $self.parents('.wpb_wrapper').first().width();
			$('.item', $self).width(container_width+'px');

			loadDependencies(specular_wpb_global.FRONT_LIB_JS, ['jquery.carouFredSel-6.1.0-packed.js'], function(){
				$self.carouFredSel({
								
					auto: true,
					scroll: { items : 1, fx: 'fade' },

				});
			});

		});
	}



	/*------------------------------ FAQ Isotope filter ------------------------ */ 

	function codelessFaqFilter(){
		"use strict";
		var $ = jQuery.noConflict();
		$('nav#faq-filter li a').on( 'click', function(e){
			e.preventDefault();

			var selector = $(this).attr('data-filter');

			$('.faq .accordion-group').fadeOut();
			$('.faq .accordion-group'+selector).fadeIn();

			$(this).parents('ul').find('li').removeClass('active');
			$(this).parent().addClass('active');
		});
	}	


	/*------------------------------ Staff Carousel ------------------------------ */ 

	function codelessStaffCarousel(){
		"use strict";
		var $ = jQuery.noConflict();
		if($('.staff_slider').length > 0){
			loadDependencies(specular_wpb_global.FRONT_LIB_JS, ['swiper.min.js'], function(){
					$('.staff_slider').parents('.span_12').first().css('display', 'block');
				
					var slide_per_view = $('.staff_slider').data('slidenr');


					if ($window_width >= 979 && $window_width < 1100 ){
						slide_per_view = 3;
					}else if ($window_width >= 421 && $window_width < 768 ){ 
						slide_per_view = 2;
					}else if ($window_width <= 420){
						slide_per_view = 1;
					}else if ($window_width >= 768 && $window_width < 979 ){
						slide_per_view = 2;
					}else if($window_width > 1100){
						slide_per_view = $('.staff_slider').data('slidenr');
					} 

				
				var staff_slider = new Swiper('.staff_slider',{
					slidesPerView: slide_per_view, 
					paginationAsRange: false,
				});
				var $pag_wrapper = $('.staff_carousel').parents('.vc_row').first().prev();
				if($('.staff_carousel').length > 0){
						if($('.staff_carousel .swiper_pagination').length > 0){
							$pag_wrapper.find('.wpb_wrapper .block_title').append( '<div class="swiper_pagination nav-fillpath">' + $('.staff_carousel .swiper_pagination').html() + '</div>' );
							$('.staff_carousel .swiper_pagination').remove();
						}
						

						var height = $('.staff_carousel .single_staff').height();
						$('.staff_carousel .swiper-wrapper').css({height: height+'px'});
				}
				
				if($pag_wrapper.find('.swiper_pagination').length > 0){
					$('.swiper_pagination .next', $pag_wrapper ).on('click', function(e){
							e.preventDefault();
							staff_slider.slideNext();
					});

					$('.swiper_pagination .prev', $pag_wrapper).on('click', function(e){
							e.preventDefault();
							staff_slider.slidePrev();
					});
				}

				$(window).resize(function(){
					$window_width = $(window).width();
					if ($window_width >= 979 && $window_width < 1100 ){
						slide_per_view = 3;
					}else if ($window_width >= 421 && $window_width < 768 ){ 
						slide_per_view = 2;
					}else if ($window_width <= 420){
						slide_per_view = 1;
					}else if ($window_width >= 768 && $window_width < 979 ){
						slide_per_view = 2;
					}else if($window_width > 1100){
						slide_per_view = $('.staff_slider').data('slidenr');
					} 

					var staff_slider = new Swiper('.staff_slider',{
						slidesPerView: slide_per_view, 
						paginationAsRange: false,
					});
					var height = $('.staff_carousel .single_staff').height();
					$('.staff_carousel .swiper-wrapper').css({height: height+'px'});
				});
			});
		}
	}


	/*------------------------------ Portfolio Carousel ------------------------------ */ 

	function codelessPortfolioCarousel(){
		"use strict";
		var $ = jQuery.noConflict();
		if($('.portfolio_slider').length > 0){
			loadDependencies(specular_wpb_global.FRONT_LIB_JS, ['swiper.min.js'], function(){
				var slide_per_view = $('.portfolio_slider').data('slidenr');

				if ($(".container").css("max-width") == "940px" ){
					slide_per_view = 4;
				}else if ($(".container").css("max-width") == "420px" ){
					slide_per_view = 1;
				}else if ($(".container").css("width") == "724px" ){
					slide_per_view = 2;
				}else if ($(".container").css("max-width") == "300px" ){
					slide_per_view = 1;
				}

				
					var portfolio_slider = new Swiper('.portfolio_slider',{ 
						slidesPerView: slide_per_view, 
						paginationAsRange: false, 
					});
					var $pag_wrapper = $('.recent_portfolio').parents('.vc_row').first().prev();
					if($('.portfolio_slider').length > 0){
							$pag_wrapper.find('.wpb_wrapper .block_title').append( '<div class="swiper_pagination nav-fillpath">' + $('.recent_portfolio .swiper_pagination').html() + '</div>' );
							
							setTimeout(function(){
								$('.recent_portfolio .swiper_pagination').remove();
							}, 30)
							

							
								if( $('.recent_portfolio .portfolio-item img').size() ) {
									

									$('.recent_portfolio .portfolio-item img').one("load", function(){
										
										var height = $(this).height();
										$('.portfolio_slider .swiper-wrapper').css({height: height+'px'});  
										portfolio_slider.update();

									});
								}
						
							
							
					}
					

					$('.swiper_pagination .next', $pag_wrapper ).on('click', function(e){ 
							e.preventDefault();
							portfolio_slider.slideNext();
					});

					$('.swiper_pagination .prev', $pag_wrapper).on('click', function(e){
							e.preventDefault();
							portfolio_slider.slidePrev();
					});
				
					if($(".container").css("max-width") == "420px" ) {
							portfolio_slider.update();
							
					}
			
			});
		}
	}


	/*------------------------------ Portfolio Carousel ------------------------------ */ 

	function codelessLatestBlogCarousel(){
		"use strict";
		var $ = jQuery.noConflict();
		if($('.blog_slider').length > 0){
			loadDependencies(specular_wpb_global.FRONT_LIB_JS, ['swiper.min.js'], function(){
					var slide_per_view = $('.blog_slider').data('slidenr');

					if ($(".container").css("max-width") == "940px" ){
						slide_per_view = 4;
					}else if ($(".container").css("max-width") == "420px" ){
						slide_per_view = 1;
					}else if ($(".container").css("width") == "724px" ){
						slide_per_view = 2;
					}else if ($(".container").css("max-width") == "300px" ){
						slide_per_view = 1;
					} 
				
				var blog_slider = new Swiper('.blog_slider',{ 
					slidesPerView: slide_per_view, 
					paginationAsRange: false, 
				});
				var $pag_wrapper = $('.latest_blog').parents('.vc_row').first().prev();
				if($('.blog_slider').length > 0){
						$pag_wrapper.find('.wpb_wrapper .block_title').append( '<div class="swiper_pagination nav-fillpath">' + $('.latest_blog .swiper_pagination').html() + '</div>' );
						$('.latest_blog .swiper_pagination').remove();
				}
				

				$('.swiper_pagination .next', $pag_wrapper ).on('click', function(e){ 
						e.preventDefault();
						portfolio_slider.slideNext();
				});

				$('.swiper_pagination .prev', $pag_wrapper).on('click', function(e){
						e.preventDefault();
						portfolio_slider.slidePrev();
				});
			});
		
		}
	}

	/* ----------------------------- Tabs ------------------------------------ */

	function codelessTabsactive(){
		"use strict";
		var $ = jQuery.noConflict();
		if($('.tabbable').length > 0){
			$('.tabbable').each(function(){
				var id = $(this).find('.nav-tabs li.active a').attr('href');
				$(this).find(id).addClass('active');
			});
		}
	}


	/* ----------------------------- Layout Changes -------------------------- */

	function codelessLayoutChanges(){
		"use strict";
		var $ = jQuery.noConflict();
		var container = $('.container').width();
		$('.testimonial_carousel .item').each(function(){

			var self = $(this);
			var vc_column = self.parents('.wpb_column').first().width();
			self.innerWidth(vc_column+'px');
			self.height(self.height()+'px');
			self.parents('.caroufredsel_wrapper').first().height(self.height()+'px');
			self.parents('.testimonial_carousel').first().height(self.height()+'px');
			
		});

		$('.clients_caro .item').each(function(){
			var self = $(this);
			var vc_column = self.parents('.wpb_column').first().width();
			if(container > 420 && container <= 724)
				self.innerWidth( (vc_column/3)+'px');
			if(container > 724 && container < 940)
				self.innerWidth( (vc_column/4)+'px');
			if(container > 940) 
				self.innerWidth( (vc_column/5)+'px'); 
		});

		clientsCarousel();
	}

	/*------------------------------ Codeless Slider ------------------------------ */ 




/* ----------------------------- Codeless gallery carousel --------------- */

function codelessGalleryCarouselInit(){
	"use strict";
	var $ = jQuery.noConflict();
	var gallery = $('.codeless_gallery_carousel');
	
	var slider = gallery.find('.codeless_swiper_gallery');
	
	if(gallery.length > 0){
		loadDependencies(specular_wpb_global.FRONT_LIB_JS, ['swiper.min.js'], function(){
			var height = gallery.data('height');

			if(height == 'fullscreen')
				height = $(window).height();

			var $loading = $('.loading', gallery);

			gallery.height(height+'px');
			slider.height(height+'px');

			var centeredSlides = false;
			var slidesPerView = 'auto';
			
				if( gallery.hasClass('opacity') ){
					centeredSlides = true;
					slidesPerView = 'auto';
				}
				
				
				
					codelessSlider = new Swiper('.codeless_swiper_gallery',{ 
							slidesPerView:slidesPerView,
							//paginationAsRange: false,
							loop: true,
							touchRatio: 0.7,
							autoplay: 5000, 
							centeredSlides: centeredSlides,
							speed: 800,
							preloadImages:true,
							updateOnImagesReady:true,
							
							breakpoints:{
								767:{
									loop:true,
									slidesPerView:1,
									centeredSlides:false,
									autoHeight:true
								}
							},
							navigation: {
								nextEl: '.next',
								prevEl: '.prev',
							},
							on:{
								init:function(){
									$loading.css('display', 'none');
									slider.css('opacity', 1);
								}
							}

						});
					
					

				
				

			if($('.swiper-slide', slider).length == 1)
				$('.nav-slider', gallery).hide();

			$(window).resize(function(){

				if($('body').hasClass('header_7') && $(window).width() > 970 ){
					var pad = $('.header_wrapper').innerWidth();
					var pos = 'left'
					if($('.pos--right').length > 0)
						pos = 'right'
					$('.codeless_slider_wrapper', gallery).css('padding-'+pos, pad+'px');
					$('.codeless_slider_wrapper', gallery).width( $('#slider-fullwidth').width() +'px' );
				}else{ 
					var pos = 'left'
					if($('.pos--right').length > 0)
						pos = 'right'
					$('.codeless_slider_wrapper', gallery).css('padding-'+pos, 0+'px');
					$('.codeless_slider_wrapper', gallery).width( $('#slider-fullwidth').width() +'px' );
					
				}

			});

		});

	}
}

/* ----------------------------- End Codeless gallery carousel ----------- */



})( jQuery );
