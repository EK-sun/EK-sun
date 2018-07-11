document.addEventListener('DOMContentLoaded',function(){
    let option={
        el:document.querySelector('.wapper_main'),
        autoPlay:true,
        width:951,
        height:304,
        interval:2000,
        slides:3,
    }
    wapper_main(option);
})

var wapper_main=function(opt){
    let ul=document.createElement('ul');
    ul.style.width=`${opt.width * opt.slides}px`;
    ul.style.height=`${opt.height}px`;
    


    for(var i=0;i<opt.slides;i++){console.log(222)
        let li=document.createElement('li');
        li.style.width=`${opt.width}px`;
        li.style.height=`${opt.height}px`;
        var img=document.createElement('img');
        img.src='./img/banner'+(i+1)+'.jpg';
        li.appendChild(img);
        ul.appendChild(li);
       
    }
     // 无缝轮播关键，复制第一张轮播图到最后
     ul.appendChild(ul.children[0].cloneNode(true));
    opt.el.appendChild(ul);


    var ul2=document.createElement('ul');
    ul2.className='lisBox';
    var lis=[];
    for(var i=0;i<opt.slides;i++){
        let li=document.createElement('li');
        li.className='btnChange';
        if(i===0){
            li.className='active btnChange';
        }
        ul2.appendChild(li);
        lis.push(li);
    }
    opt.el.appendChild(ul2);

    var index=1;
    if(opt.autoPlay){
        var timer=window.setInterval(Play,opt.interval);
    }
    // 封装
    function Play(){
           
        show()
        index++;
   }
//    封装
   function show(){
        if(index>=opt.slides){
            index=0;
            ul.style.transition='transform'+0;
        }
        else{
            ul.style.transition='transform'+'.'+5+'s';

        }
        if(index<0){
            index=opt.slides-1;
        }
        ul.style.transform=`translateX(${opt.width * index * -1}px)`;                


        for(var i=0;i<opt.slides;i++){
            lis[i].className='btnChange';
        }
        lis[index].className='active btnChange';
   }
//    鼠标移入移出事件
    opt.el.onmouseover=function(){
        clearInterval(timer);
    }
    opt.el.onmouseout=function(){
        timer=window.setInterval(Play,opt.interval);
    }
   
// 点击序号事件
    var btnChange=document.getElementsByClassName('btnChange');


        for(var j = 0; j < btnChange.length; j ++){
            (function(j){
                btnChange[j].onmouseover=function(){
                                

                    index=j;
                    show();
                    console.log(index)
                    console.log(j)
                }
        })(j);
    }
    
}




// document.addEventListener('DOMContentLoaded',function(){
//     let option={
//         el:document.querySelector('#flashsaleModuleWrap'),
//         autoPlay:true,
//         width:1200,
//         height:250,
//         interval:2000,
//         slides:12,
//     }
//     flashsaleModuleWrap(option);
// })

// var flashsaleModuleWrap=function(opt){
//     let flashsaleModuleWrap=document.querySelector('#flashsaleModuleWrap');
//     flashsaleModuleWrap.style.width=`${opt.width * opt.slides}px`;
//     flashsaleModuleWrap.style.height=`${opt.height}px`;
    


//     for(var i=0;i<opt.slides;i++){console.log(222)

//         let li=document.createElement('li');
//         li.style.width=`${opt.width}px`;
//         li.style.height=`${opt.height}px`;
//         var img=document.createElement('img');
//         img.src='./img/wrap'+(i+1)+'.jpg';
//         li.appendChild(img);
//         flashsaleModuleWrap.appendChild(li);
       
//     }
//     // 无缝轮播关键，复制第一张轮播图到最后
//     flashsaleModuleWrap.appendChild(flashsaleModuleWrap.children[0].cloneNode(true));
//     opt.el.appendChild(flashsaleModuleWrap);


//     var index=1;
//     if(opt.autoPlay){
//         var timer=window.setInterval(Play,opt.interval);
//     }
//     // 封装
//     function Play(){
           
//         show()
//         index++;
//    }
// //    封装
//    function show(){
//         if(index>=opt.slides){
//             index=0;
//             flashsaleModuleWrap.style.transition='transform'+0;
//         }
//         else{
//             flashsaleModuleWrap.style.transition='transform'+'.'+5+'s';

//         }
//         if(index<0){
//             index=opt.slides-1;
//         }
//         flashsaleModuleWrap.style.transform=`translateX(${opt.width * index * -1}px)`;                


//    }
// //    鼠标移入移出事件
//     opt.el.onmouseover=function(){
//         clearInterval(timer);
//     }
//     opt.el.onmouseout=function(){
//         timer=window.setInterval(Play,opt.interval);
//     }
//     // 创建前进后退
//         var btnPrev=document.createElement('span');
//             btnPrev.className='btnPrev';
//             btnPrev.innerHTML='&lt;';

//             var btnNext=document.createElement('span');
//             btnNext.className='btnNext';
//             btnNext.innerHTML='&gt;';
//             opt.el.appendChild(btnPrev);
//             opt.el.appendChild(btnNext);

// // 点击前进后退事件
//     opt.el.onclick=e=>{console.log(666)
//         if(e.target.className==='btnPrev'){
//             index=index-2;
//             Play();
        
//         }else if(e.target.className==='btnNext'){
//             Play();
//         }
        
//     }
// }






