+
function ($) {
    jQuery.extend({
        // 倒计时组件
        // $.dateCutDown({
        //     begintime: 1612430786103,   //开始ms时间戳
        //     endtime: 1652430786103      //结束ms时间戳
        //     title: '距报价结束还剩',      //倒计时标题
        //     classname: '.over-time'     //插入位置类名
        // })
        dateCutDown: function (options) {
            var defaults = {
                begintime: new Date().getTime(),
                endtime: new Date().getTime() + 3600,
                title: '距结束还剩',
                classname: '.over-time'
            }
            var opts = $.extend({}, defaults, options || {}),
                msgStr = '';
            let msTimes = opts.endtime - opts.begintime;
            let dd = 0,
                hh = 0,
                mm = 0,
                ss = 0;
            if (msTimes <= 0) {
                return;
            }
            dd = Math.floor(msTimes / (60 * 60 * 24));
            hh = Math.floor(msTimes / (60 * 60)) - dd * 24;
            mm = Math.floor(msTimes / 60) - dd * 24 * 60 - hh * 60;
            ss = Math.floor(msTimes) - dd * 24 * 60 * 60 - hh * 60 * 60 - mm * 60;
            msgStr = `<div class="date-cutdown"><p>${opts.title}</p><span>${dd}天${hh}时${mm}分${ss}秒</span></div>`;
            $(opts.classname).append(msgStr);

            timer = setInterval(() => {
                $(opts.classname).text('');
                msTimes--;
                if (msTimes < 0) {
                    clearInterval(timer);
                    $(opts.classname).text('');
                    return;
                }
                dd = Math.floor(msTimes / (60 * 60 * 24));
                hh = Math.floor(msTimes / (60 * 60)) - dd * 24;
                mm = Math.floor(msTimes / 60) - dd * 24 * 60 - hh * 60;
                ss = Math.floor(msTimes) - dd * 24 * 60 * 60 - hh * 60 * 60 - mm * 60;

                msgStr = `<div class="date-cutdown"><p>${opts.title}</p><span>${dd}天${hh}时${mm}分${ss}秒</span></div>`;
                $(opts.classname).append(msgStr);
            }, 1000);
        },

        // 气泡弹层组件
        // $.popShow({
        //     title: '请拨打电话领取',        //弹层标题
        //     text: '400-806-1766转6001',   //显示内容
        //     width: 400,                   //气泡宽度，默认400
        // })
        popShow: function (options) {
            var tipsShow = $(".error-alert");
            if (tipsShow && tipsShow.length > 0) { // 已存在
                return;
            }
            var defaults = {
                title: '请拨打电话领取',
                text: '400-806-1766转6001',
                width: 400,
            }
            var opts = $.extend({}, defaults, options || {}),
                msgStr = '';
            msgStr = `<div class="popShow-mask mask">
                        <div class="popShow-box">
                            <i class="iconfont close">&#xe614;</i>
                            <h4 class="fs20 mb40">${opts.title}</h4>
                            <p class="fs18">${opts.text}</p>
                        </div>
                    </div>`;
            $('body').append(msgStr);
            $(".popShow-box").css("width", `${opts.width}px`)
            $(document).on("click", ".popShow-box i", function () {
                $(".popShow-mask").hide()
            })
        },

        // 气泡提示组件
        // $.toastShow({
        //     text:'请输入正确手机号',        //气泡提示内容
        //     hidetime: 3000,              //气泡自动隐藏时间，默认3s
        //     type: 'success'              //气泡类型：默认灰色为空，红色为fail，绿色为success
        // })
        toastShow: function (options) {
            var tipsShow = $(".ctrl-error");
            if (tipsShow && tipsShow.length > 0) { // 已存在
                return;
            }
            $.overHidden();
            var defaults = {
                text: '',
                hidetime: 3000,
                type: ''
            }
            var opts = $.extend({}, defaults, options || {}),
                msgStr = '';
            msgStr = `<div class="ctrl-error">${opts.text}</div>`;
            $('body').append(msgStr);
            if (opts.type == 'fail') {
                $(".ctrl-error").addClass("ctrl-err-fail")
            }
            if (opts.type == 'success') {
                $(".ctrl-error").addClass("ctrl-err-success")
            }
            var timer;
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                $.msgRemove();
            }, opts.hidetime);
        },

        // 表单提交组件
        // $.formTipsShow({
        //     title:'提交成功',             //提示标题
        //     text:'稍后联系客服',           //其他提示文字
        //     hasicon: true,              //是否显示中间图标
        //     icon: 'success',            //图标类型：成功为success，失败为fail
        //     autoclose: false,            //是否自动隐藏
        //     hidetime: 3000,             //弹窗自动隐藏时间
        //     reload: false                //弹窗关闭后是否刷新页面
        //     width: 400,                 //弹层宽度，默认300
        // })
        formTipsShow: function (options) {
            var tipsShow = $(".error-alert");
            if (tipsShow && tipsShow.length > 0) { // 已存在
                return;
            }
            $.overHidden();
            var defaults = {
                title: '提交成功',
                hasicon: true,
                icon: 'success',
                autoclose: false,
                hidetime: 3000,
                text: '稍后联系客服稍后联系客服稍后联系客服稍后联系客服',
                reload: false,
                width: 300
            }
            var opts = $.extend({}, defaults, options || {}),
                msgStr = '';
            msgStr = `<div class="mask popShow-mask">
                        <div class="popShow-box">
                            <i class="iconfont close">&#xe614;</i>
                            <i class="iconfont c-icon success">&#xe6a1;</i>
                            <i class="iconfont c-icon fail">&#xe661;</i>
                            <h4 class="tip-title mb20">${opts.title}</h4>
                            <p class="tip-text">${opts.text}</p>
                        </div>
                    </div>`;
            $('body').append(msgStr);
            $(".popShow-box").css("width", `${opts.width}px`);
            if (opts.hasicon) {
                opts.icon == 'success' ? $(".popShow-box .success").show().next().hide() : $(".popShow-box .success").hide().next().show();
            }
            if (opts.autoclose) {
                $(".popShow-box .close").hide();
                var timer;
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    $.msgRemove();
                    if (opts.reload) {
                        location.reload();
                    }
                }, opts.hidetime);
            }
            else {
                $(".popShow-box .close").show();
                $(document).on("click", ".popShow-box i", function () {
                    $(".popShow-mask").hide();
                    if (opts.reload) {
                        location.reload();
                    }
                })
            }
        },

        msgRemove: function () {
            $(".ctrl-error, .popShow-mask").remove();
            $.overAuto();
        },

        overHidden: function () {
            $("body, html").addClass("over-hidden");
        },
        
        overAuto: function () {
            $("body, html").removeClass("over-hidden");
        },
    });
}(jQuery);