var $ = mdui.$;
$("#showDialog").on('click', function(event) {
    mdui.alert({
        headline: "Title",
        description: "admin@androidide.cn",
        confirmText: "OK",
        onConfirm: function() {
            console.log("confirmed")
        }
    });
});
$(".grid>mdui-card").on('click', function(event) {
    console.log(event)
    mdui.snackbar({
        message: "Jumping...",
        action: "OK",
        onActionClick: function() {
            console.log("click action button")
        }
    });
});
$.ajax({
    method: 'GET',
    url: 'https://api.github.com/orgs/AndroidIDE-CN/repos',
    success: function(response) {
        $.each(response, function(key, value) {
            if (value.id != 562699268 && value.id != 756153568 && value.id != 843243800) {
                let str = `<mdui-card href="${value.homepage}" target="_blank" id="id_${value.id}"><div><div><img/></div><p><strong>${value.name.replace(/[-_]/g, ' ')}</strong><span>${value.description}</span></p></div></mdui-card>`;
                $('#content').append(str);
                setIcon(value.id);
            }
        });
    }
});

function setIcon(id) {
    $.ajax({
        method: 'GET',
        url: 'https://api.pro.androidide.cn/github/repositories/icon?id=' + id,
        success: function(response) {
            if (response.code == 200) {
                $(`#id_${id} img`).prop('src', response.data);
                $(`#id_${id} img`).addClass('fadInAnimation');
            }
        }
    });
}
