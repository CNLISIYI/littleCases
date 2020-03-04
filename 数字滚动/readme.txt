$.rollnumber({
    numlength: 4,  //数字个数
    numArr: ["87", "57305", "555879", "4792802", "23498578"],  //所有数字
    inslabel: "body",  //组件插入位置。(类名格式为“.leiming”，id格式为“#id”)
    complete: () => {}
})

引入number.js后通过$.rollnumber({})调用本组件，以上为默认值，效果图可在img中查看。