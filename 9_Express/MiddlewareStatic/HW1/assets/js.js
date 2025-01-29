console.log("hi from JS");

// Get the h1 element
const h1 = document.querySelector('h1');

// Add click event listener
h1.addEventListener('click', function() {
    // Generate random color
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    // Change h1 color
    this.style.color = randomColor;
});