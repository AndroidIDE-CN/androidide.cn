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
            if (!FILTE_LIST.includes(value.id)) {
                let _element = `<mdui-card href="${value.homepage}" target="_blank" id="id_${value.id}"><div><div><img/></div><p><strong>${value.name.replace(/[-_]/g, ' ')}</strong><span>${value.description}</span></p></div></mdui-card>`;
                $('#content').append(_element);
                setIcon(value.id);
            }
        });
        getConfigWeb();
    }
});

function getConfigWeb() {
    $.each(WEB_LIST, function(key, value) {
        let _element = `<mdui-card href="${value.url}" target="_blank"><div><div><img class="fadInAnimation" src="${value.icon}"/></div><p><strong>${value.name}</strong><span>${value.desc}</span></p></div></mdui-card>`;
        $('#content').append(_element);
    });
}

function setIcon(id) {
    $.ajax({
        method: 'GET',
        url: 'https://api.androidide.cn/github/repositories/icon?id=' + id,
        success: function(response) {
            if (response.code == 200) {
                $(`#id_${id} img`).prop('src', response.data);
                $(`#id_${id} img`).addClass('fadInAnimation');
            }
        }
    });
}
