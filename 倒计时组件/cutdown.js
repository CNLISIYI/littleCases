
/*
* 倒计时组件
*/ 
+
function ($) {
    jQuery.extend({
        // $.dateCutDown({
        //     begintime: 1612430786103,   //开始ms时间戳
        //     endtime: 1652430786103      //结束ms时间戳
        // })
        dateCutDown: function (options) {
            var defaults = {
                begintime: new Date().getTime(),
                endtime: new Date().getTime()+3600,
            }
            var opts = $.extend({}, defaults, options || {}),
                msgStr = '';
            let msTimes = opts.endtime - opts.begintime;
            let dd=0,hh=0,mm=0,ss=0;
            if (msTimes <= 0) {
				return;
            }
            dd = Math.floor(msTimes / (60 * 60 * 24));
			hh = Math.floor(msTimes / (60 * 60)) - dd * 24;
			mm = Math.floor(msTimes / 60) - dd * 24 * 60 - hh * 60;
			ss = Math.floor(msTimes) - dd * 24 * 60 * 60 - hh * 60 * 60 - mm * 60;
            msgStr = `<p>距报价结束还剩</p><span>${dd}天${hh}时${mm}分${ss}秒</span>`;
            $('.over-time').append(msgStr);
            
            timer = setInterval(() => {
                $('.over-time').text('');
				msTimes--;
				if (msTimes < 0) {
                    clearInterval(timer);
                    $('.over-time').text('');
					return;
				}
                dd = Math.floor(msTimes / (60 * 60 * 24));
				hh = Math.floor(msTimes / (60 * 60)) - dd * 24;
				mm = Math.floor(msTimes / 60) - dd * 24 * 60 - hh * 60;
                ss = Math.floor(msTimes) - dd * 24 * 60 * 60 - hh * 60 * 60 - mm * 60;
                
                msgStr = `<p>距报价结束还剩</p><span>${dd}天${hh}时${mm}分${ss}秒</span>`;
                $('.over-time').append(msgStr);
            }, 1000);
        },
    });
}(jQuery);