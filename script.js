document.addEventListener('DOMContentLoaded', () => {

    // Typing Text Effect with Letter-by-Letter Highlight
    const textElement = document.querySelector('.typing-text');
    const words = ["R&D Leader.", "Innovator.", "Strategic Visioner.", "Engineering Expert.", "Regulatory Specialist."];
    let wordIndex = 0;
    let charIndex = 0;
    let highlightProgress = 0;
    let phase = 'typing'; // 'typing', 'pausing', 'highlighting', 'clearing'

    function runAnimation() {
        const currentWord = words[wordIndex];

        switch (phase) {
            case 'typing':
                if (charIndex < currentWord.length) {
                    textElement.textContent = currentWord.substring(0, charIndex + 1);
                    textElement.style.setProperty('--highlight-progress', '0%');
                    charIndex++;
                    setTimeout(runAnimation, 80);
                } else {
                    // Done typing, pause before highlight
                    phase = 'pausing';
                    highlightProgress = 0;
                    setTimeout(runAnimation, 400);
                }
                break;

            case 'pausing':
                // Start highlighting
                textElement.classList.add('highlight');
                phase = 'highlighting';
                runAnimation();
                break;

            case 'highlighting':
                if (highlightProgress <= 100) {
                    textElement.style.setProperty('--highlight-progress', highlightProgress + '%');
                    highlightProgress += (100 / currentWord.length); // Progress per letter
                    setTimeout(runAnimation, 40);
                } else {
                    // Done highlighting
                    phase = 'clearing';
                    setTimeout(runAnimation, 200);
                }
                break;

            case 'clearing':
                // Clear and start next word
                textElement.classList.remove('highlight');
                textElement.textContent = '';
                textElement.style.setProperty('--highlight-progress', '0%');
                charIndex = 0;
                highlightProgress = 0;
                wordIndex = (wordIndex + 1) % words.length;
                phase = 'typing';
                setTimeout(runAnimation, 300);
                break;
        }
    }

    // Start typing effect
    if (textElement) {
        runAnimation();
    }


    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });

    // Animate stats on scroll
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-card').forEach(card => {
        statsObserver.observe(card);
    });

});
