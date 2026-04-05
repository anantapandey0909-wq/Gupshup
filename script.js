// Add scrolled class to navbar on scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 26, 0.9)';
        navbar.style.padding = '1rem 0';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.1)';
        navbar.style.padding = '1.5rem 0';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetElement = document.querySelector(this.getAttribute('href'));
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // offset for fixed header
                behavior: 'smooth'
            });
        }
    });
});
