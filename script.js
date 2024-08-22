const imageContainer = document.querySelector(".image-container");
const imageContainerImg = document.querySelector(".image-container-img");
const addImageBtn = document.querySelector(".add-image-btn");
const slideshowBtn = document.querySelector(".slideshow-btn");
const setAddIntervalBtn = document.querySelector(".set-add-interval-btn");
const setSubIntervalBtn = document.querySelector(".set-sub-interval-btn");
const controlTexts = document.querySelector(".control-texts");
const displayInterval = document.querySelector(".display-interval");
const files = document.querySelector(".files");

let images = [];
let currentIndex = 0;
let slideshowInterval;
let interval = 20000;
let buttonsVisible = true;
let filesVisible = false;

// Images are being pushed into an array
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
                img.name = file.name; // Store the file name in the image object
                images.push(img);
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
});

// Start/Stop button
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
    } else {
        showNextImage();
        console.log("Start button pressed")
        slideshowInterval = setInterval(() => {
            showNextImage();
        }, interval);
        slideshowBtn.textContent = "Stop";
    }
});

// Increase interval button
setAddIntervalBtn.addEventListener("click", () => {
    console.log("setADDintervalbtn clicked");
    interval += 1000;
    setSubIntervalBtn.disabled = false;  // Always enable the '-' button when the '+' button is pressed
    console.log(interval);
    displayInterval.innerHTML = Math.floor(interval / 1000); // Change the number in DOM
    updateAnimationDuration(interval);

    // Disable the '+' button if the interval is 100000ms
    setAddIntervalBtn.disabled = interval === 100000;
});

// Decrease interval button
setSubIntervalBtn.addEventListener("click", () => {
    console.log("setSUBintervalbtn clicked");
    interval -= 1000;
    console.log("interval after", interval);
    document.querySelector(".display-interval").innerHTML = Math.floor(interval / 1000); // Change the number in DOM
    updateAnimationDuration(interval);
    
    // Disable the '-' button if the interval is 1000ms    
    setSubIntervalBtn.disabled = interval === 1000;

    // Enable the '+' button if the interval is less than 100000ms
    setAddIntervalBtn.disabled = false;
});

// Force update the style in the document head
// by overriding the animation-duration property
const updateAnimationDuration = (newDuration) => {
    let styleElement = document.getElementById("dynamic-animation-style");

    // If the style element doesn't exist, create it
    if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = "dynamic-animation-style";
        document.head.appendChild(styleElement);
    }

    // Force overriding the content of the style element
    styleElement.innerHTML = `img { animation-duration: ${newDuration}ms !important; }`;
}


const showNextImage = () => {
    currentIndex = (currentIndex + 1) % images.length;
    displayImage(images[currentIndex]);
}

const displayImage = (image) => {
    imageContainer.innerHTML = "<div class='image'></div>";
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


const toggleFilesVisibility = () => {
    if (filesVisible) {
        files.style.display = "none";
    } else {
        files.style.display = "block";
        files.innerHTML = "";
        images.forEach((image, i) => {
            files.innerHTML += `${i.toString().padStart(2, '0')}: ${image.name}<br>`;
        });
    }
    filesVisible = !filesVisible;
}

document.addEventListener("keydown", (e) => {
    if (e.key === "f" || e.key === "F") {
        toggleFilesVisibility();
    }
});
