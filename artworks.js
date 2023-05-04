lightbox.option({
    resizeDuration: 200,
    wrapAround: true,
    disableScrolling: true,
    fitImagesInViewport:true,
    positionFromTop: 200
})

if (window.matchMedia("(min-width: 500px)").matches) { positionFromTop:0
  } 

  else {
    positionFromTop:300
  }