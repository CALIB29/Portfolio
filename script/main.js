// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Active link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Initialize Three.js for 3D elements
function initThreeJS() {
    const container = document.getElementById('hero-3d');
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00f0ff, 2, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Create a 3D object (you can replace this with your own 3D model)
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshPhongMaterial({
        color: 0x00f0ff,
        shininess: 100,
        transparent: true,
        opacity: 0.9,
        wireframe: false
    });
    
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Position camera
    camera.position.z = 5;

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        torusKnot.rotation.x += 0.005;
        torusKnot.rotation.y += 0.01;
        
        // Add floating animation
        torusKnot.position.y = Math.sin(Date.now() * 0.001) * 0.3;
        
        renderer.render(scene, camera);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    animate();
}

// Typewriter effect
function initTypewriter() {
    const typewriterElement = document.querySelector('.typewriter');
    if (!typewriterElement) return;
    
    const text = typewriterElement.textContent;
    typewriterElement.textContent = '';
    
    let i = 0;
    const speed = 50; // Speed in milliseconds
    
    function typeWriter() {
        if (i < text.length) {
            typewriterElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    // Start the animation
    setTimeout(typeWriter, 1000); // Delay start by 1 second
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    initTypewriter();
    
    // Add animation to elements
    gsap.from('.hero-content h1, .hero-content h2, .hero-content p, .cta-buttons', {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form submission logic here
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
});

// Add scroll reveal animations
window.addEventListener('scroll', revealOnScroll);

function revealOnScroll() {
    const elements = document.querySelectorAll('.about, .projects, .contact, .project-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize AOS (Animate On Scroll) for elements
function initAOS() {
    const elements = document.querySelectorAll('.about, .projects, .contact, .project-card');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    // Trigger initial check
    revealOnScroll();
}

// Call initAOS when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAOS);
} else {
    initAOS();
}

// Add cursor effect
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

// Add custom cursor styles
const style = document.createElement('style');
style.textContent = `
    .custom-cursor {
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s, background-color 0.3s;
    }
    
    a:hover ~ .custom-cursor,
    button:hover ~ .custom-cursor {
        width: 40px;
        height: 40px;
        background-color: rgba(0, 240, 255, 0.2);
    }
`;
document.head.appendChild(style);
