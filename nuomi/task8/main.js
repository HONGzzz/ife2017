let menu = document.getElementsByClassName('menu')[0];
let content = document.getElementsByClassName('content');

for (let i = 0; i < content.length; i++) {
    let element = content[i];
    element.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        menu.style.display = 'block';
        let mwidth = menu.offsetWidth;
        let mheight = menu.offsetHeight;
        let clientheight = document.documentElement.clientHeight || document.body.clientHeight;
        let clientwidth = document.documentElement.clientWidth || document.body.clientWidth;
        if (e.pageY + mheight < clientheight) {
            menu.style.top = e.pageY + 'px';
        } else {
            menu.style.top = e.pageY - mheight + 'px';
        }
        if (e.pageX + mwidth < clientwidth) {
            menu.style.left = e.pageX + 'px';
        } else {
            menu.style.left = e.pageX - mwidth + 'px';
        }
    });
}
document.documentElement.addEventListener("click", function (e) { //点击其他地方菜单消失，可恢复默认的菜单事件
    menu.style.display = 'none';
})