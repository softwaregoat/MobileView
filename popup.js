$(document).ready(function () {
    let currentUrl;
    chrome.tabs.getSelected(null,function(tab) {
        currentUrl = tab.url;
    });
    let flag = "";
    $('input[type="checkbox"]').change(function (e) {
        if (!CheckUrl(currentUrl)) return;
        let id = $(this).data('id');
        if (flag == "" )
            flag = id;
        if (flag == id) {
            console.log(flag);
            $('input[type="checkbox"]').each(function(index, em){
                if (id != $(em).data('id')) $(this).bootstrapToggle('off');
            });
            flag = "";
        }
        let css = 'css/' + id + '.css';
        if($(this).prop('checked')){
            chrome.tabs.insertCSS({
                file: css
            });
        }
        else{
            chrome.tabs.removeCSS({
                file: css
            });
        }
    });
})
function CheckUrl(url){
    if (url.indexOf('.clickfunnels.com/pages/') > -1) return true;
    alert("It's not clickfunnels edit page. You can use only on clickfunnels edit page!");
    return false;
}
