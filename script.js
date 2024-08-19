const imageContainer = document.querySelector(".image-container");
const imageContainerImg = document.querySelector(".image-container-img");
const addImageBtn = document.querySelector(".add-image-btn");
const slideshowBtn = document.querySelector(".slideshow-btn");
const setAddIntervalBtn = document.querySelector(".set-add-interval-btn");
const setSubIntervalBtn = document.querySelector(".set-sub-interval-btn");
const controlTexts = document.querySelector(".control-texts");
const displayInterval = document.querySelector(".display-interval");

let images = [];
let currentIndex = 0;
let slideshowInterval;
let interval = 2000;
let buttonsVisible = true;

// images are being pushed into an array
addImageBtn.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;
                images.push(img);
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
});

// start/stop button
slideshowBtn.addEventListener("click", () => {
    if (images.length === 0) {
        alert("Please add images first.");
        return;
    }

    if (slideshowInterval) {
        console.log("Stop button pressed")
        clearInterval(slideshowInterval);
        slideshowInterval = null;
        slideshowBtn.textContent = "Slideshow";
        imageContainerImg.style.animationPlayState = 'paused';
    } else {
        console.log("Start button pressed")
        slideshowInterval = setInterval(() => {
            showNextImage();
        }, interval);
        slideshowBtn.textContent = "Stop";
        imageContainerImg.style.animationPlayState = 'running';
    }
});

// increase interval button
setAddIntervalBtn.addEventListener("click", () => {
    console.log("setADDintervalbtn clicked");
    interval += 1000;
    setSubIntervalBtn.disabled = false;  // always enable the '-' button when the '+' button is pressed
    console.log(interval);
    displayInterval.innerHTML = Math.floor(interval / 1000); // change the number in DOM
    imageContainerImg.style.animationDuration = '${interval}ms' // inject the interval to the css animation
});

// decrease interval button
setSubIntervalBtn.addEventListener("click", () => {
    console.log("setSUBintervalbtn clicked");
    interval -= 1000;
    console.log("interval after", interval);
    document.querySelector(".display-interval").innerHTML = Math.floor(interval / 1000); // change the number in DOM
    imageContainerImg.style.animationDuration = '${interval}ms' // inject the interval to the css animation
    
    // disable the '-' button if the interval is 1000 milliseconds    
    if (interval === 1000) {
        console.log("interval === 1000 happened");
        setSubIntervalBtn.disabled = true;
    };
});

const showNextImage = () => {
    currentIndex = (currentIndex + 1) % images.length;
    displayImage(images[currentIndex]);
}

const displayImage = (image) => {
    imageContainer.innerHTML = "<div class='image'>test</div>";
    imageContainer.appendChild(image);
}

const toggleButtonsVisibility = () => {
    const buttons = [addImageBtn, slideshowBtn, setAddIntervalBtn, setSubIntervalBtn, controlTexts];
    buttons.forEach(button => {
        if (buttonsVisible) {
            button.style.display = "none";
        } else {
            button.style.display = "block";
        }
    });
    buttonsVisible = !buttonsVisible;
}

document.addEventListener("keydown", (e) => {
    if (e.key === "m" || e.key === "M") {
        toggleButtonsVisibility();
    }
});
