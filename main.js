let $buttons = $('#buttonWrapper > button')
let $slides = $('#slides')
let $images = $slides.children('img')
var current = 0


makeFakeSlides()
$slides.css({'transform':'translateX(-400px)'})
bindEvents()
$(next).on('click',function(){
    goToslide(current+1)
})
$(prev).on('click',function(){
    goToslide(current-1)
})
var timer = setInterval(function(){goToslide(current+1)},2000)
$('.window').on('mouseenter',function(e){
    window.clearInterval(timer);
    $(e.currentTarget).css({'cursor':'pointer'})
})
$('.window').on('mouseleave',function(e){
    var timer = setInterval(function(){goToslide(current+1)},2000)
   
})
//function below
function makeFakeSlides(){
    let $firstCopy = $images.eq(0).clone(true)
    let $lastCopy = $images.eq($images.length -1).clone(true)
    $slides.append($firstCopy)
    $slides.prepend($lastCopy)
}


function bindEvents(){
    $('#buttonWrapper').on('click','button',function(e){
        let $button = $(e.currentTarget)
        let index = $button.index()
        goToslide(index)

    })

}
function goToslide(index){
    if(index>$buttons.length -1){
        index=0
    }else if(index<0){
        index = $buttons.length -1
    }
    if(current === $buttons.length-1 && index === 0){
        $slides.css({'transform':'translateX('+((-400)*($buttons.length +1)) +'px)'}).
                one('transitionend',function(){
                    $slides.hide().offset()
                    $slides.css({transform:'translateX(-400px)'}).show()
                })
    }else if(current === 0 && index === $buttons.length -1){
        $slides.css({'transform':'translateX('+ (0) +'px)'}).
                one('transitionend',function(){
                    $slides.hide().offset()
                    $slides.css({transform:'translateX('+((-400)*(index+1)) +'px)'}).show()
                })

    }else{
        $slides.css({'transform':'translateX('+(-400*(index+1)) +'px)'})
    }
    current = index
    console.log(current)
 
}

