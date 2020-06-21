$(function () {
    let nameReg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/
    let pwdReg = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,20}');
    $('#userName').blur(function () {
        let username = this.value;
        if (username) {
            if (!nameReg.test(username)) {
                $('#userNameTip').css({display: 'block'});
            }else{
                $('#userNameTip').css({display: 'none'});
            }
        }
    });
    $('#password').blur(function () {
        if (!pwdReg.test(this.value)) {
            $('#passwordTip').css({display: 'block'});
        }else{
            $('#passwordTip').css({display: 'none'});
        }

    });
    // 提交前校验
    $("input[type='submit']").click(function (event) {
        if(!nameReg.test($('#userName').val()) || !pwdReg.test($('#password').val())){
            alert('请录入完整并正确的信息');
            event.preventDefault();
        }
    });
});