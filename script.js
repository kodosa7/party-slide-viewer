const imageContainer = document.querySelector('.image-container');
const addImageBtn = document.querySelector('.add-image-btn');
const slideshowBtn = document.querySelector('.slideshow-btn');
let images = [];
let currentIndex = 0;
let slideshowInterval;

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
        }, 2000);
        slideshowBtn.textContent = 'Stop Slideshow';
    }
});

const showNextImage = () => {
    currentIndex = (currentIndex + 1) % images.length;
    displayImage(images[currentIndex]);
}

const displayImage = (image) => {
    imageContainer.innerHTML = '';
    imageContainer.appendChild(image);
}