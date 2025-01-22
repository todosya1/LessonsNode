

document.addEventListener('DOMContentLoaded', () => {
    const headings = document.querySelectorAll('h1'); 
    headings.forEach(heading => {
        heading.style.color = 'red';
});
});