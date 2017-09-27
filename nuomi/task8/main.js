let menu = document.getElementsByClassName('menu')[0];
let content = document.getElementsByClassName('content');

document.querySelector('body').oncontextmenu = (e) => {
    return false;
}

for (let i = 0; i < content.length; i++) {
    let element = content[i];
    element.addEventListener('contextmenu', function (e) {
        menu.style.display = 'block';
        let mwidth = menu.offsetWidth;
        let mheight = menu.offsetHeight;
        let clientheight = document.documentElement.clientHeight || document.body.clientHeight;
        let clientwidth = document.documentElement.clientWidth || document.body.clientWidth;
        if (e.clientY + mheight < clientheight) {
            menu.style.top = e.clientY + window.pageYOffset + 'px';
        } else {
            menu.style.top = e.clientY - mheight + window.pageYOffset + 'px';
        }
        if (e.clientX + mwidth < clientwidth) {
            menu.style.left = e.clientX + window.pageXOffset + 'px';
        } else {
            menu.style.left = e.clientX + window.pageXOffset - mwidth + 'px';
        }
    });
}
document.documentElement.addEventListener("click", function (e) { //点击其他地方菜单消失，可恢复默认的菜单事件
    menu.style.display = 'none';
})