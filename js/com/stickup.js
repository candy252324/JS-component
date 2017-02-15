

define(['jquery'],function($) {    
    $.fn.stick=function(){
        var $cur = $(this),
          offsetTop = $cur.offset().top,
          offsetLeft = $cur.offset().left;
       
      
      
        var $curClone = $cur.clone()
                .css({visibility: 'hidden', display: 'none'})
                .insertBefore($cur);
         
        $(window).on('scroll', function(){
          var scrollTop = $(this).scrollTop();
          curW = $cur.width();
          
          if(scrollTop >= offsetTop ){
            if(!isFixed()){
              setFixed();
            }
          }else{
            if(isFixed()){
              unsetFixed();
            }
          }
        });
      
        function isFixed(){
          return $cur.data('data-fixed');
        }
        
        function setFixed(){
          $cur.data('data-fixed', true)
              .css({
                    'position': 'fixed', 
                    'top': 0, 
                    'left': offsetLeft,
                    'width': curW, 
                    'margin': 0,
                    'z-index': 9999
                  });
          $curClone.show();  
          
        }
        function unsetFixed(){
          $cur.data('data-fixed', false)
              .removeAttr('style');
          $curClone.hide();
        }
    }
})
    

  

  



  
