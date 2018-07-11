// require(['config'],function(){
//     require(['jquery','http'],function($,http){



//     })
// })

$(function(){
    // console.log(params)
    var num = 60;
    var page
    var params = {page:0,_num:num}
    $.ajax({
            url:'./php/list.php',
            data:params,
            success: function(res){
                    
                    var data = window.eval('('+res+')');
                    var data1 = data.data.data1;
                    // console.log(data1)
                    // console.log(data);
                    generateGoods(data1);
                    
                    var data2 = data.data.data2;
                    data2= data2[0];
                    // data2.map(function(item){
                    //     // console.log(item)
                        for(var key in data2){
                            var all=data2[key]
                            console.log(all)
                        };
                    // })
                            var pages = Math.ceil(all/60);
                            console.log(pages);

                            var page01 = $('.page01')[0];
                            console.log(page01);
                            var pageNum = '';

                            for(var i = 1; i <= pages; i++){
                                pageNum+=`<a href="javascript:">${i}</a>`  
                                // var page01 += $('.page01').append('<a href="javascript:">'+i+'</a>')
                            }
                    // console.log(pages)

                    page01.innerHTML = pageNum;



                    page01.onclick = function(event){
                        var target = event.target || event.srcElement;
                        if(target.tagName === 'A'){
                            var pages0 = (target.innerHTML-1)*num;
                            console.log(pages0)
                            var params = {page:pages0,_num:num}
                            $.ajax({
                                url:'./php/list.php',
                                data:params,
                                success: function(res){
                                    var erCiData = window.eval('('+res+')');
                                    // console.log(erCiData);
                                    var fanye = erCiData.data.data1;
                                    // console.log("fanye",fanye)
                                    generateGoods(fanye);
                                }
                            })
                        }
                    }
            }
    })

        function generateGoods(data){   

            var lists_wapper = $('#lists_wapper')[0];
            lists_wapper.innerHTML='';
            var lists=document.createElement('ul');
            lists.className="lists clearfix";
            // console.log(data)
            lists.innerHTML=data.map(function(items){
                var img=JSON.parse(items.img)
                // console.log(img[0])
                img[0]=img[0].replace(/data\//,'')
                
                return`<div class="deal brand-cpc " guid="${items.id}">
                    <div class="con">
                        <a target="_blank" href="../src/goods.html?guid=${items.id}&img=${img[0]}&title=${items.title}&title_ad=${items.title_ad}&price=${items.price}&reference=${items.reference}">
                            <img src="${img[0]}">
                        </a>
                        <div class="title-time">
                            <a target="_blank" href="">${items.title}</a>
                            <span class="remain-time"><p class="yuanjia"><del>原价：￥${items.reference}</del></p><p>现价：￥${items.price}</p></span>
                        </div>
                        <div class="coupon-collect">
                            <span class="coupon">${items.prescription}</span>
                        </div>
                    </div>
                </div>`

            }).join('');
            
            lists_wapper.appendChild(lists);
        // 商品列表按价格排序(低到高)
        
        var jiageD=document.querySelector('.jiageD');

            jiageD.onclick=function(){console.log(111)
                    data.sort(function(a,b){console.log(222)
                        // if(a.sale-b.sale>=0){

                        return a.price - b.price;
                        // }
                        // else{
                            // return b.sale - a.sale;
                        // }
                    })
             generateGoods(data);   

            }


            // 商品列表按时间排序
        
            var shijian=document.querySelector('.shijian');
            shijian.onclick=function(){

                data.sort(function(a,b){
                    var shijian1=Date.parse(a.reference);
                    var shijian2=Date.parse(b.reference);
                    return shijian1 - shijian2 ;
                })
                generateGoods(data);
            }

            // 商品列表按销量排序
        
            var xiaoliang=document.querySelector('.xiaoliang');
            xiaoliang.onclick=function(){

                data.sort(function(a,b){
                    var xiaoliang1=Date.parse(a.num);
                    var xiaoliang2=Date.parse(b.num);
                    return xiaoliang1 - xiaoliang2 ;
                })
                generateGoods(data);
            }

        }

            // 返回顶部js+吸顶菜单JS

        

        var backTop=document.querySelector('.backTop');
        var nav=document.querySelector('#nav');
        var header=$('#header')[0];
        
        // 设置滚动事件
            window.onscroll=function(){
                // 声明滚动y轴
                var scrollY=window.scrollY;
                // 设置条件，当Y轴滚动>=450实现出现返回顶部图标
                if(scrollY>=450){
                    backTop.style.display='block';
                }else{
                    backTop.style.display='none';
                }
                // 当Y轴滚动>=200,通过类名加减实现吸顶效果
                if(scrollY>=500){
                    header.className='yincang header';
                    nav.className='xiding nav';
                }
                else{
                    header.className='header';
                    nav.className='nav';
                }
            }
            // 设置点击事件
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
