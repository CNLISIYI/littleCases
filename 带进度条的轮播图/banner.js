+
function ($) {
    jQuery.extend({
        bannercicle: function (options) {
            var defaults = {
                imgpath: ["img/jd1.jpg", "img/jd2.jpg", "img/jd3.jpg", "img/jd4.jpg"],
                hrefpath: ["javascript:;", "javascript:;", "javascript:;", "javascript:;"],
                imglength: 4,
                leftcir: "img/left-page.png",
                rightcir: "img/right-page.png",
                circle_name: "page",
                circle_hovername: "page-hover",
                fadeintime: 1000,
                changetime: 4000,
                complete: () => {}
            }
            var opts = $.extend({}, defaults, options || {}),
                cicleStr = '';
            cicleStr = `<div class="container">
                                    <ul class="banner-img">
                                    </ul>
                                    <div class="banner-circle">
                                        <div class="outer arrow-left">
                                            <div class="circle-button">
                                                <div class="wrapper wrapper-l">
                                                    <div class="circleProgress left-circle"></div>
                                                </div>
                                                <div class="wrapper wrapper-r">
                                                    <div class="circleProgress right-circle"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <img src="${opts.leftcir}" alt="" class="arrow-left">
                                        <span class="arrow-mid">1/${opts.imglength}</span>
                                        <img src="${opts.rightcir}" alt="" class="arrow-right">
                                    </div>
                                </div>`
            $('body').append(cicleStr);
            for (let i = 0; i < opts.imglength; i++) {
                let banner_img =
                    `<li><a href="${opts.hrefpath[i]}"><img src="${opts.imgpath[i]}" alt=""></a></li>`
                $(".banner-img").append(banner_img)
            }
            // banner图
            var index = 0;
            var timer;
            $(document).on("mouseenter", ".banner-circle img", function () { // 鼠标悬停时有一个白色透明背景的效果，这里用新的图片替换
                let newSrc = $(this).attr("src").replace(opts.circle_name, opts.circle_hovername);
                $(this).attr("src", newSrc);
            }).on("mouseleave", ".banner-circle img", function () {
                let newSrc = $(this).attr("src").replace(opts.circle_hovername, opts.circle_name);
                $(this).attr("src", newSrc);
            }).on("mouseenter", ".outer", function () {
                let newSrc = $(this).next().attr("src").replace(opts.circle_name, opts.circle_hovername);
                $(this).next().attr("src", newSrc);
            }).on("mouseleave", ".outer", function () {
                let newSrc = $(this).next().attr("src").replace(opts.circle_hovername, opts.circle_name);
                $(this).next().attr("src", newSrc);
            }).on("click", ".arrow-right", function () { // 点击向右切换按钮
                bannerToRight();
                resetCircleLoading(); // 每次切换后让loading进度从头开始
            }).on("click", ".arrow-left", function () { // 点击向左切换按钮
                bannerToLeft();
                resetCircleLoading();
            })
            bannerTimeOut();
            // 向前切换
            function bannerToLeft() {
                index--;
                if (index < 0) {
                    index = $(".banner-img li").length - 1;
                }
                $(".banner-img li").eq(index).fadeIn(opts.fadeintime).siblings().fadeOut(opts.fadeintime);
                $(".arrow-mid").text(`${index+1}/${$(".banner-img li").length}`) // 修改按钮中间数字
                clearInterval(timer); // 每次切换时清除之前的定时器
            }
            // 向后切换
            function bannerToRight() {
                index++;
                if (index >= $('.banner-img li').length) {
                    index = 0;
                }
                $(".banner-img li").eq(index).fadeIn(opts.fadeintime).siblings().fadeOut(opts.fadeintime);
                $(".arrow-mid").text(`${index+1}/${$(".banner-img li").length}`);
                clearInterval(timer);
            }
            // 切换按钮loading效果
            function bannerTimeOut() {
                if (timer) {
                    clearInterval(timer);
                }
                $(".circle-button").find(".circleProgress").addClass("load-animation")
                timer = setInterval(() => {
                    $(".circle-button").find(".circleProgress").removeClass("load-animation")
                    bannerToRight() // 定时器时间到了后自动切换到下一张
                    bannerTimeOut() // 切换完成后再次调用loading定时器(即函数自己)
                }, opts.changetime);
            }
            // 重置loading效果
            function resetCircleLoading() {
                $(".circle-button").find(".circleProgress").removeClass("load-animation")
                setTimeout(() => {
                    bannerTimeOut()
                }, 10);
            }
        }
    })
}(jQuery)