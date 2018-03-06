$( document ).ready(function() {
		/*
		 * 打开qq会话链接
		 * */
		if ( isPC() ) {
			$('#open-qq').attr('href','tencent://message/?uin=673333688&Menu=yes');
		} else {
			$('#open-qq').attr('href','mqq://im/chat?chat_type=wpa&uin=673333688')
		}

		/*
		 * 微信二维码图片查看
		 * */
		$("a#single_image").fancybox();


		/*
		 * 作品list滚动条初始化
		 * */
		if( isPC() ) {
			$('.website-item').css('height','572px')
							  .perfectScrollbar();
		}

		/*
		 * 图片展示
		 * */
		$("a#single_image").fancybox({
			opacity: true,
			autoScale: true,
			preload: 1
		});

		$("#about_scroll").fadeOut();
		$("#work_scroll").fadeOut();
		$("#contact_scroll").fadeOut();

		$("#about").click(function(){
			$("#index").fadeOut();
			$("#about_scroll").fadeIn();
			$('#about_left').addClass('animated slideInLeft');
			$('#about_right').addClass('animated slideInRight');
		});
		$("#work").click(function(){
			$("#index").fadeOut();
			$("#work_scroll").fadeIn();
			$('#work_left').addClass('animated slideInLeft');
			$('#work_right').addClass('animated slideInRight');
		});
		$("#contact").click(function(){
			$("#index").fadeOut();
			$("#contact_scroll").fadeIn();
			$('#contact_left').addClass('animated slideInLeft');
			$('#contact_right').addClass('animated slideInRight');
		});

		$(".back").click(function(){
			$(".pages").fadeOut();
			$("#index").fadeIn();
			$('#index_left').addClass('animated slideInLeft');
			$('#index_right').addClass('animated slideInRight');
		});


		// 需要渐变背景的占位
		$('.bg-placeholder').each(function () {
			var data    = gradient(),
				imgSrc  = $(this).data('src'),
				_this   = this;

			$(this).css({
				'background': '-moz-linear-gradient(left top, '+ data.startRGB +' 0%, '+ data.endRGB +' 100%)',
				'background': '-webkit-linear-gradient(left top, '+ data.startRGB +','+ data.endRGB +')',
				'background': '-ms-linear-gradient(top,  '+ data.startRGB +' 0%,'+ data.endRGB +' 100%)',
				'background': 'linear-gradient(to bottom right,  '+ data.startRGB +' 0%,'+ data.endRGB +' 100%)'
			})

			var img    = new Image();

			img.onload = function () {
				img.onload = null;
				
				$(img).appendTo($(_this))
			}
			img.src    = imgSrc;
		})

});

function isPC() {
	var userAgentInfo = navigator.userAgent,
		Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"],
	    pcFlag = true;

	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			pcFlag = false;
			break;
		}
	}

	return pcFlag;
}

// 渐变色随机初始值和结束值
function gradient() {
	var r,g,b,
		re,ge,be;

	r = Math.floor(Math.random()*255);
	g = Math.floor(Math.random()*255);
	b = Math.floor(Math.random()*255);

	var startRGB = 'rgb('+r+','+g+','+b+')';

	re = Math.abs(r-255);
	ge = Math.abs(g-255);
	be = Math.abs(b-255);

	var endRGB = 'rgb('+re+','+ge+','+be+')';

	return {
		"startRGB": startRGB,
		"endRGB": endRGB
	}
}
