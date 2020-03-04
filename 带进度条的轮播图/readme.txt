$.bannercicle({
    imgpath: ["img/jd1.jpg", "img/jd2.jpg", "img/jd3.jpg", "img/jd4.jpg"],  //轮播图片路径
    hrefpath: ["javascript:;", "javascript:;", "javascript:;", "javascript:;"],  //轮播图片链接
    imglength: 4,  //轮播图数量
    leftcir: "img/left-page.png",  //左边按钮路径
    rightcir: "img/right-page.png",  //右边按钮路径
    circle_name: "page",  //按钮图片名称
    circle_hovername: "page-hover",  //按钮悬停图片名称
    fadeintime: 1000,  //淡入淡出时间
    changetime: 4000,  //轮播自动切换时间
    inslabel: "body",  //插入位置的类名、id。(类名格式为".leiming"，id格式为"#id")
    complete: () => {}
})

引入banner.js后通过$.bannercicle({})调用本组件，以上为默认值，效果图可在img中查看。