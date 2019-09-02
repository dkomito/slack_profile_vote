(function ($) {
Drupal.behaviors.slackProfileVote = {
attach: function (context, settings) {
//	Vote Mechanism
	var $slackVotes = $('.slack-votes'),
			$thumbClicks = $slackVotes.find('.thumb .wrapper'),
			$voteeID = $('#candidate-slack-id').find('input');
	$slackVotes.once(function(){
//	Click thumbnail to vote
		$thumbClicks.click(function(){
			var $click = $(this);
		//	Alert when voting for self
			if($click.parent().hasClass('same')){
				var $popup = $('#slack-no-same');				
			}
		//	Vote Alert - Animate the Thumbnail to land in the alert box.
			else if(!$click.hasClass('chosen')){
				var $popup = $('#thank-you');
						$chosen = $slackVotes.find('.thumb.chosen').removeClass('chosen');
				$voteeID.val($click.data('candidate_slack_id')).trigger('change');
				$click.parent().addClass('chosen');
				var $img = $click.find('img'),
						$clone = $img.clone(),
						$box = $popup.find('.box'),
						$boxWrapper = $box.find('> .wrapper'),
						$ph_img = $box.find('.image');
				$clone.addClass('clone').appendTo($popup).css({
					'top' : $click.position().top - $(window).scrollTop(),
					'left' : $click.position().left,
					'width' : $img.width(),
					'height' : $img.height()
				});
				$ph_img.css('visibility', 'hidden').attr('src', $img.attr('src'));
				$box.find('.name').text($click.find('.label').text() + ' (' + $click.closest('.thumb').attr('title') + ')');
				$popup.show();
				$box.css({'height': $boxWrapper.outerHeight()});
				$clone.css('border-width', '0').animate({
					'top': $ph_img.offset().top - $(window).scrollTop(),
					'left': $ph_img.offset().left,
					'width': $ph_img.width(),
					'height': $ph_img.height(),
					'border-width': '5px',
					},
					1000, 'easeInOutBack', function(){ $clone.remove(); $ph_img.css('visibility', ''); });
			}
			var $bg = $popup.find('.bg'),
					$box = $popup.find('.box'),
					$boxWrapper = $box.find('> .wrapper');
			$bg.css('opacity', 0);
			$popup.show();
			$bg.animate({'opacity': 1});
			$box.css({'max-height': 'none'});
			$box.css({'left': $(window).width(), 'height': $boxWrapper.outerHeight()});
			$box.animate({'left': 0}, 800, 'easeInOutQuart', function(){
				$box.css('left', '');
			});
		});
		
	//	Close Alert box
		$('.slack-votes .popup .box .close').click(function(){
			var $popup = $(this).closest('.popup'),
					$bg = $popup.find('.bg'),
					$box = $popup.find('.box');
			console.log($box.css('margin-left'));
			if($box.css('margin-left') == '0px'){
				$box.css('margin-left', $box.position().left);
			}
			$box.animate({'left': 0 - ($popup.width() + $box.outerWidth())}, 800, 'easeInCubic', function(){
				$bg.animate({'opacity': 0}, function(){
					$box.css('left', '');
					$box.css('margin-left', '');
					$popup.hide();	
				});
			});
		});
	});
}};
})(jQuery);