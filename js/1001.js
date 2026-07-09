const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {

    const target = +counter.getAttribute('data-target');

    const updateCounter = () => {

        const current = +counter.innerText;

        const increment = target / 100;

        if(current < target){

            counter.innerText = Math.ceil(current + increment);

            setTimeout(updateCounter, 20);

        }else{

            if(target == 95){
                counter.innerText = target + "%";
            }
            else if(target == 15){
                counter.innerText = target + "+";
            }
            else if(target == 40){
                counter.innerText = target + "%+";
            }

        }
    };

    updateCounter();
});


const track = document.querySelector(".testimonial-track");

const nextBtn = document.querySelector(".next");

const prevBtn = document.querySelector(".prev");

let currentIndex = 0;

const cards = document.querySelectorAll(".testimonial-card");

const visibleCards = 3;

function updateSlider(){

    const cardWidth = cards[0].offsetWidth + 30;

    track.style.transform =
    `translateX(-${currentIndex * cardWidth}px)`;

}

nextBtn.addEventListener("click", ()=>{

    if(currentIndex < cards.length - visibleCards){
        currentIndex++;
    }else{
        currentIndex = 0;
    }

    updateSlider();
});

prevBtn.addEventListener("click", ()=>{

    if(currentIndex > 0){
        currentIndex--;
    }else{
        currentIndex = cards.length - visibleCards;
    }

    updateSlider();
});

setInterval(()=>{

    if(currentIndex < cards.length - visibleCards){
        currentIndex++;
    }else{
        currentIndex = 0;
    }

    updateSlider();

},4000);