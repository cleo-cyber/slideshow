const slider = document.querySelector(".slider_container");

const slides = Array.from(document.querySelectorAll(".slide"));

let isDragging = false,
  startPosition = 0,
  currentTranslate = 0,
  previousTransalte = 0,
  animationID = 0,
  currentIndex = 0;

slides.forEach(function (slide, index) {
  // Remove drag effect on image
  const slideImg = slide.querySelector("img");
  slideImg.addEventListener("dragstart", function (e) {
    e.preventDefault();
  });

//  Disable Context Menu
  window.oncontextmenu=function(event){
    event.preventDefault()
    event.stopPropagation()
    return false
  }
  // Touch events
  slide.addEventListener("touchstart", touchStart(index));
  slide.addEventListener("touchend", touchEnd);
  slide.addEventListener("touchmove", touchMove);

  // Mouse events
  slide.addEventListener("mousedown",touchStart(index));
  slide.addEventListener("mouseup", touchEnd);
  slide.addEventListener("mouseleave", touchEnd);
  slide.addEventListener("mousemove", touchMove);
});

function touchStart(index) {
  return function (event) {
    currentIndex=index;
    startPosition=getPositioX(event)
    console.log(startPosition)
   isDragging=true

   animationID=requestAnimationFrame(animation)
   slider.classList.add('grabbing')


  };
}

function touchEnd() {
 isDragging=false
 cancelAnimationFrame(animationID)
 const movedBy=currentTranslate-previousTransalte;

 if(movedBy<-100 &&currentIndex< slides.length-1){
    currentIndex+=1;
 }
 if(movedBy>100 && currentIndex>0){
    currentIndex-=1;
 }
 slider.classList.remove('grabbing')

 setPostionByIndex()
}

function touchMove(event) {
    if(isDragging){
        const currentPosition=getPositioX(event)
        currentTranslate=previousTransalte+currentPosition-startPosition
    }
  }

function getPositioX(event){
    return event.type.includes('mouse') ? event.pageX :event.touches[0].clientX;
}

function animation(){
    setSliderPosition()
    if(isDragging){
        requestAnimationFrame(animation)
    }
}

function setSliderPosition(){
    slider.style.transform=`translateX(${currentTranslate}px)`
}

function setPostionByIndex(){
    currentTranslate=currentIndex * -window.innerWidth
    previousTransalte=currentTranslate
    setSliderPosition()
}