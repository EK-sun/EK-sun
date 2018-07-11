$(function(){
    
    // //验证手机号
    // $('#username').focusout(function(){
    //     let username = $('#username').val().trim();
        
    //     //正则
    //     if(username.length === 0 || !(/^1[3,8]\d{9}$/g.test(username))){
    //         alert("您输入的手机号不正确");
    //         return false
    //     }
    // })
    
    // //验证密码
    // $('#password').focusout(function(){
    //     let password = $('#password').val().trim();
        
    //     //正则
    //     if(password.length === 1 || !(/^[\w\-]{6,16}$/i.test(password))){
    //         alert("您输入的密码不正确");
    //         return false;
    //     }
    // })
    
    //生成随机数
    var random = parseInt(Math.random()*9000+1000);
    $('#redomNum').val(random);
    $('.getRedomN').click(function(){
        var random = parseInt(Math.random()*9000+1000);
        $('#redomNum').val(random);
    });
    
    

    $('#btnRe').click(function(){    
                var params = {
                    username: $('#username').val(),
                    password: $('#password').val()
                    
                }
                console.log(params)
                $.ajax({
                    url: './php/register.php',
                    type: 'get',
                    data:params,
                    success: function(res){
                        console.log(res);
                        if(res == '{status: true}'){

                            window.location.href='http://localhost:86/Project/src/login.html'
                        } else {
                            alert('注册失败，用户已注册')
                        }
                    }
                })
    })
})
