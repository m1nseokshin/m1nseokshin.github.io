lightbox.option({
    resizeDuration: 200,
    wrapAround: true,
    disableScrolling: true,
    fitImagesInViewport:true,
    positionFromTop: 50
})

if(matchMedia("screen and (max-width: 540px)").matches){
  lightbox.option({    
    resizeDuration: 200,
    wrapAround: true,
    disableScrolling: true,
    fitImagesInViewport:true,
    positionFromTop: 190
  });
}
else if(matchMedia("screen and (max-width: 1024px)").matches){
  lightbox.option({    
    resizeDuration: 200,
    wrapAround: true,
    disableScrolling: true,
    fitImagesInViewport:true,
    positionFromTop: 200
  });
}

window.onresize = function(){
  document.location.reload();
};