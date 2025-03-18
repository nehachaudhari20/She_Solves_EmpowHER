document.addEventListener("DOMContentLoaded", () => {
    // Password Toggle Functionality
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    
    togglePassword.addEventListener('click', function() {
        // Toggle the password visibility
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle the eye icon
        this.querySelector('i').classList.toggle('bi-eye');
        this.querySelector('i').classList.toggle('bi-eye-slash');
    });
    
    // Create animated background particles
    const particlesContainer = document.getElementById('particles-container');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('floating-particle');
        
        // Random size between 50px and 150px
        const size = Math.random() * 100 + 50;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        
        // Random opacity
        particle.style.opacity = (Math.random() * 0.5 + 0.1).toString();
        
        // Animation
        const duration = Math.random() * 10 + 10;
        particle.style.animation = `float ${duration}s linear infinite`;
        
        particlesContainer.appendChild(particle);
    }
});