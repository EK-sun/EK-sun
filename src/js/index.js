$(function(){
    // console.log(params)
    var num = 60;
    var page
    var params = {page:0,_num:num}
    $.ajax({
            url:'./php/index.php',
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
                                url:'./php/index.php',
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
            var flashsaleModuleWrap = $('#flashsaleModuleWrap')[0];
            flashsaleModuleWrap.innerHTML='';
            var ul=document.createElement('ul');
            console.log(data)
            ul.innerHTML=data.map(function(item){
                var img=JSON.parse(item.img)
                // console.log(img[0])
                img[0]=img[0].replace(/data\//,'')
                
                return`<li data-id="${item.id}">
                    <a href="./list.html" target="_blank" class="saleDeal">
                        <div class="dealCon">
                            <img src="${img[0]}" alt="" class="dealImg">
                            <div class="stock">
                                <div class="xsqMask"></div>
                                <span class="stockWord">
                                    <i class="stocknumber">${item.title_ad}</i> 抢完恢复原价${item.reference}元
                                </span>
                            </div>
                        </div>
                        <div class="dealInfo">
                            <span class="price">¥<em>${item.price}</em></span>
                        </div>
                        <div class="title_new">
                            <p class="word" title="${item.title}">${item.title}</p>
                        </div>
                    </a>
                </li>`
            }).join('');
            
            flashsaleModuleWrap.appendChild(ul);


            var goods_wapper = $('#goods_wapper')[0];
            goods_wapper.innerHTML='';
            var index_goods=document.createElement('ul');
            index_goods.className="goodlists clearfix";
            console.log(data)
            index_goods.innerHTML=data.map(function(items){
                var img=JSON.parse(items.img)
                // console.log(img[0])
                img[0]=img[0].replace(/data\//,'')
                
                return`<div class="deal brand-cpc " data-id="${items.id}">
                    <div class="con">
                        <a href="./list.html" target="_blank">
                            <img src="${img[0]}">
                        </a>
                        <div class="title-time">
                            <a href="./list.html" target="_blank">${items.title}</a>
                            <span class="remain-time"><p class="yuanjia"><del>原价：￥${items.reference}</del></p><p>现价：￥${items.price}</p></span>
                        </div>
                        <div class="coupon-collect">
                            <span class="coupon">${items.prescription}</span>
                        </div>
                    </div>
                </div>`

            }).join('');
            
            goods_wapper.appendChild(index_goods);

        }

        // 返回顶部js+吸顶菜单JS

        

        var backTop=document.querySelector('.backTop');
        var nav=document.querySelector('#nav');
        var header=$('#header')[0];
        
        // 设置滚动事件
            window.onscroll=function(){console.log(333)
                // 声明滚动y轴
                var scrollY=window.scrollY;
                // 设置条件，当Y轴滚动>=450实现出现返回顶部图标
                if(scrollY>=500){
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
