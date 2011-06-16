/**
 * cdAccordeon - jQuery plugin for accordion navigations
 * 
 * Examples:
 *		$("#mylist").cdAccordion();
 *		$("#mylist").cdAccordion({
 *						expandDuration:	200,
 *						collapseDuration:	800
 *					});
 *		
 * Options and default values:
 *		expandDuration:		600
 *		collapseDuration:	600
 *		indentMin:			"0px"
 *		indentMax:			"7px"
 *		indentDuration:		200
 *		indentEasing:		"linear"
 *		unindentDuration:	200
 *		unindentEasing:		"linear"
 *		activeClass:		"active"
 * 
 * @author Christian Doebler <info@christian-doebler.net>
 * @link http://www.christian-doebler.net/
 * @license http://www.gnu.org/licenses/gpl.html [GNU General Public License]
 */
(function($){

	var settings = {
		expandDuration:		600,
		collapseDuration:	600,
		indentMin:			"0px",
		indentMax:			"7px",
		indentDuration:		200,
		indentEasing:		"linear",
		unindentDuration:	200,
		unindentEasing:		"linear",
		activeClass:		"active"
	};

	var methods = {
		init : function(index, el) {
		/*
		 * open element under mouse cursor and close
		 * all elements after current element
		 */
		var elObj = $(el);

		elObj
			.children("li")
			.mouseenter(function(){
				var currentEl = this;
				var currentObj = $(this);
				var liChildren = currentObj.find("ul");
				
				if (liChildren.length) {
					currentObj
						.nextAll()
						.each(function(index, el){
							if (this != currentEl) {
								$(this)
									.children("ul:visible")
									.slideUp(settings.collapseDuration);
							}
						});

					$(this)
						.children("ul:hidden")
						.slideDown(settings.expandDuration);
				}
			});
		
		/*
		 * close all inactive items and open active item
		 * if navigation area is left
		 */
		elObj
			.mouseleave(function(){
				var meObj = $(this);
				
				meObj
					.children("li:not(." + settings.activeClass + ")")
					.each(function(index, el){
						$(el)
							.children("ul:visible")
							.slideUp(settings.collapseDuration);
					});
				
				meObj
					.children("li:." + settings.activeClass)
					.each(function(index, el){
						$(el)
							.children("ul:hidden")
							.slideDown(settings.expandDuration);
					});
			});
			
		/* init left margin for second-level link */
		elObj
			.find("li > ul > li")
			.each(function(index, el){
				$(el)
					.mouseenter(function(){
						$(this)
							.find("a:first")
							.animate(
								{
									marginLeft: settings.indentMax
								},
								settings.indentDuration,
								settings.indentEasing
							);
					})
					.mouseleave(function(){
						$(this)
							.find("a:first")
							.animate(
								{
									marginLeft: settings.indentMin
								},
								settings.unindentDuration,
								settings.unindentEasing
							);
					})
			});
		}
	};

	$.fn.cdAccordion = function(options) {
		return this.each(function() {        
			if (options) { 
				$.extend(settings, options);
			}

			var method = settings["method"];

			if ( methods[method] ) {
				return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
			} else if (typeof method === "object" || ! method) {
				return methods.init.apply(this, arguments);
			} else {
				$.error("Method " +  method + " does not exist on jQuery.cdAccordion");
			}    
		});
	};
})(jQuery);