+
function ($) {
    jQuery.extend({
        rollnumber: function (options) {
            var defaults = {
                numlength: 4,
                numArr: ["60916", "641785", "280640", "5222550"],
                txtArr: ["个", "只", "条", "块"],
                secTitle: ["红色小心心", "黄色小心心", "粉色小心心", "绿色小心心"],
                inslabel: "body",
                complete: () => {}
            }
            var opts = $.extend({}, defaults, options || {}),
                numberStr = '';
            numberStr = `<ul class="number-data"></ul>`
            $(opts.inslabel).append(numberStr);
            for (let i = 0; i < opts.numArr.length; i++) {
                let thisnum = $.numFormat(opts.numArr[i]);
                let thisnumArr = thisnum.split(",");
                let number_li = `<li></li>`
                $(".number-data").append(number_li)
                for (let j = 0; j < thisnumArr.length; j++) {
                    let number_span = `<span class="count">${thisnumArr[j]}</span>,`
                    if (j == thisnumArr.length - 1) {
                        number_span = `<span class="count">${thisnumArr[j]}</span>`
                    }
                    $(".number-data li").eq(i).append(number_span);
                }
            }
            for (let p = 0; p < opts.txtArr.length; p++) {
                let txt_span = `<span>${opts.txtArr[p]}</span>`;
                let sectitle = `<p class="txt">${opts.secTitle[p]}</p>`
                $(".number-data li").eq(p).append(txt_span);
                $(".number-data li").eq(p).append(sectitle);
            }
            // 滚动效果
            var num = [];
            for (let i = 0; i < $(".number-data").find(".count").length; i++) {
                num[i] = $(".count").eq(i).text();
                if (num[i].indexOf('/script>') > 0)
                    num[i] = num[i].substring(num[i].indexOf('/script>') + 8);
            }
            $(function () {
                for (let i = 0; i < $(".number-data").find(".count").length; i++) {
                    if (parseInt(num[i]) == 0) {
                        return;
                    } else if (parseInt(num[i]) < 100) {
                        $('.count').eq(i).animationCounter({
                            start: 0,
                            end: num[i],
                            step: 1,
                            delay: 10
                        });
                    } else {
                        $('.count').eq(i).animationCounter({
                            start: 0,
                            end: num[i],
                            step: parseInt(num[i] / 80),
                            delay: 10
                        });
                    }
                }
            })
        },
        numFormat(num) {
            return parseFloat(num).toLocaleString();
        }
    })
}(jQuery)
$(function () {
    $.fn.animationCounter = function (options) {
        return this.each(function () {
            try {
                var element = $(this);
                var defaults = {
                    start: 0,
                    end: null,
                    step: 1,
                    delay: 1000,
                    txt: ""
                }
                var settings = $.extend(defaults, options || {})
                var nb_start = settings.start;
                var nb_end = settings.end;
                element.text(nb_start + settings.txt);
                var counter = function () {
                    if (nb_end != null && nb_start >= nb_end) {
                        ints = window.clearInterval(ints);
                        return;
                    }
                    if (nb_start + settings.step > nb_end) {
                        nb_start = nb_end;
                    } else {
                        nb_start = nb_start + settings.step;
                    }
                    if (nb_end.slice(0, 2) == '00') {
                        element.text('00' + nb_start + settings.txt);
                    } else if (nb_end.slice(0, 1) == '0') {
                        element.text('0' + nb_start + settings.txt);
                    } else {
                        element.text(nb_start + settings.txt);
                    }
                }
                var ints = setInterval(counter, settings.delay);
            } catch (e) {
                alert(e + ' at line ' + e.lineNumber);
            }
        });
    }
});