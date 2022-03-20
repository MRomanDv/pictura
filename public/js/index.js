const img = document.querySelector('.cont')
const img1 = document.querySelector('.cont1')
const infoContainer = document.querySelector('.info-container')
const infoContainer2 = document.querySelector('.info2')

const scroll = (entry,observer)=> {
   entry.forEach(element => {
       if(element.isIntersecting) {
           element.target.classList.add('visible')
       }else {
           element.target.classList.remove('visible')
       }
   })
}

const observer = new IntersectionObserver(scroll, {
    root:null,
    rootMargin:'0px 0px 0px 0px',
    threshold:.1
})

observer.observe(img)
observer.observe(img1)
observer.observe(infoContainer)
observer.observe(infoContainer2)