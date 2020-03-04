$.stars({
    starlength: 5,  //星星个数
    stars: "☆",  //选择前 空心
    hoverstars: "★",  //选择后 实心
    inslabel: "body",  //组件插入位置。(类名格式为“.leiming”，id格式为“#id”)
    complete: () => {}
})

引入star.js后通过$.stars({})调用本组件，以上为默认值，效果图可在img中查看。