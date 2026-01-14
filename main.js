// Main JavaScript for ABC Active Breathing Course

// State management
let courseUnlocked = false;
let activeModal = null;
let activeSection = 'home';

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    setupScrollDetection();
});

// Initialize page state
function initializePage() {
    // Check if course is unlocked
    courseUnlocked = localStorage.getItem('course-unlocked') === 'true';
    
    if (courseUnlocked) {
        updateCourseState(true);
    }
    
    // Check initial scroll position
    handleScroll();
}

// Setup event listeners
function setupEventListeners() {
    // Navigation buttons
    const navButtons = document.querySelectorAll('[data-nav]');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const section = this.getAttribute('data-nav');
            scrollToSection(section);
        });
    });
    
    // Modal buttons
    const modalButtons = document.querySelectorAll('[data-modal]');
    modalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalType = this.getAttribute('data-modal');
            openModal(modalType);
        });
    });
    
    // Start course button
    const startCourseBtn = document.querySelector('.btn-start-course');
    if (startCourseBtn) {
        startCourseBtn.addEventListener('click', handleStartCourse);
    }
    
    // Intro video time update
    const introVideo = document.getElementById('intro-video');
    if (introVideo) {
        introVideo.addEventListener('timeupdate', handleIntroVideoTimeUpdate);
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Modal close
    const modalClose = document.getElementById('modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Modal overlay click
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }
}

// Setup scroll detection
function setupScrollDetection() {
    window.addEventListener('scroll', handleScroll);
}

// Handle scroll
function handleScroll() {
    const scrollPosition = window.scrollY + 100;
    
    const enrollSection = document.getElementById('enroll');
    const exercisesSection = document.getElementById('exercises');
    const findOutMoreSection = document.getElementById('find-out-more');
    
    let newActiveSection = 'home';
    
    if (enrollSection && scrollPosition >= enrollSection.offsetTop) {
        newActiveSection = 'enroll';
    } else if (exercisesSection && scrollPosition >= exercisesSection.offsetTop) {
        newActiveSection = 'exercises';
    } else if (findOutMoreSection && scrollPosition >= findOutMoreSection.offsetTop) {
        newActiveSection = 'find-out-more';
    }
    
    if (newActiveSection !== activeSection) {
        activeSection = newActiveSection;
        updateActiveNav(activeSection);
    }
}

// Update active navigation
function updateActiveNav(section) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const linkSection = link.getAttribute('data-nav');
        if (linkSection === section) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Scroll to section
function scrollToSection(section) {
    if (section === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    
    if (section === 'enroll') {
        openModal('enroll');
        return;
    }
    
    const targetSection = document.getElementById(section);
    if (targetSection) {
        const headerHeight = 80;
        const top = targetSection.offsetTop - headerHeight - 20;
        window.scrollTo({ top, behavior: 'smooth' });
    }
}

// Handle start course
function handleStartCourse() {
    localStorage.setItem('course-unlocked', 'true');
    courseUnlocked = true;
    updateCourseState(true);
    window.location.href = 'week-1.html';
}

// Update course state
function updateCourseState(unlocked) {
    const startBtn = document.querySelector('.btn-start-course');
    const unlockedMsg = document.querySelector('.course-unlocked-message');
    
    if (startBtn) {
        if (unlocked) {
            startBtn.innerHTML = '✅ GO TO WEEK 1';
            startBtn.onclick = () => window.location.href = 'week-1.html';
        } else {
            startBtn.innerHTML = '🚀 START COURSE';
        }
    }
    
    if (unlockedMsg) {
        unlockedMsg.style.display = unlocked ? 'block' : 'none';
    }
}

// Handle intro video time update
function handleIntroVideoTimeUpdate() {
    const video = document.getElementById('intro-video');
    if (video && video.duration) {
        const progress = (video.currentTime / video.duration) * 100;
        if (progress >= 90 && !courseUnlocked) {
            localStorage.setItem('course-unlocked', 'true');
            courseUnlocked = true;
            updateCourseState(true);
        }
    }
}

// Handle newsletter submit
async function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email')
    };
    
    const messageDiv = document.getElementById('newsletter-message');
    const submitBtn = form.querySelector('.newsletter-submit');
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'SUBMITTING...';
    
    // Simulate API call (since we don't have backend)
    setTimeout(() => {
        messageDiv.style.display = 'block';
        messageDiv.style.backgroundColor = '#d1fae5';
        messageDiv.style.color = '#065f46';
        messageDiv.textContent = 'Thank you for subscribing! (Demo mode - no actual submission)';
        
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'SUBMIT';
        
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }, 1000);
}

// Open modal
function openModal(type) {
    activeModal = type;
    const overlay = document.getElementById('modal-overlay');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    
    const titles = {
        contact: 'Contact Us',
        donate: 'Support Our Mission',
        enroll: 'Enroll in ABC Course'
    };
    
    const descriptions = {
        contact: "Have questions about the ABC Active Breathing Course? We'd love to hear from you!",
        donate: 'Your donation helps us provide free breathing courses to children and families in need.',
        enroll: 'Join our free 12-week online breathing course for children aged 7 and above.'
    };
    
    title.textContent = titles[type];
    body.innerHTML = getModalContent(type, descriptions[type]);
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Setup modal form handler
    const modalForm = body.querySelector('form');
    if (modalForm) {
        modalForm.addEventListener('submit', handleModalSubmit);
    }
}

// Close modal
function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    overlay.style.display = 'none';
    document.body.style.overflow = '';
    activeModal = null;
}

// Get modal content
function getModalContent(type, description) {
    let html = `<p class="text-gray-600 mb-6" style="color: #6b7280; margin-bottom: 1.5rem;">${description}</p><form id="modal-form">`;
    
    if (type === 'donate') {
        html += `
            <div class="form-group">
                <label class="form-label">Select Amount</label>
                <div class="donation-amounts">
                    ${['5', '10', '25', '50', '100', 'custom'].map(amount => `
                        <div class="amount-option" data-amount="${amount}">
                            ${amount === 'custom' ? 'Custom' : `£${amount}`}
                        </div>
                    `).join('')}
                </div>
                <input type="number" id="custom-amount" class="form-input" placeholder="Enter custom amount" style="display: none; margin-top: 0.5rem;" min="1">
            </div>
        `;
    }
    
    if (type === 'enroll') {
        html += `
            <div class="form-group">
                <label class="form-label">Parent/Guardian Name *</label>
                <input type="text" name="parentName" class="form-input" required>
            </div>
        `;
    }
    
    html += `
        <div class="form-group">
            <label class="form-label">${type === 'enroll' ? 'Email *' : 'Name *'}</label>
            <input type="${type === 'enroll' ? 'email' : 'text'}" name="${type === 'enroll' ? 'email' : 'name'}" class="form-input" required>
        </div>
    `;
    
    if (type === 'contact') {
        html += `
            <div class="form-group">
                <label class="form-label">Email *</label>
                <input type="email" name="email" class="form-input" required>
            </div>
            <div class="form-group">
                <label class="form-label">Subject *</label>
                <input type="text" name="subject" class="form-input" required>
            </div>
        `;
    }
    
    if (type === 'enroll') {
        html += `
            <div class="form-group">
                <label class="form-label">Child's Name *</label>
                <input type="text" name="childName" class="form-input" required>
            </div>
            <div class="form-group">
                <label class="form-label">Child's Age *</label>
                <input type="number" name="childAge" class="form-input" min="7" max="18" required>
            </div>
        `;
    }
    
    if (type === 'donate') {
        html += `
            <div class="form-group">
                <label class="form-label">Email *</label>
                <input type="email" name="email" class="form-input" required>
            </div>
        `;
    }
    
    html += `
        <div class="form-group">
            <label class="form-label">
                ${type === 'contact' ? 'Message *' : 'Additional Information (Optional)'}
            </label>
            <textarea name="message" class="form-textarea" ${type === 'contact' ? 'required' : ''}></textarea>
        </div>
        
        <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1.5rem;">
            <button type="button" class="btn-modal btn-modal-cancel" onclick="closeModal()">Cancel</button>
            <button type="submit" class="btn-modal btn-modal-submit">
                ${type === 'contact' ? 'Send Message' : type === 'donate' ? 'Proceed to Donate' : 'Submit Enrollment'}
            </button>
        </div>
    </form>`;
    
    // Add event listeners for donation amounts after inserting HTML
    setTimeout(() => {
        if (type === 'donate') {
            const amountOptions = document.querySelectorAll('.amount-option');
            const customInput = document.getElementById('custom-amount');
            
            amountOptions.forEach(option => {
                option.addEventListener('click', function() {
                    amountOptions.forEach(opt => opt.classList.remove('selected'));
                    this.classList.add('selected');
                    
                    if (this.getAttribute('data-amount') === 'custom') {
                        customInput.style.display = 'block';
                        customInput.required = true;
                    } else {
                        customInput.style.display = 'none';
                        customInput.required = false;
                    }
                });
            });
        }
    }, 0);
    
    return html;
}

// Handle modal form submit
function handleModalSubmit(e) {
    e.preventDefault();
    
    const body = document.getElementById('modal-body');
    const successMessages = {
        contact: "Thank you for contacting us. We'll get back to you soon.",
        donate: 'Your generous donation will help children learn healthy breathing habits.',
        enroll: "Thank you for enrolling! We'll send course details to your email shortly."
    };
    
    const successTitles = {
        contact: 'Message Sent!',
        donate: 'Thank You!',
        enroll: 'Enrollment Received!'
    };
    
    body.innerHTML = `
        <div style="text-align: center; padding: 2rem 0;">
            <div style="width: 64px; height: 64px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 2rem;">
                ✓
            </div>
            <h3 style="font-size: 1.25rem; font-weight: bold; color: #1f2937; margin-bottom: 0.5rem;">
                ${successTitles[activeModal]}
            </h3>
            <p style="color: #6b7280; margin-bottom: 1.5rem;">
                ${successMessages[activeModal]}
                <br><small>(Demo mode - no actual submission)</small>
            </p>
            <button onclick="closeModal()" class="btn-modal btn-modal-submit">Close</button>
        </div>
    `;
}

// Make closeModal available globally
window.closeModal = closeModal;
