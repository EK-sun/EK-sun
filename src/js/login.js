$(function(){
    $('#loginBtn').click(function(){
            var params = {
                username: $('#username').val(), 
                password: $('#password').val()
            }
            $.ajax({
                url: './php/login.php',
                data:params,
                type: 'get',
                success: function(res){
                    console.log(res)
                    var r = window.eval('(' + res + ')');
                    if(r.status){
                        window.location.href = 'http://localhost:86/Project/src/index.html';
                    } else{
                        alert('登录失败，请先注册账号')
                    }
                }
            });
        });
})
