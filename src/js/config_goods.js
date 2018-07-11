require(['config'],function(){
    require(['jquery','http','fangDaJing'],function($,http,fangDaJing){
        jQuery(function($){

            var wapper_l_main=$('.wapper_l_main')[0];
            var titles=$('.titles')[0];
            var goodsPrice=$('.goodsPrice')[0];
            var title_ad=$('.title_ad')[0];
            var smallImg=$('.smallImg')[0];

            var goods_canShu=decodeURI(location.search);
            // console.log(444)
                // console.log(goods_canShu)

            goods_canShu=goods_canShu.slice(1);
            goods_canShu=goods_canShu.split('&');
            var obj={};
            // console.log(goods_canShu)

            goods_canShu.forEach(function(item){
                var arr=item.split('=');

                obj[arr[0]]=arr[1];
            });
                // console.log(obj)
            
            var goodsP='<img src="'+obj.img+'" alt="" class="imge0"/>'
            wapper_l_main.innerHTML=goodsP;

            var goodsT='<p class="title0">'+obj.title+'</p>'
            titles.innerHTML=goodsT;
            
            var titleS='<a class="title_ad0">'+obj.title_ad+'</a>'
            title_ad.innerHTML=titleS;

            var goodsPp='<strong class="red js_price_st">￥<i info="99.00" class="price0"> '+obj.price+'</i></strong><del class="no js_org_price">原价<em class="fontSimSun">：</em><i info="199.00" class="reference0">'+obj.reference+'</i></del>'
            goodsPrice.innerHTML=goodsPp;

            var smallImg0='<a href="javascript:"><img src="'+obj.img+'" alt="" class=""/></a>'
            smallImg.innerHTML=smallImg0;

            var shuliang = $('#shuliang')[0];
            var decrease = $('.decrease')[0];
            var increase = $('.increase')[0];
            $('.increase').click(function(){
                
                shuliang.value++;
            });
            $('.decrease').click(function(){
                if(shuliang.value>=1)
                shuliang.value--;

            })
        
        
            
        $('.carbtn').click(function(){
            var img1 = $('.imge0')[0].src;
            var title1 = $('.title0').text();
            var type1 = $('.title_ad0').text();
            var price1 = $('.price0').text();
            var reference1 = $('.reference0').text();
            var qty1 = $('#shuliang').val();
            $.ajax({
                url:'./php/goods.php',
                data:{
                    guid:obj.guid,
                    img:img1,
                    title:title1,
                    type:type1,
                    price:price1,
                    reference:reference1,
                    qty:qty1
                },
                dataType:'json',
                success:function(data){
                    console.log(data);
                }

            })
        var add_car = $('#fangDa')[0];
        var clone_img = add_car.appendChild(add_car.children[0].cloneNode(true));
        clone_img.style.width = '402px';
        clone_img.style.height = '402px';
        // console.log(clone_img)
        
        clone_img.style.position = 'fixed';
        clone_img.style.left = '180px';
        clone_img.style.top = '180px';
        clone_img.style.zIndex='999';

        var moveX = clone_img.offsetLeft;
        var moveY = clone_img.offsetTop;
        var clone_img_w = clone_img.width;
        var clone_img_h = clone_img.height;

        var timer = setInterval(function(){
            moveX += 35;
            moveY -= 3;
            clone_img_w -= 15;
            clone_img_h -= 15;

            clone_img.style.left = moveX + 'px';
            clone_img.style.top = moveY + 'px';
            clone_img.style.width = clone_img_w + 'px';
            clone_img.style.height = clone_img_h + 'px';            

            if(moveX>=1200){

                clearInterval(timer);
                add_car.removeChild(clone_img)

            }

            },50)

            var carNum =$('.tab-sup-bd')[0].innerHTML++;
            var topCarNum =$('.topCarNum')[0].innerHTML++;


        })


        // 放大镜
        fangDaJing.initialize($('#fangDa'))
        // 鼠标进入
        $('#fangDa').mouseenter(function(e) {
            e=e.target
            if(!e.src){
                // 鼠标在父对象边框进入的情况
                // src将获取不到
                e=$('img',e)[0] 
            }
                fangDaJing.into(e.src)
        });
        // 鼠标离开
        $('#fangDa').mouseleave(function(e) {
            fangDaJing.leave()
        });
        // 鼠标移动
        $('#fangDa').mousemove(function(e) {
            fangDaJing.mover(e)
        });



            
        })
    })
})