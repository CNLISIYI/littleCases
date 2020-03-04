+
function ($) {
    jQuery.extend({
        rollnumber: function (options) {
            var defaults = {
                numlength: 5,
                numArr: ["87", "57305", "555879", "4792802", "23498578"],
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
            // 滚动效果
            for (let i = 0; i < document.querySelectorAll(".count").length; i++) {
                for (let j = 0; j < 3; j++) {
                    let thisNumber = parseInt($(".number-data li").eq(i).find(".count").eq(j).text())
                    let timeFlag = 0.1;
                    if (thisNumber < 100) {
                        timeFlag = 30;
                    }
                    if (thisNumber >= 100 && thisNumber < 500) {
                        timeFlag = 5;
                    }
                    countNuber(i, j, thisNumber, timeFlag);
                }
            }

            function countNuber(p, q, lastNum, timer) {
                let m = 0;
                setInterval(() => {
                    if (m <= lastNum) {
                        $(".number-data li").eq(p).find(".count").eq(q).text(m++)
                    }
                }, timer);
            }
        },
        numFormat(num) {
            num = num.toString().split("."); // 分隔小数点
            let arr = num[0].split("").reverse(); // 转换成字符数组并且倒序排列
            let res = [];
            for (let i = 0, len = arr.length; i < len; i++) {
                if (i % 3 === 0 && i !== 0) {
                    res.push(","); // 添加分隔符
                }
                res.push(arr[i]);
            }
            res.reverse(); // 再次倒序成为正确的顺序
            if (num[1]) { // 如果有小数的话添加小数部分
                res = res.join("").concat("." + num[1]);
            } else {
                res = res.join("");
            }
            return res;
        }
    })
}(jQuery)