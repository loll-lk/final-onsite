document.addEventListener('DOMContentLoaded', () => { 

    const typingText = document.getElementById('typingText'); 
    const fullText = 'Adham Programmer'; 
    let charIndex = 0; 
    let isDeleting = false; 

    function typeEffect() { 
        let currentText = fullText.substring(0, charIndex); 
        if (charIndex >= 6) { 
            currentText = `Adham <span class="programmer-glow">${fullText.substring(6, charIndex)}</span>`; 
        } 
        typingText.innerHTML = currentText; 

        if (!isDeleting && charIndex < fullText.length) { 
            charIndex++; 
            setTimeout(typeEffect, 200); 
        } else if (isDeleting && charIndex > 0) { 
            charIndex--; 
            setTimeout(typeEffect, 100); 
        } else if (charIndex === fullText.length) { 
            isDeleting = true; 
            setTimeout(typeEffect, 2000); 
        } else if (charIndex === 0) { 
            isDeleting = false; 
            setTimeout(typeEffect, 500); 
        } 
    } 
    typeEffect(); 

    const mobileMenuBtn = document.getElementById('mobileMenuBtn'); 
    const mobileMenu = document.getElementById('mobileMenu'); 
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link'); 

    if(mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => { 
            mobileMenu.classList.toggle('active'); 
            const icon = mobileMenuBtn.querySelector('i');
            if(mobileMenu.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        }); 

        mobileNavLinks.forEach(link => { 
            link.addEventListener('click', () => { 
                mobileMenu.classList.remove('active'); 
                mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
            }); 
        }); 
    }

    const themeToggle = document.getElementById('themeToggle'); 
    if(themeToggle) {
        const themeIcon = themeToggle.querySelector('i'); 
        const body = document.body; 

        if (localStorage.getItem('theme') === 'dark') { 
            body.classList.add('dark-mode'); 
            themeIcon.classList.replace('fa-moon', 'fa-sun'); 
        } 

        themeToggle.addEventListener('click', () => { 
            body.classList.toggle('dark-mode'); 
            if (body.classList.contains('dark-mode')) { 
                themeIcon.classList.replace('fa-moon', 'fa-sun'); 
                localStorage.setItem('theme', 'dark'); 
            } else { 
                themeIcon.classList.replace('fa-sun', 'fa-moon'); 
                localStorage.setItem('theme', 'light'); 
            } 
        }); 
    }

    const backToTop = document.getElementById('backToTop'); 
    if(backToTop) {
        window.addEventListener('scroll', () => { 
            backToTop.classList.toggle('visible', window.scrollY > 1); 
        }); 

        backToTop.addEventListener('click', () => { 
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
        }); 
    }

    const sections = document.querySelectorAll('section'); 
    const navLinks = document.querySelectorAll('.nav-link-custom'); 

    window.addEventListener('scroll', () => { 
        let current = ''; 
        sections.forEach(section => { 
            if (window.scrollY >= section.offsetTop - 200) { 
                current = section.id; 
            } 
        }); 
        navLinks.forEach(link => { 
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`); 
        }); 
    }); 

    const slider = document.getElementById('projectsSlider'); 
    const slides = document.querySelectorAll('.slide'); 
    const prevBtn = document.getElementById('sliderPrev'); 
    const nextBtn = document.getElementById('sliderNext'); 
    const dotsContainer = document.getElementById('sliderDots'); 

    if(slider && slides.length > 0) {
        let currentSlide = 0; 
        const totalSlides = slides.length; 
        let autoSlideInterval; 

        slides.forEach((_, index) => { 
            const dot = document.createElement('button'); 
            dot.className = `slider-dot${index === 0 ? ' active' : ''}`; 
            dot.style.width = '12px';
            dot.style.height = '12px';
            dot.style.borderRadius = '50%';
            dot.style.border = 'none';
            dot.style.backgroundColor = index === 0 ? 'var(--violet-dark)' : '#ccc';
            dot.style.transition = 'all 0.3s';
            dot.style.cursor = 'pointer';

            dot.addEventListener('click', () => goToSlide(index)); 
            dotsContainer.appendChild(dot); 
        }); 

        const dots = dotsContainer.querySelectorAll('button'); 

        function updateSlider() { 
            slider.style.transform = `translateX(-${currentSlide * 100}%)`; 
            dots.forEach((dot, i) => {
                if(i === currentSlide) {
                    dot.style.backgroundColor = 'var(--violet-dark)';
                    dot.style.transform = 'scale(1.2)';
                } else {
                    dot.style.backgroundColor = '#ccc';
                    dot.style.transform = 'scale(1)';
                }
            }); 
        } 

        function goToSlide(index) { 
            currentSlide = index; 
            updateSlider(); 
            resetAutoSlide(); 
        } 

        function nextSlide() { 
            currentSlide = (currentSlide + 1) % totalSlides; 
            updateSlider(); 
        } 

        function prevSlide() { 
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; 
            updateSlider(); 
        } 

        function startAutoSlide() { 
            autoSlideInterval = setInterval(nextSlide, 5000); 
        } 

        function resetAutoSlide() { 
            clearInterval(autoSlideInterval); 
            startAutoSlide(); 
        } 

        if(prevBtn) {
            prevBtn.addEventListener('click', () => { 
                prevSlide(); 
                resetAutoSlide(); 
            }); 
        }

        if(nextBtn) {
            nextBtn.addEventListener('click', () => { 
                nextSlide(); 
                resetAutoSlide(); 
            }); 
        }

        startAutoSlide(); 
    }

    const contactForm = document.getElementById('contactForm'); 
    const nameInput = document.getElementById('name'); 
    const emailInput = document.getElementById('email'); 
    const subjectInput = document.getElementById('subject'); 
    const messageInput = document.getElementById('message'); 
    const nameError = document.getElementById('nameError'); 
    const emailError = document.getElementById('emailError'); 
    const subjectError = document.getElementById('subjectError'); 
    const messageError = document.getElementById('messageError'); 
    const badWords = ['fuck', 'shit', 'bitch', 'asshole', 'damn', 'hell', 'piss', 'cunt', 'dick', 'cock']; 

    function validateField(input, error, minLength, regex = null, emptyMsg, invalidMsg) { 
        if(!input) return true;
        const value = input.value.trim(); 
        if (value === '') { 
            input.classList.add('error'); 
            error.textContent = emptyMsg; 
            return false; 
        } else if (value.length < minLength) { 
            input.classList.add('error'); 
            error.textContent = invalidMsg; 
            return false; 
        } else if (regex && !regex.test(value)) { 
            input.classList.add('error'); 
            error.textContent = invalidMsg; 
            return false; 
        } 
        input.classList.remove('error'); 
        error.textContent = ''; 
        return true; 
    } 

    function checkMessageContent() { 
        if(!messageInput) return true;
        const message = messageInput.value.trim().toLowerCase(); 
        let hasBadWord = false; 
        badWords.forEach(word => { 
            if (message.includes(word)) { 
                hasBadWord = true; 
            } 
        }); 
        if (hasBadWord) { 
            messageError.textContent = 'This message contains inappropriate words.'; 
            messageInput.classList.add('error'); 
        } else if (message.length < 20) { 
            messageError.textContent = 'Message must be at least 20 characters.'; 
            messageInput.classList.add('error'); 
        } else { 
            messageError.textContent = ''; 
            messageInput.classList.remove('error'); 
        } 
    } 

    const validateName = () => validateField(nameInput, nameError, 3, null, 'Please enter your name', 'Name must be at least 3 characters'); 
    const validateEmail = () => validateField(emailInput, emailError, 0, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter your email', 'Please enter a valid email'); 
    const validateSubject = () => validateField(subjectInput, subjectError, 5, null, 'Please enter a subject', 'Subject must be at least 5 characters'); 
    const validateMessage = () => checkMessageContent(); 

    [nameInput, emailInput, subjectInput, messageInput].forEach(input => { 
        if(input){
            input.addEventListener('blur', () => { 
                if (input.id === 'name') validateName(); 
                else if (input.id === 'email') validateEmail(); 
                else if (input.id === 'subject') validateSubject(); 
                else if (input.id === 'message') validateMessage(); 
            }); 
            input.addEventListener('input', () => { 
                if (input.classList.contains('error')) { 
                    if (input.id === 'name') validateName(); 
                    else if (input.id === 'email') validateEmail(); 
                    else if (input.id === 'subject') validateSubject(); 
                    else if (input.id === 'message') validateMessage(); 
                } 
            }); 
        }
    }); 

    try {
        emailjs.init("t_ZawgnHgz2uGWUOx");  
    } catch(e) {}

    if(contactForm) {
        contactForm.addEventListener('submit', e => { 
            e.preventDefault(); 

            validateName(); 
            validateEmail(); 
            validateSubject(); 
            validateMessage();

            const formData = { 
                name: nameInput.value.trim(), 
                email: emailInput.value.trim(), 
                subject: subjectInput.value.trim(), 
                message: messageInput.value.trim() 
            }; 

            emailjs.send("service_2ui6c33", "template_ryq0ps7", { 
                from_name: formData.name, 
                from_email: formData.email, 
                subject: formData.subject, 
                message: formData.message 
            }).then(() => { 
                showNotification('Message sent successfully!', 'success'); 
                contactForm.reset(); 
            }, () => { 
                showNotification('Failed to send message. Please try again.', 'error'); 
            }); 
        }); 
    }

    function showNotification(message, type) { 
        document.querySelectorAll('.notification').forEach(n => n.remove()); 

        const notification = document.createElement('div'); 
        notification.className = `notification notification-${type}`; 
        notification.innerHTML = `<div class="notification-content"><i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i><span>${message}</span></div>`; 
        notification.style = `position: fixed; top: 100px; left: 50%; transform: translateX(-50%); background: ${type === 'success' ? '#28a745' : '#dc3545'}; color: white; padding: 1rem 2rem; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); z-index: 10001; animation: slideDown 0.3s ease;`; 

        const style = document.createElement('style'); 
        style.textContent = `@keyframes slideDown { from { opacity: 0; transform: translateX(-50%) translateY(-20px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }`; 
        document.head.appendChild(style); 

        document.body.appendChild(notification); 

        setTimeout(() => { 
            notification.style.animation = 'slideDown 0.3s ease reverse'; 
            setTimeout(() => notification.remove(), 300); 
        }, 5000); 
    } 

});