+
function ($) {
    jQuery.extend({
        stars: function (options) {
            var defaults = {
                starlength: 5,
                stars: "☆",
                hoverstars: "★",
                inslabel: "body",
                complete: () => {}
            }
            var opts = $.extend({}, defaults, options || {}),
            starStr = '';
            starStr = `<div class="stars-box"></div>`
            $(opts.inslabel).append(starStr);
            let newstar = `<span>${opts.stars}</span>`
            for (let i = 0; i < opts.starlength; i++) {
                $(".stars-box").append(newstar)
            }
            // 效果
            $('.stars-box span').mouseenter(function () {
                $(this).text(opts.hoverstars).prevAll().text(opts.hoverstars).end().nextAll().text(opts.stars);
            });
            $('.stars-box span').mouseleave(function () {
                $('span').text(opts.stars);
                $('.active').text(opts.hoverstars).prevAll().text(opts.hoverstars).end().nextAll().text(opts.stars);
            });
            $('.stars-box span').click(function () {
                $(this).addClass('active').siblings().removeClass('active');
            });
        }
    })
}(jQuery)