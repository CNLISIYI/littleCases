+
function ($) {
    jQuery.extend({
        // 倒计时组件
        // $.dateCutDown({
        //     begintime: 1612430786103,   //开始ms时间戳
        //     endtime: 1652430786103      //结束ms时间戳
        //     title: '距报价结束还剩',      //倒计时标题
        //     classname: '.over-time'     //插入位置类名
        //     interval: ['天', '时', '分', '秒']        //时间间隔符（默认为天、时、分、秒）
        //     hasdays: true               //是否换算天数
        // })
        dateCutDown: function (options) {
            var defaults = {
                begintime: new Date().getTime(),
                endtime: new Date().getTime() + 3600,
                title: '距结束还剩',
                classname: '.over-time',
                interval: ['天', '时', '分', '秒'],
                hasdays: true
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
            hh = opts.hasdays ? Math.floor(msTimes / (60 * 60)) - dd * 24 : Math.floor(msTimes / (60 * 60));
            mm = opts.hasdays ? Math.floor(msTimes / 60) - dd * 24 * 60 - hh * 60 : Math.floor(msTimes / 60) - hh * 60;
            ss = opts.hasdays ? Math.floor(msTimes) - dd * 24 * 60 * 60 - hh * 60 * 60 - mm * 60 : Math.floor(msTimes) - hh * 60 * 60 - mm * 60;
            msgStr = `<div class="date-cutdown">
                        <h4>${opts.title}</h4>
                        <p><span class="dd">${dd}</span><i class="dd">${opts.interval[0]}</i>
                        <span>${hh}</span><i>${opts.interval[1]}</i>
                        <span>${mm}</span><i>${opts.interval[2]}</i>
                        <span>${ss}</span><i>${opts.interval[3]}</i></p>
                    </div>`;
            $(opts.classname).append(msgStr);
            if (!opts.hasdays) {
                $(".date-cutdown").find(".dd").hide()
            }
            timer = setInterval(() => {
                $(opts.classname).text('');
                msTimes--;
                if (msTimes < 0) {
                    clearInterval(timer);
                    $(opts.classname).text('');
                    return;
                }
                dd = Math.floor(msTimes / (60 * 60 * 24));
                hh = opts.hasdays ? Math.floor(msTimes / (60 * 60)) - dd * 24 : Math.floor(msTimes / (60 * 60));
                mm = opts.hasdays ? Math.floor(msTimes / 60) - dd * 24 * 60 - hh * 60 : Math.floor(msTimes / 60) - hh * 60;
                ss = opts.hasdays ? Math.floor(msTimes) - dd * 24 * 60 * 60 - hh * 60 * 60 - mm * 60 : Math.floor(msTimes) - hh * 60 * 60 - mm * 60;

                msgStr = `<div class="date-cutdown">
                        <h4>${opts.title}</h4>
                        <p><span class="dd">${dd}</span><i class="dd">${opts.interval[0]}</i>
                        <span>${hh}</span><i>${opts.interval[1]}</i>
                        <span>${mm}</span><i>${opts.interval[2]}</i>
                        <span>${ss}</span><i>${opts.interval[3]}</i></p>
                    </div>`;
                $(opts.classname).append(msgStr);
                if (!opts.hasdays) {
                    $(".date-cutdown").find(".dd").hide()
                }
            }, 1000);
        },
        // 购物车数量按钮组件
        // $.shopNumsBtn({
        //     max: 999,                     //数量最大值
        //     maxlength: 3,                 //数量最大值的位数，如最大值为999，maxlength为3
        //     min: 0,                       //数量最小值
        //     disinput: true,               //能否手动输入数量值
        //     classname: 'shopnums-box',    //插入位置类名
        //     defaultnum: 1,                //默认数量
        //     mintoast: '数量不能再少了',     //数量最小时的提示文案
        //     maxtoast: '数量不能再多了',     //数量最大时的提示文案
        // })
        shopNumsBtn: function (options) {
            var defaults = {
                max: 999,
                maxlength: 3,
                min: 1,
                disinput: true,
                classname: '.shopnums-box',
                defaultnum: 1,
                mintoast: '数量不能再少了',
                maxtoast: '数量不能再多了',
            }
            var opts = $.extend({}, defaults, options || {}),
                msgStr = '';
            msgStr = `<div class="shopnums-btn">
                        <button class="shopbtn-sub">-</button>
                        <input type="number" value="${opts.defaultnum}" maxlength="${opts.maxlength}" ${opts.disinput?'':'disabled'}
                            oninput="if(value.length>${opts.maxlength})value=value.slice(0,${opts.maxlength})">
                        <button class="shopbtn-add">+</button>
                    </div>`;
            $(opts.classname).append(msgStr);

            $(document).on("click", ".shopbtn-sub", function () {
                let num = $(".shopnums-btn input").val();
                if (num > opts.min) {
                    $(".shopnums-btn input").val(--num);
                } else {
                    $.toastShow({
                        text: opts.mintoast
                    })
                }
            }).on("click", ".shopbtn-add", function () {
                let num = $(".shopnums-btn input").val();
                if (num < opts.max) {
                    $(".shopnums-btn input").val(++num);
                } else {
                    $.toastShow({
                        text: opts.maxtoast
                    })
                }
            })
            // 获取数量值：$(".shopnums-btn input").val()
        },
        // 单选按钮组件
        // $.radiosBtn({
        //     num: 10,                             //单选项数量
        //     valueArr: [1,2,3,4,5,6,7,8,9,10],    //选项值，数组格式
        //     defaultkey: 0,                       //默认选中第几项
        //     classname: '.shopnums-box',           //插入位置类名
        // })
        radiosBtn: function (options) {
            var defaults = {
                num: 10, 
                valueArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
                defaultkey: 0, 
                classname: '.shopnums-box',
            }
            var opts = $.extend({}, defaults, options || {}),
                msgStr = '';
            msgStr = `<div class="shopnums-radio"></div>`;
            $(opts.classname).append(msgStr);
            for(let i = 0; i<opts.num; i++) {
                let _label = `<label class="radio-box"><input type="radio" name="shopnums" ${opts.defaultkey == i ? 'checked' : ''}><span>${opts.valueArr[i]}</span></label>`
                $(".shopnums-radio").append(_label)
            }
            // 获取选中值：$(".shopnums-radio").find("input[name='shopnums']:checked").next().text()
        },
        // 气泡弹层组件
        // $.popShow({
        //     title: '请拨打电话领取',        //弹层标题
        //     text: '400-806-1766转6001',   //显示内容
        //     width: 400,                   //气泡宽度，默认400
        // })
        popShow: function (options) {
            var tipsShow = $(".popShow-mask");
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
            if (opts.text == '') {
                $(".popShow-box").find("h4").css("margin-bottom", '0px')
            }
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
                text: '请输入正确手机号',
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

        // 表单提交提示组件
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
            var tipsShow = $(".popShow-mask");
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
                text: '稍后可以联系客服咨询详情，联系电话400-806-1766转6001',
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
            } else {
                $(".popShow-box .c-icon").hide()
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
            } else {
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