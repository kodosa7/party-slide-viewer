const imageContainer = document.querySelector('.image-container');
const addImageBtn = document.querySelector('.add-image-btn');
const slideshowBtn = document.querySelector('.slideshow-btn');
const setAddIntervalBtn = document.querySelector('.set-add-interval-btn');
const setSubIntervalBtn = document.querySelector('.set-sub-interval-btn');

let images = [];
let currentIndex = 0;
let slideshowInterval;
let interval = 2000;
let buttonsVisible = true;

addImageBtn.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
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

slideshowBtn.addEventListener('click', () => {
    if (images.length === 0) {
        alert('Please add images first.');
        return;
    }

    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
        slideshowBtn.textContent = 'Slideshow';
    } else {
        slideshowInterval = setInterval(() => {
            showNextImage();
        }, interval);
        slideshowBtn.textContent = 'Stop Slideshow';
    }
});

setAddIntervalBtn.addEventListener('click', () => {
    console.log("setADDintervalbtn clicked");
    interval += 1000;
    console.log(interval);
    document.querySelector('.display-interval').innerHTML = interval / 1000;
});

setSubIntervalBtn.addEventListener('click', () => {
    console.log("setSUBintervalbtn clicked");
    if (interval <= 0) interval = 0;
    interval -= 1000;
    console.log(interval);
    document.querySelector('.display-interval').innerHTML = interval / 1000;
});

const showNextImage = () => {
    currentIndex = (currentIndex + 1) % images.length;
    displayImage(images[currentIndex]);
}

const displayImage = (image) => {
    imageContainer.innerHTML = '<div class="image">test</div>';
    imageContainer.appendChild(image);
}

const toggleButtonsVisibility = () => {
    const buttons = [addImageBtn, slideshowBtn, setAddIntervalBtn, setSubIntervalBtn];
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