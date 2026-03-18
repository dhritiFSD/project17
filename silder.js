var images = [
    "https://www.shutterstock.com/image-illustration/3d-rendering-small-1-storey-600nw-2456325111.jpg",
    "https://media.assettype.com/gulfnews%2Fimport%2F2023%2F11%2F09%2FStock-Qatar-Airways_18bb37e9d93_large.jpg?w=480&auto=format%2Ccompress&fit=max",
    "https://balidave.com/wp-content/uploads/2022/11/best-hotel-bali.jpeg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-BxXJOkudtNNDPLAbfeLXyWfbEhZLP0h7YA&s"
];
var currentIndex = 0; // Tracks current image index
// get DOM elements
var image = document.getElementById("image"); // Image element from DOM
var nextBtn = document.getElementById("next"); // Next button element
var prevBtn = document.getElementById("prev"); // Previous button element
// function to show image
function showImage() {
    image.src = images[currentIndex]; // Update image source based on index
}
// next button
nextBtn.addEventListener("click", function () {
    currentIndex++; // Move to next image index
    if (currentIndex >= images.length) { // Check if index exceeds array length
        currentIndex = 0; // Reset index to first image
    }
    showImage(); // Display updated image
});
// previous button
prevBtn.addEventListener("click", function () {
    currentIndex--; // Move to previous image index
    if (currentIndex < 0) { // Check if index goes below 0
        currentIndex = images.length - 1; // Set index to last image
    }
    showImage(); // Display updated image
});
// initial image
showImage(); // Display first image when page loads
