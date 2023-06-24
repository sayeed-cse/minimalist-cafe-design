const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper img");
const carouselChildrens = [...carousel.children];

let isDragging = false, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // if isDragging is false return from here
    if(!isDragging) return; 
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);


// comments carousel

const review_wrapper = document.querySelector(".review_wrapper");
const carousel_comments = document.querySelector(".carousel_comments");
const firstCardWidthCmt = carousel_comments.querySelector(".comments").offsetWidth;
const arrowBtns_comments = document.querySelectorAll(".review_wrapper img");
const carouselChild = [...carousel_comments.children];

// Get the number of cards that can fit in the carousel at once
let cardPerViewcmt = Math.round(carousel_comments.offsetWidth / firstCardWidthCmt);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChild.slice(-cardPerViewcmt).reverse().forEach(card => {
    carousel_comments.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChild.slice(0, cardPerViewcmt).forEach(card => {
    carousel_comments.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns_comments.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel_comments.scrollLeft += btn.id == "cmnt_left" ? -firstCardWidthCmt : firstCardWidthCmt;
    });
});



const infiniteScrollCmt = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel_comments.scrollLeft === 0) {
        carousel_comments.classList.add("no-transition");
        carousel_comments.scrollLeft = carousel_comments.scrollWidth - (2 * carousel_comments.offsetWidth);
        carousel_comments.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel_comments.scrollLeft) === carousel_comments.scrollWidth - carousel_comments.offsetWidth) {
        carousel_comments.classList.add("no-transition");
        carousel_comments.scrollLeft = carousel_comments.offsetWidth;
        carousel_comments.classList.remove("no-transition");
    }
}

carousel_comments.addEventListener("scroll", infiniteScrollCmt);