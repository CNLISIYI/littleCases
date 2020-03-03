/**
 * tips
 */
+
function ($) {
    jQuery.extend({
        // $.tips({
        //     info: '领取成功', // 提示内容
        //     delayTime: 2, // 默认2(s)后关闭
        //     complete: function() { // 提示关闭后，需要执行的逻辑(根据需求来定)
        //         console.log(123321)
        //     }
        // })
        tips: function (options) {
            var tipsShow = $(".lsy-tips");
            if (tipsShow && tipsShow.length > 0) { // 已存在 tips
                return;
            }
            $.overHidden();
            var defaults = {
                downToUp: false,
                info: '领取成功',
                ownClass: '',
                timeStr: (new Date().getTime()),
                delayTime: 2,
                complete: () => {}
            }
            var opts = $.extend({}, defaults, options || {}),
                tipstr = '',
                animateclass = opts.downToUp ? 'animated' : 'hide';
            tipstr += '<div class="lsy-tips" id="lsy-tips' + opts.timeStr + '">' +
                '<p class="' + opts.ownClass + ' down-to-up ' + animateclass + '">' + opts.info + '</p>' +
                '</div>';
            $('body').append(tipstr);
            if (opts.downToUp) {
                $(".down-to-up").addClass("bounceInUp");
            } else {
                $(".down-to-up").fadeIn(200);
            }
            setTimeout(function () {
                $("#lsy-tips" + opts.timeStr).remove();
                $.overAuto();
                opts.complete();
            }, opts.delayTime * 1000)
        },
        // $.loading({
        //     info: "加载中"
        // })
        loading: function (options) {
            $.overHidden();
            var defaults = {
                info: '加载中',
            }
            var opts = $.extend({}, defaults, options || {}),
                loadingStr = '';
            loadingStr = `<!-- 加载中 -->
            <div class="lsy-loading_mask">
                <div class="lsy-loading_toast flex-box-column">
                    <div class="lsy-loading m-common-icon icon_loading"></div>
                    <p class="lsy-toast">${opts.info}</p>
                </div>
            </div>`;
            $('body').append(loadingStr);
        },
        loadingRemove: function () {
            $(".lsy-loading_mask").remove();
            $.overAuto();
        },
        // $.confirm({
        //     content: "确认删除全部历史记录？",
        //     info: '', // info 为空时不显示
        //     confirmFocus: true, // 是否引导点击 “确认”，默认为 false
        //     confirmText: '确认',
        //     cancelText: '取消',
        //     confirm: () => { },
        //     cancel: () => { },
        // })
        confirm: function (options) {
            $.overHidden();
            var defaults = {
                timeStr: (new Date().getTime()),
                // img: 'https://static.jiaoyubao.cn/images/xcx/gj-ff-tc.svg', // 头部显示图片
                // showClose: false, // 显示关闭按钮
                content: "请确认操作是否进行？",
                info: '开启服务将用于吧啦吧啦',
                confirmFocus: false, // 是否侧重点击 “确认”，默认为 false
                confirmText: '确认',
                cancelText: '取消',
                confirm: () => {},
                cancel: () => {},
            }
            var opts = $.extend({}, defaults, options || {}),
                confirmStr = '';
            confirmStr = `<!-- 删除历史搜索 弹窗 -->
                <div class="m-confirm-mask">
                    <div class="m-confirm-form">
                        <div class="m-confirm-content">${opts.content}<p class="m-confirm-info">${opts.info}</p></div>
                        <div class="m-confirm-btns flex-box">
                            <a class="flex-1 m-btns-cancel" id="cancel-${opts.timeStr}" href="javascript:;" title="" ${opts.confirmFocus ? 'style="font-weight: normal;"' : ''}>${opts.cancelText}</a>
                            <a class="flex-1 m-btns-confirm" id="confirm-${opts.timeStr}" href="javascript:;" title="" ${opts.confirmFocus ? 'style="font-weight: 600;"' : ''}>${opts.confirmText}</a>
                        </div>
                    </div>
                </div>`;
            $('body').append(confirmStr);
            // 事件
            $(document).on("click", "#cancel-" + opts.timeStr, function () { // 取消
                console.log("$--取消")
                if (opts.cancel()) {
                    $.confirmRemove();
                }
            }).on("click", "#confirm-" + opts.timeStr, function () { // 确认
                console.log("$--确认")
                if (opts.confirm()) {
                    $.confirmRemove();
                }
            })
        },
        confirmRemove: function () {
            $(".m-confirm-mask").remove();
            $.overAuto();
        },
        // $.msg({
        //     title: '', // title 为空时根据 type ，显示"操作成功"/"操作失败"
        //     type: "success", // success or error
        //     info : '', // info 为空时不显示
        //     confirmText: '确定',
        //     confirm: () => { },
        // })
        msg: function (options) {
            $.overHidden();
            var defaults = {
                title: '',
                type: "success",
                info: "",
                confirmText: '确定',
                confirm: () => {},
            }
            var opts = $.extend({}, defaults, options || {}),
                msgStr = '';
            msgStr = `<div class="lsy-fixed-mask lsy-msg-pop" style="background: rgba(0,0,0,0.60); z-index: 9999;"></div>
                    <div class="lsy-fixed-msg apply-success" style="display: block; z-index: 10000;">
                        <div class="suc-logo ${opts.type == 'success' ? '' : 'error-logo'}">
                            <i class="icon-check-block ${opts.type == 'success' ? '' : 'icon-cross-block'}"></i>
                        </div>
                        <h2>${opts.title ? opts.title : opts.type == 'success' ? '操作成功' : '操作失败'}</h2>
                        <p class="${opts.info == '' ? '' : 'fixed-msg-info'}">${opts.info}</p>
                        <div class="fixed-msg-btn ${opts.type == 'success' ? '' : 'error-btn'}  lsy-msg-pop">
                            <a href="javascript:;">${opts.confirmText}</a>
                        </div>
                    </div>`;
            $('body').append(msgStr);
            // 事件
            $(document).on("click", ".lsy-msg-pop", function () { // 取消
                opts.confirm();
                console.log("$--取消")
                $.msgRemove();
            })
        },
        msgRemove: function () {
            $(".lsy-msg-pop, .lsy-fixed-msg").remove();
            $.overAuto();
        },
        overHidden: function () {
            $("body, html, .m-common-main").addClass("m-over-hidden");
        },
        overAuto: function () {
            $("body, html, .m-common-main").removeClass("m-over-hidden");
        },
    });
}(jQuery);