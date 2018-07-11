require(['config'],function(){
    require(['jquery'],function($){
        jQuery(function($){
            $.ajax({
                url:'./php/car.php',
                dataType:'json',
                success:function(data){
                    // console.log(data)
                    var allTotal=$('.allTotal')[0];
                    var res = data.data.map(function(item){

                        var total=0;
                        total+=(item.price*1)*(item.qty*1);

                        return`<li class="clearfix" guid="${item.guid}">
                                <div class="photo">
                                    <input type="checkbox" name="check" class="checkLi"/>
                                    <img src="${item.img}" />
                                    <a href="">${item.title}</a>
                                </div>
                                <div class="color">
                                    <a href="">${item.type}</a> 
                                </div>
                                <div class="cs_price">
                                    <p class="price">${item.price}</p>
                                    <p class="yuanPrice">${item.reference}</p>
                                </div>
                                <div class="nums">
                                    <dd>
                                        <p>
                                        <i class="decrease no-drop"></i>
                                        <input type="text" value="${item.qty}" name="count" id="shuliang" class="shuliang">
                                        <i class="increase"></i>
                                        </p>
                                    </dd>
                                </div>
                                <div class="sale">
                                    <p class="good_total">${total}</p>
                                </div>
                                <div class="caozuo">
                                    <p class="del">删除</p>
                                    <p class="gets">移入收藏夹</p>
                                </div>
                                </li>`
                    }).join('');
                    $('.goods_cs').append(res);
                    var totals=$('.sale').text();
                    var shuliang = $('#shuliang')[0];
                    var decrease = $('.decrease')[0];
                    var increase = $('.increase')[0];
                    var price = $('.price')[0];
                    var del = document.getElementsByClassName('del');
                    
                    for(var i = 0; i<del.length; i++){
                        console.log(111)
                        del[i].onclick=function(){
                            var currentli = this.parentNode.parentNode;
                             currentli.parentNode.removeChild(currentli)
                        }
                    }
                    var decrease = document.getElementsByClassName('decrease');
                    // console.log(decrease)
                    for(var j = 0; j<decrease.length; j++){

                        decrease[j].onclick=function(){
                            var current_decrease = this.nextElementSibling;
                            var good_total = this.parentNode.parentNode.parentNode.nextElementSibling;
                            current_decrease.value--;
                            good_total.innerText = price.innerText*current_decrease.value;
                            allTotal.innerText=good_total.innerText;


                            var currentli0 = this.parentNode.parentNode.parentNode.parentNode;
                            if(current_decrease.value<=0){
                                currentli0.parentNode.removeChild(currentli0);
                            }
                        }
                    }

                    var increase = document.getElementsByClassName('increase');
                    // console.log(increase)
                    for(var j = 0; j<increase.length; j++){

                        increase[j].onclick=function(){
                            var current_increase = this.previousElementSibling;
                            var good_total = this.parentNode.parentNode.parentNode.nextElementSibling;
                            // console.log(current_increase)
                            current_increase.value++;
                            good_total.innerText = price.innerText*current_increase.value;
                            allTotal.innerText=good_total.innerText;

                        }
                    }                    

                    // // 全选事件
                    var all=document.querySelector('.all');
                    var check=document.getElementsByName('check');
                    all.onclick=function(){
                        for(var i=0;i<check.length;i++){
                            check[i].checked=all.checked;
                        }
                    }
                    // 绑定每个选择框
                    for(var i=0;i<check.length;i++){
                            check[i].onclick = function(){
                                all.checked = isCheckAll();
                                
                                }
                        }
                        // 实现效果
                        function isCheckAll(){
                            // 假设全部勾选
                            var res = true;
                            for(var i=0;i<check.length;i++){
                                if(!check[i].checked){
                                    res = false;
                                    break;
                                }
                            }
                            return res;
                        }

                    // 全选事件
                    var all1=document.querySelector('.all1');
                    var check=document.getElementsByName('check');
                    all1.onclick=function(){
                        for(var i=0;i<check.length;i++){
                            check[i].checked=all1.checked;
                        }
                    }
                    // 绑定每个选择框
                    for(var i=0;i<check.length;i++){
                            check[i].onclick = function(){
                                all1.checked = isCheckAll1();
                                
                            }
                        }
                        // 实现效果
                        function isCheckAll1(){
                            // 假设全部勾选
                            var res = true;
                            for(var i=0;i<check.length;i++){
                                if(!check[i].checked){
                                    res = false;
                                    break;
                                }
                            }
                            return res;
                        }


                // 计算价格：
                function jisuan(obj){
                    var zongjia = 0;
                    var good_total = document.getElementsByClassName('good_total');
                    for(var i = 0; i < good_total.length; i++){
                            if(checkLi[i].checked){
                                
                                zongjia += parseFloat(good_total[i].innerText);
                            }
                    }           
                    allTotal.innerText = zongjia;
                }
                    var checkLi = document.getElementsByClassName('checkLi');
                    
                    for(var j = 0 ; j < checkLi.length; j ++){
                        checkLi[j].onclick=function(){
                            jisuan(this)
                        }
                    }


                    var allDel = $('.allDel');
                    var del = 'del'
                    $('.allDel').click(function(){

                        $.ajax({
                            url:'./php/car.php',
                            type:'get',
                            data:{
                                del:''
                            },
                            success:function(data){    
                                $('.box_t').remove()          
                            }
                        })
                    })

                }
            });


            // 返回顶部js+吸顶菜单JS
            var backTop=document.querySelector('.backTop');
            var nav=document.querySelector('#nav');
            var header=$('#header')[0];
        
            // 设置滚动事件
            window.onscroll=function(){
                // 声明滚动y轴
                var scrollY=window.scrollY;
                // 设置条件，当Y轴滚动>=450实现出现返回顶部图标
                if(scrollY>=500){
                    backTop.style.display='block';
                }else{
                    backTop.style.display='none';
                }
            //     // 当Y轴滚动>=200,通过类名加减实现吸顶效果
            // if(scrollY>=500){
            //     header.className='yincang header';
            //     nav.className='xiding nav';
            // }
            // else{
            //     header.className='header';
            //     nav.className='nav';
            // }
            }


            // 设置back top点击事件
            backTop.onclick=function(){
                // 设置定时器函数
                var timer=setInterval(function(){
                    // 设置一个速度
                   var speed=Math.ceil((scrollY)/5);
                   // 0:x轴:把文档向右滚动的像素数。
                    // -speed:y轴：把文档向下滚动的像素数。
                    // 返回滚动的速度变化
                   scrollBy(0,-speed);
                   if(window.scrollY<=0){
                    // 清楚计数器
                    clearInterval(timer);
                   } 
                },30)
            }


        })
    })
})