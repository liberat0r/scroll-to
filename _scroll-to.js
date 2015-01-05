/**
 * Scroll to
 *
 * Scrolls to a specific place (vertical only)
 *
 * [data-scroll-to-this="onload"] scroll to an
 * element on page load
 *
 * [data-scroll-to-this="onclick"] scroll to an
 * element when an other element is clicked.
 * [data-scroll-to-this-target] is the element to
 * be clicked
 *
 * [data-scroll-to-this="onhash"] scroll to this
 * element when a specific hash is requested
 * [data-scroll-to-this-hash] is the hash
 *
 * Optionally use the attribute [data-scroll-to-offset]
 * to calibrate the scrolling
 */

if (typeof globals === 'undefined') {
	var globals = {};
}

if (typeof globals.$header === 'undefined') {
	globals.$header = $(".js-header");
}

if (typeof globals.$body_html === 'undefined') {
	globals.$body_html = $("body, html");
}

if (typeof globals.animateScrollTo === 'undefined') {
	globals.animateScrollTo = function(scrollLocation) {
		globals.$body_html.stop().animate({
			scrollTop: scrollLocation
		}, 1000);
	};
}

(function() {
	"use strict";

	function ScrollTo() {

		var self = this;

		self.$scrollToThis = $("[data-scroll-to-this]");

		// init
		self.start = function() {

			if (self.$scrollToThis.length > 0) {

				var scrollToThisId = 0;
				self.$scrollToThis.each(function() {
					//$(this).attr('data-scroll-to-this')

					switch ($(this).attr('data-scroll-to-this')) {
						case 'onhash':
							if (window.location.hash !== '' &&
								$(this).attr('data-scroll-to-this-hash') == window.location.hash.slice(1, window.location.hash.length)) {
								self.scrollToElement($(this));
							}
							break;
						case 'onclick':
							var $clickTarget = $($(this).attr('data-scroll-to-this-target'));

							if ($clickTarget.length > 0) {
								$(this).attr('data-scroll-to-this-id', scrollToThisId);
								$clickTarget.attr('data-scroll-to-this-click-id', scrollToThisId);
							}
							break;
						case 'onload':
							self.scrollToElement($(this));
							break;
						default:
						// do nothing
					}

					scrollToThisId++;
				});
			}

			self.$scrollToThisClick = $("[data-scroll-to-this-click-id]");

			if (self.$scrollToThisClick.length > 0) {

				self.$scrollToThisClick.click(function() {
					var scrollToThisId = $(this).attr("data-scroll-to-this-click-id");

					self.scrollToElement($("[data-scroll-to-this-id='" + scrollToThisId + "']"));
				});
			}
		};

		// Scroll to a juery element $element
		self.scrollToElement = function($element) {
			var scrollElementOffset = parseInt((typeof $element.attr('data-scroll-to-offset') !== 'undefined' &&
			parseInt($element.attr('data-scroll-to-offset')) == $element.attr('data-scroll-to-offset') ) ?
				$element.attr('data-scroll-to-offset') : 0);
			globals.animateScrollTo($element.offset().top + scrollElementOffset - globals.$header.height())
		};

	}

	var _ScrollTo = new ScrollTo();

	$(function() {
		_ScrollTo.start();
	});

})();