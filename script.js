document.addEventListener('DOMContentLoaded', () => {

    // Typing Text Effect with Letter-by-Letter Highlight Delete
    const textElement = document.querySelector('.typing-text');
    const words = ["R&D Leader.", "Innovator.", "Strategic Visioner.", "Engineering Expert.", "Regulatory Specialist."];
    let wordIndex = 0;
    let charIndex = 0;
    let highlightIndex = 0;
    let phase = 'typing'; // 'typing', 'pausing', 'highlighting', 'clearing'

    function runAnimation() {
        const currentWord = words[wordIndex];

        switch (phase) {
            case 'typing':
                if (charIndex < currentWord.length) {
                    // Build text with spans for each character
                    let html = '';
                    for (let i = 0; i <= charIndex; i++) {
                        html += `<span class="char">${currentWord[i]}</span>`;
                    }
                    textElement.innerHTML = html;
                    charIndex++;
                    setTimeout(runAnimation, 80);
                } else {
                    // Done typing, pause before highlight
                    phase = 'pausing';
                    highlightIndex = 0;
                    setTimeout(runAnimation, 400);
                }
                break;

            case 'pausing':
                // Start highlighting letter by letter
                phase = 'highlighting';
                runAnimation();
                break;

            case 'highlighting':
                const chars = textElement.querySelectorAll('.char');
                if (highlightIndex < chars.length) {
                    chars[highlightIndex].classList.add('highlighted');
                    highlightIndex++;
                    setTimeout(runAnimation, 40); // Speed of highlight per letter
                } else {
                    // Done highlighting, wait then clear
                    phase = 'clearing';
                    setTimeout(runAnimation, 200);
                }
                break;

            case 'clearing':
                // Clear and start next word
                textElement.innerHTML = '';
                charIndex = 0;
                highlightIndex = 0;
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
