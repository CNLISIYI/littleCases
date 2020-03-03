// $.tips
// 支持多行
$.tips({
    info: '领取成功', // 提示内容
    delayTime: 2, // 默认2(s)后关闭
    complete: function() { // 提示关闭后，需要执行的逻辑(根据需求来定)
        console.log(123321)
    }
})

// $.loading
$.loading({
    info: "加载中"
})
$.loadingRemove(); // loading close

// $.confirm
$.confirm({
    content: "确认删除全部历史记录？",
    info: '', // info 为空时不显示
    confirmFocus: true, // 是否引导点击 “确认”，默认为 false
    confirmText: '确认',
    cancelText: '取消',
    confirm: () => { },
    cancel: () => { },
})
$.confirmRemove(); // confirm close

// $.msg
$.msg({
    title: '', // title 为空时根据 type ，显示"操作成功"/"操作失败"
    type: "success", // success or error
    info : '', // info 为空时不显示
    confirmText: '确定',
    confirm: () => { },
})
$.msgRemove(); // msg close

