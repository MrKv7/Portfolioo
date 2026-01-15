// Modern Portfolio JavaScript - Enhanced Version

// Google Analytics Event Tracking Helper
function trackEvent(category, action, label, value) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label,
            'value': value
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Service Selection Cards
    const serviceSelectionCards = document.querySelectorAll('.service-selection-card');
    const selectedServicesInput = document.getElementById('selectedServices');
    
    // Modal Elements
    const serviceRequestModal = document.getElementById('serviceRequestModal');
    const documentViewerModal = document.getElementById('documentViewerModal');
    const modalCloseButtons = document.querySelectorAll('.modal .close');
    const requestServicesBtn = document.getElementById('requestServicesBtn');
    
    console.log("Service request modal:", serviceRequestModal);
    console.log("Document viewer modal:", documentViewerModal);
    console.log("Modal close buttons found:", modalCloseButtons.length);
    console.log("Request services button:", requestServicesBtn);
    
    // Budget Selection
    const budgetOptions = document.querySelectorAll('.budget-option');
    const selectedBudgetInput = document.getElementById('selectedBudget');
    
    console.log("Budget options found:", budgetOptions.length);
    console.log("Selected budget input:", selectedBudgetInput);
    
    // Add event listeners to service buttons
    const serviceButtons = document.querySelectorAll('.service-btn');
    console.log("Service buttons found:", serviceButtons.length);
    serviceButtons.forEach((button, index) => {
        console.log("Adding click listener to service button", index);
        button.addEventListener('click', function() {
            console.log("Service button clicked");
            const serviceCard = this.closest('.service-card');
            const serviceName = serviceCard.querySelector('.service-title').textContent.trim();
            const price = serviceCard.querySelector('.price-amount').textContent;
            
            // Track service button clicks
            trackEvent('Service', 'click', serviceName, parseFloat(price.replace(/[^\d.-]/g, '')));
            
            console.log("Service selected:", serviceName, price);
            
            // Show notification
            createNotification(`Added ${serviceName} (${price}) to your order!`);
            
            // Open service request modal and pre-select the service
            if (serviceRequestModal) {
                serviceRequestModal.style.display = 'block';
                
                // Pre-select the service that was clicked
                setTimeout(() => {
                    serviceSelectionCards.forEach(card => {
                        // Map service names to match the selection cards
                        let mappedServiceName = serviceName;
                        if (serviceName.includes("Discord Bot Development")) {
                            mappedServiceName = "Discord Bot Development";
                        } else if (serviceName.includes("Discord Server Moderation")) {
                            mappedServiceName = "Discord Server Moderation";
                        } else if (serviceName.includes("Entire Webpage Design")) {
                            mappedServiceName = "Webpage Design";
                        } else if (serviceName.includes("Full-stack Web Development")) {
                            mappedServiceName = "Webpage Development";
                        } else if (serviceName.includes("Make Your Graphic Design")) {
                            mappedServiceName = "Graphic Design";
                        } else if (serviceName.includes("Make Your Video Editing")) {
                            mappedServiceName = "Video Editing";
                        }
                        
                        console.log("Checking card:", card.dataset.service, "against mapped name:", mappedServiceName);
                        
                        if (card.dataset.service === mappedServiceName) {
                            console.log("Matching card found, selecting it");
                            card.classList.add('selected');
                            updateSelectedServices();
                        }
                    });
                }, 100);
            }
        });
    });
    
    // Request Services button event listener
    if (requestServicesBtn) {
        requestServicesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (serviceRequestModal) {
                serviceRequestModal.style.display = 'block';
            }
        });
    }
    
    // Navigation Request Services button event listener
    const navRequestServicesBtn = document.getElementById('navRequestServicesBtn');
    if (navRequestServicesBtn) {
        navRequestServicesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (serviceRequestModal) {
                serviceRequestModal.style.display = 'block';
            }
        });
    }
    
    // Modal close functionality
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                
                // Clear service selections when closing
                if (modal.id === 'serviceRequestModal') {
                    document.querySelectorAll('.service-selection-card.selected').forEach(element => {
                        element.classList.remove('selected');
                    });
                    
                    document.getElementById('selectedServices').value = '';
                    
                    // Check if budget element exists before clearing it
                    const budgetElement = document.getElementById('selectedBudget');
                    if (budgetElement) {
                        budgetElement.value = '';
                    }
                }
            }
        });
    });
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(e) {
        if (serviceRequestModal && e.target === serviceRequestModal) {
            serviceRequestModal.style.display = 'none';
            
            // Clear service selections
            document.querySelectorAll('.service-selection-card.selected').forEach(element => {
                element.classList.remove('selected');
            });
            
            document.getElementById('selectedServices').value = '';
            
            // Check if budget element exists before clearing it
            const budgetElement = document.getElementById('selectedBudget');
            if (budgetElement) {
                budgetElement.value = '';
            }
        }
        
        if (documentViewerModal && e.target === documentViewerModal) {
            documentViewerModal.style.display = 'none';
        }
    });
    
    // Service selection card functionality
    console.log("Service selection cards found:", serviceSelectionCards.length);
    serviceSelectionCards.forEach((card, index) => {
        console.log("Adding click listener to service card", index, card.dataset.service);
        card.addEventListener('click', function() {
            console.log("Service card clicked:", this.dataset.service);
            this.classList.toggle('selected');
            updateSelectedServices();
        });
    });
    
    // Budget selection functionality
    if (budgetOptions.length > 0) {
        budgetOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove selected class from all options
                budgetOptions.forEach(opt => opt.classList.remove('selected'));
                
                // Add selected class to clicked option
                this.classList.add('selected');
                
                // Update hidden input value
                const budgetElement = document.getElementById('selectedBudget');
                if (budgetElement) {
                    budgetElement.value = this.dataset.budget;
                }
            });
        });
    }
    
    function updateSelectedServices() {
        const selectedCards = document.querySelectorAll('.service-selection-card.selected');
        const selectedServices = [];
        
        console.log("Updating selected services. Currently selected:", selectedCards.length);
        
        selectedCards.forEach(card => {
            selectedServices.push(card.dataset.service);
            console.log("Adding service to selected list:", card.dataset.service);
        });
        
        selectedServicesInput.value = selectedServices.join(', ');
        console.log("Selected services input updated:", selectedServicesInput.value);
    }
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            // Track navigation clicks
            const linkText = link.textContent.trim();
            trackEvent('Navigation', 'click', linkText);
            
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            // Track anchor link clicks
            trackEvent('Anchor Link', 'click', targetId.replace('#', ''));
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const serviceRequestForm = document.getElementById('serviceRequestForm');
    const contactForm = document.getElementById('contactForm');
    
    console.log("Service request form element:", serviceRequestForm);
    
    if (serviceRequestForm) {
        console.log("Adding submit event listener to service request form");
        serviceRequestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            console.log("Form submission triggered");
            
            // Get form data
            const name = document.getElementById('userName').value;
            const email = document.getElementById('userEmail').value;
            const whatsapp = document.getElementById('whatsapp').value;
            const message = document.getElementById('serviceMessage').value;
            
            // Check if budget element exists before accessing it
            const budgetElement = document.getElementById('selectedBudget');
            const budget = budgetElement ? budgetElement.value : '';
            
            const deadline = document.getElementById('deadline').value;
            const selectedServices = document.getElementById('selectedServices').value;
            
            console.log("Form data collected:", { name, email, whatsapp, budget, message, deadline, selectedServices });
            
            // Validate required fields
            if (!selectedServices) {
                createNotification('Please select at least one service!');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !emailRegex.test(email)) {
                createNotification('Please enter a valid email address!');
                return;
            }
            
            // Show loading state
            const submitBtn = serviceRequestForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Order...';
            submitBtn.disabled = true;
            
            // Show processing message with countdown
            showOrderProcessingMessage(3);
            
            // Prepare data for PDF generation
            const formData = {
                name,
                email,
                whatsapp,
                budget,
                selectedServices,
                message,
                deadline,
                timestamp: new Date().toLocaleString(),
                userAgent: navigator.userAgent
            };
            
            // Generate PDF and send to Telegram
            generateOrderPDF(formData)
                .then(pdfBlob => {
                    // Send to Telegram
                    return sendOrderToTelegram(formData, pdfBlob);
                })
                .then(result => {
                    // Show success message with animation
                    createNotification(`Order Is Done! Thank you ${name}. We'll contact you at ${email} shortly.`);
                    
                    // Offer to send PDF to WhatsApp if user provided WhatsApp number
                    if (whatsapp) {
                        setTimeout(() => {
                            showWhatsAppOption(whatsapp, name);
                        }, 2000);
                    }
                    
                    // Reset form
                    serviceRequestForm.reset();
                    
                    // Clear service selections
                    document.querySelectorAll('.service-selection-card.selected').forEach(element => {
                        element.classList.remove('selected');
                    });
                    
                    // Check if budget element exists before clearing it
                    if (budgetElement) {
                        budgetElement.value = '';
                    }
                    
                    document.getElementById('selectedServices').value = '';
                })
                .catch((error) => {
                    console.error('Error submitting form:', error);
                    createNotification('Error submitting form. Please try again.');
                })
                .finally(() => {
                    // Restore button state
                    if (submitBtn) {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }
                });
        });
    } else {
        console.log("Service request form not found!");
    }
    
    if (contactForm) {
        console.log('Contact form found and event listener attached');
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Contact form submitted');
            
            // Track form submission attempt
            trackEvent('Contact Form', 'submit_attempt', 'Contact Page');
            
            // Get form data
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const contactNumber = document.getElementById('contactNumber').value;
            const message = document.getElementById('message').value;
            
            console.log('Form data collected:', { fullName, email, contactNumber, message });
            console.log('Data types:', {
                fullName: typeof fullName,
                email: typeof email,
                contactNumber: typeof contactNumber,
                message: typeof message
            });
            
            // Validate form data
            if (!fullName || !email || !contactNumber || !message) {
                createNotification('Please fill in all required fields!');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                createNotification('Please enter a valid email address!');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Prepare data for PDF generation
            const formData = {
                fullName,
                email,
                contactNumber,
                message,
                timestamp: new Date().toLocaleString(),
                userAgent: navigator.userAgent
            };
            
            console.log('Contact form submitted:', formData);
            console.log('FormData details:', {
                hasFullName: !!formData.fullName,
                hasEmail: !!formData.email,
                hasContactNumber: !!formData.contactNumber,
                hasMessage: !!formData.message,
                fullNameLength: formData.fullName?.length || 0,
                messageLength: formData.message?.length || 0
            });
            
            // Generate PDF
            console.log('Calling generateContactPDF...');
            generateContactPDF(formData)
                .then(pdfBlob => {
                    // Create filename with full name
                    const sanitizedName = formData.fullName.replace(/[^a-zA-Z0-9]/g, '_');
                    const filename = `contact_${sanitizedName}_${Date.now()}.pdf`;
                    
                    // Save PDF to server first
                    return savePDFToserver(pdfBlob, filename)
                        .then(saveResult => {
                            console.log('PDF saved to server:', saveResult);
                            // Then send to Telegram
                            return sendToTelegram(formData, pdfBlob);
                        });
                })
                .then(result => {
                    // Show success message
                    createNotification(`Thank you ${fullName}! Your message has been sent But Not receive To The Admin Right Now. Please Contact Him VIa Whatsapp By ${contactNumber}. If He Receive Your Message He Will contact you at ${email} shortly.`);
                    
                    // Track successful contact form submission
                    trackEvent('Contact Form', 'submit_success', 'Contact Page');
                    
                    // Reset form
                    contactForm.reset();
                })
                .catch(error => {
                    console.error('Error processing contact form:', error);
                    createNotification('Sorry, there was an error sending your message. Please try again.');
                })
                .finally(() => {
                    // Restore button state
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
    
    // Enhanced animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .credential-item, .glass-card');
        
        elements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                // Add staggered delay for better visual effect
                setTimeout(() => {
                    element.style.opacity = "1";
                    element.style.transform = "translateY(0)";
                }, index * 100);
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.service-card, .credential-item, .glass-card').forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition = "opacity 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    });
    
    // Trigger animations on scroll with debounce for performance
    window.addEventListener('scroll', debounce(animateOnScroll, 10));
    
    // Trigger once on load
    setTimeout(animateOnScroll, 300);
    
    // Enhanced section animations
    const sections = document.querySelectorAll('.section');
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    function animateSections() {
        sections.forEach((section, index) => {
            const sectionPosition = section.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (sectionPosition < screenPosition) {
                // Add staggered delay for better visual effect
                setTimeout(() => {
                    section.classList.add('visible');
                }, index * 200);
            }
        });
        
        sectionHeaders.forEach((header, index) => {
            const headerPosition = header.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (headerPosition < screenPosition) {
                // Add staggered delay for better visual effect
                setTimeout(() => {
                    header.classList.add('visible');
                }, index * 150);
            }
        });
    }
    
    // Trigger section animations on scroll with debounce
    window.addEventListener('scroll', debounce(animateSections, 10));
    
    // Trigger once on load with delay for better entrance effect
    setTimeout(animateSections, 500);
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
            header.style.background = 'rgba(15, 23, 42, 0.98)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'transparent';
        }
    });
    
    // Add pop-in animation to hero elements
    const heroElements = document.querySelectorAll('.animate-pop-in');
    heroElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Enhanced service card hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05)';
            this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
    });
    
    // Pricing card hover effect
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('popular')) {
                this.style.transform = 'translateY(-15px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('popular')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Initialize animations
    initializeAnimations();
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    });
    
    // Enhanced interactive effects to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotate(15deg) scale(1.1)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });
    });
    
    // Enhanced interactive effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        });
    });
    
    // Add ripple effect to buttons
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });
    
    // Modal functionality is already handled above in the existing implementation
    
    // Add Google Analytics tracking to social media links
    const footerSocialLinks = document.querySelectorAll('.social-link');
    footerSocialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const socialPlatform = this.href.includes('github') ? 'GitHub' :
                                 this.href.includes('facebook') ? 'Facebook' :
                                 this.href.includes('discord') ? 'Discord' :
                                 this.href.includes('whatsapp') ? 'WhatsApp' : 'Other';
            
            trackEvent('Social Media', 'click', socialPlatform);
        });
    });
    
    // Track page view duration
    let pageStartTime = Date.now();
    window.addEventListener('beforeunload', function() {
        const timeSpent = Math.round((Date.now() - pageStartTime) / 1000);
        trackEvent('Page', 'time_spent', window.location.pathname, timeSpent);
    });
    
    // Track window visibility changes
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            trackEvent('Page', 'blur', window.location.pathname);
        } else {
            trackEvent('Page', 'focus', window.location.pathname);
        }
    });
});

// Initialize animations
function initializeAnimations() {
    // Add staggered animations to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });
    
    // Add staggered animations to pricing cards
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 500 + (index * 150));
    });
}

// Create notification function
function createNotification(message) {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <p>${message}</p>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Close button event
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Create ripple effect
function createRipple(event, element) {
    const circle = document.createElement("span");
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - element.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - element.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple");
    
    const ripple = element.getElementsByClassName("ripple")[0];
    if (ripple) {
        ripple.remove();
    }
    
    element.appendChild(circle);
}

// Debounce function for scroll events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Add typing effect to hero subtitle
document.addEventListener('DOMContentLoaded', function() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, 50);
    }
});

// Add particle effect to background
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        // Create canvas for particle effect
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-1';
        hero.appendChild(canvas);
        
        // Initialize particle system
        initParticles(canvas);
    }
});

function initParticles(canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 100;
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            speed: Math.random() * 0.5 + 0.1,
            direction: Math.random() * Math.PI * 2
        });
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            // Update position
            particle.x += Math.cos(particle.direction) * particle.speed;
            particle.y += Math.sin(particle.direction) * particle.speed;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > canvas.width) {
                particle.direction = Math.PI - particle.direction;
            }
            if (particle.y < 0 || particle.y > canvas.height) {
                particle.direction = -particle.direction;
            }
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });
}

// Function to generate PDF with service request details
function generateServiceRequestPDF(data) {
    // Check if jsPDF is available
    let jsPDFLib = null;
    
    // Try different ways to access jsPDF based on how it's loaded
    if (typeof jspdf !== 'undefined' && jspdf.jsPDF) {
        jsPDFLib = jspdf.jsPDF;
        console.log("jsPDF found in jspdf.jsPDF");
    } else if (typeof jsPDF !== 'undefined') {
        jsPDFLib = jsPDF;
        console.log("jsPDF found in jsPDF");
    } else if (typeof window.jsPDF !== 'undefined') {
        jsPDFLib = window.jsPDF;
        console.log("jsPDF found in window.jsPDF");
    } else if (typeof window.jspdf !== 'undefined' && window.jspdf.jsPDF) {
        jsPDFLib = window.jspdf.jsPDF;
        console.log("jsPDF found in window.jspdf.jsPDF");
    }
    
    if (!jsPDFLib) {
        console.error('jsPDF library not loaded - trying alternative approach');
        // Try to access the global jsPDF object directly
        if (window.jspdf && typeof window.jspdf === 'object') {
            // Try to find jsPDF in the jspdf object
            for (let key in window.jspdf) {
                if (typeof window.jspdf[key] === 'function' && key.includes('PDF')) {
                    jsPDFLib = window.jspdf[key];
                    console.log("jsPDF found in jspdf." + key);
                    break;
                }
            }
        }
    }
    
    if (!jsPDFLib) {
        console.error('jsPDF library not loaded - all methods exhausted');
        // Show error message to user
        createNotification('Error generating PDF. Please try again.');
        return;
    }
    
    try {
        // Create new PDF document
        const doc = new jsPDFLib();
        
        // Set document properties
        doc.setProperties({
            title: "Service Request - " + data.name,
            subject: "Service Request Details",
            author: "its Kv7 Portfolio",
            keywords: "service, request, portfolio",
            creator: "its Kv7 Portfolio Website"
        });
        
        // Add header
        doc.setFontSize(22);
        doc.setTextColor(37, 99, 235); // Primary blue color
        doc.text("Service Request", 105, 20, null, null, "center");
        
        // Add company info
        doc.setFontSize(12);
        doc.setTextColor(15, 23, 42); // Dark color
        doc.text("its Kv7 | Kavindu Nilanga Lyr", 105, 30, null, null, "center");
        doc.text("Service Request Form", 105, 37, null, null, "center");
        
        // Add date
        const currentDate = new Date().toLocaleDateString();
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("Generated on: " + currentDate, 105, 45, null, null, "center");
        
        // Add separator line
        doc.setDrawColor(37, 99, 235);
        doc.line(20, 50, 190, 50);
        
        // Add customer details section
        doc.setFontSize(16);
        doc.setTextColor(37, 99, 235);
        doc.text("Customer Details", 20, 65);
        
        // Add separator line
        doc.setDrawColor(200);
        doc.line(20, 70, 190, 70);
        
        // Add customer information
        doc.setFontSize(12);
        doc.setTextColor(15, 23, 42);
        
        let yPos = 80;
        doc.text("Name: " + data.name, 20, yPos);
        yPos += 10;
        doc.text("Email: " + data.email, 20, yPos);
        yPos += 10;
        doc.text("WhatsApp: " + data.whatsapp, 20, yPos);
        yPos += 10;
        
        if (data.budget) {
            doc.text("Budget: " + data.budget, 20, yPos);
            yPos += 10;
        }
        
        if (data.deadline) {
            doc.text("Expected Deadline: " + data.deadline, 20, yPos);
            yPos += 10;
        }
        
        // Add services section
        doc.setFontSize(16);
        doc.setTextColor(37, 99, 235);
        doc.text("Selected Services", 20, yPos + 10);
        yPos += 20;
        
        // Add separator line
        doc.setDrawColor(200);
        doc.line(20, yPos - 5, 190, yPos - 5);
        
        // Add selected services
        doc.setFontSize(12);
        doc.setTextColor(15, 23, 42);
        doc.text(data.selectedServices, 20, yPos);
        yPos += 15;
        
        // Add message section
        doc.setFontSize(16);
        doc.setTextColor(37, 99, 235);
        doc.text("Project Details", 20, yPos + 5);
        yPos += 15;
        
        // Add separator line
        doc.setDrawColor(200);
        doc.line(20, yPos - 5, 190, yPos - 5);
        
        // Add project details
        doc.setFontSize(12);
        doc.setTextColor(15, 23, 42);
        
        // Split message into lines that fit the page
        const splitMessage = doc.splitTextToSize(data.message, 170);
        doc.text(splitMessage, 20, yPos);
        
        // Add footer
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(10);
            doc.setTextColor(150);
            doc.text("Page " + i + " of " + pageCount, 105, 285, null, null, "center");
            doc.text("Confidential - Generated by its Kv7 Portfolio", 105, 290, null, null, "center");
        }
        
        // Generate filename
        const fileName = "Service_Request_" + data.name.replace(/\s+/g, '_') + "_" + 
                         new Date().toISOString().slice(0, 10) + ".pdf";
        
        // Save PDF (in a real implementation, this would be sent to a server)
        doc.save(fileName);
        
        // Note: In a real-world scenario, you would send the PDF to a server endpoint
        // to save it in the Orderpdf folder. This requires backend implementation.
        console.log("PDF generated and would be saved to Orderpdf folder in a real implementation");
    } catch (error) {
        console.error('Error generating PDF:', error);
        createNotification('Error generating PDF. Please try again.');
    }
}

// Generate PDF from order form data
function generateOrderPDF(formData) {
    return new Promise((resolve, reject) => {
        try {
            // Create PDF document
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Set font and styling
            doc.setFont('helvetica');
            
            // Add header
            doc.setFontSize(22);
            doc.setTextColor(37, 99, 235);
            doc.text('Service Order Request', 20, 20);
            
            // Add company info
            doc.setFontSize(16);
            doc.setTextColor(15, 23, 42);
            doc.text('its Kv7 | Kavindu Nilanga Lyr', 20, 35);
            doc.setFontSize(12);
            doc.text('Service Request Form', 20, 45);
            
            // Add separator line
            doc.setDrawColor(37, 99, 235);
            doc.line(20, 50, 190, 50);
            
            // Add form data
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            
            let yPos = 65;
            
            // Customer Details Section
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(37, 99, 235);
            doc.text('Customer Details:', 20, yPos);
            yPos += 10;
            
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(0, 0, 0);
            
            // Name
            doc.setFont('helvetica', 'bold');
            doc.text('Name:', 25, yPos);
            doc.setFont('helvetica', 'normal');
            doc.text(formData.name, 50, yPos);
            yPos += 10;
            
            // Email
            if (formData.email) {
                doc.setFont('helvetica', 'bold');
                doc.text('Email:', 25, yPos);
                doc.setFont('helvetica', 'normal');
                doc.text(formData.email, 50, yPos);
                yPos += 10;
            }
            
            // WhatsApp
            if (formData.whatsapp) {
                doc.setFont('helvetica', 'bold');
                doc.text('WhatsApp:', 25, yPos);
                doc.setFont('helvetica', 'normal');
                doc.text(formData.whatsapp, 50, yPos);
                yPos += 15;
            } else {
                yPos += 5;
            }
            
            // Service Details Section
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(37, 99, 235);
            doc.text('Service Details:', 20, yPos);
            yPos += 10;
            
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(0, 0, 0);
            
            // Selected Services
            doc.setFont('helvetica', 'bold');
            doc.text('Services:', 25, yPos);
            yPos += 8;
            
            doc.setFont('helvetica', 'normal');
            const services = formData.selectedServices.split(',').map(s => s.trim());
            services.forEach(service => {
                doc.text(`• ${service}`, 30, yPos);
                yPos += 7;
            });
            
            yPos += 5;
            
            // Budget
            if (formData.budget) {
                doc.setFont('helvetica', 'bold');
                doc.text('Budget:', 25, yPos);
                doc.setFont('helvetica', 'normal');
                doc.text(formData.budget, 50, yPos);
                yPos += 10;
            }
            
            // Deadline
            if (formData.deadline) {
                doc.setFont('helvetica', 'bold');
                doc.text('Deadline:', 25, yPos);
                doc.setFont('helvetica', 'normal');
                doc.text(formData.deadline, 50, yPos);
                yPos += 15;
            } else {
                yPos += 5;
            }
            
            // Message Section
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(37, 99, 235);
            doc.text('Additional Message:', 20, yPos);
            yPos += 10;
            
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(0, 0, 0);
            
            if (formData.message) {
                const messageLines = doc.splitTextToSize(formData.message, 150);
                doc.text(messageLines, 25, yPos);
                yPos += messageLines.length * 7;
            } else {
                doc.text('No additional message provided.', 25, yPos);
                yPos += 10;
            }
            
            // Timestamp
            yPos += 15;
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text(`Submitted on: ${formData.timestamp}`, 20, yPos);
            
            // Save as blob
            const pdfBlob = doc.output('blob');
            resolve(pdfBlob);
            
        } catch (error) {
            console.error('Error generating order PDF:', error);
            reject(error);
        }
    });
}

// Send order data to Telegram
function sendOrderToTelegram(formData, pdfBlob) {
    return new Promise((resolve, reject) => {
        try {
            // Telegram Bot Token and Chat ID (you need to replace these)
            const BOT_TOKEN = '8241595280:AAGsz3wmbSn-pIZidVe8Nims3W5xBQAWYc8'; // Replace with your bot token
            const CHAT_ID = '6941188875'; // Replace with your chat ID
            
            // Create form data for Telegram
            const telegramData = new FormData();
            
            // Create text message
            let messageText = `
🔔 *New Service Order Received!*

`;
            
            messageText += `👤 *Customer:* ${formData.name}\n`;
            if (formData.email) messageText += `📧 *Email:* ${formData.email}\n`;
            if (formData.whatsapp) messageText += `📱 *WhatsApp:* ${formData.whatsapp}\n`;
            
            messageText += `\n💼 *Services Requested:*\n`;
            const services = formData.selectedServices.split(',').map(s => s.trim());
            services.forEach(service => {
                messageText += `• ${service}\n`;
            });
            
            if (formData.budget) messageText += `\n💰 *Budget:* ${formData.budget}\n`;
            if (formData.deadline) messageText += `📅 *Deadline:* ${formData.deadline}\n`;
            
            if (formData.message) {
                messageText += `\n💬 *Message:*\n${formData.message}\n`;
            }
            
            messageText += `\n⏰ *Time:* ${formData.timestamp}`;
            
            telegramData.append('chat_id', CHAT_ID);
            telegramData.append('text', messageText);
            telegramData.append('parse_mode', 'Markdown');
            
            // Send text message to Telegram
            fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                body: telegramData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Telegram API error: ${response.status}`);
                }
                return response.json();
            })
            .then(result => {
                console.log('Order message sent to Telegram:', result);
                
                // Send PDF file to Telegram
                const pdfData = new FormData();
                pdfData.append('chat_id', CHAT_ID);
                pdfData.append('document', pdfBlob, `service_order_${Date.now()}.pdf`);
                pdfData.append('caption', `Service order from ${formData.name}`);
                
                return fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
                    method: 'POST',
                    body: pdfData
                });
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Telegram file upload error: ${response.status}`);
                }
                return response.json();
            })
            .then(result => {
                console.log('Order PDF sent to Telegram:', result);
                resolve(result);
            })
            .catch(error => {
                console.error('Error sending order to Telegram:', error);
                // Even if Telegram fails, we still resolve since the form was processed
                resolve({ success: true, telegramError: error.message });
            });
            
        } catch (error) {
            console.error('Error in sendOrderToTelegram:', error);
            reject(error);
        }
    });
}

// Function to show order processing message with countdown
function showOrderProcessingMessage(seconds) {
    // Create processing message element
    const processingMessage = document.createElement('div');
    processingMessage.className = 'processing-message';
    processingMessage.innerHTML = `
        <div class="processing-content">
            <div class="processing-spinner"></div>
            <h3>Processing Your Order</h3>
            <p>Your order is being confirmed. Please wait...</p>
            <p class="countdown-text">Confirming in <span class="countdown-number">${seconds}</span> seconds</p>
        </div>
    `;
    
    // Add styles for the processing message
    const style = document.createElement('style');
    style.textContent = `
        .processing-message {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .processing-content {
            background: rgba(15, 23, 42, 0.95);
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.15);
        }
        
        .processing-content h3 {
            color: #fff;
            margin-bottom: 15px;
            font-size: 1.5rem;
        }
        
        .processing-content p {
            color: #cbd5e1;
            margin-bottom: 10px;
        }
        
        .countdown-text {
            font-weight: bold;
            font-size: 1.1rem;
            margin-top: 20px;
        }
        
        .countdown-number {
            color: #2563eb;
            font-size: 1.3rem;
        }
        
        .processing-spinner {
            width: 50px;
            height: 50px;
            border: 5px solid rgba(37, 99, 235, 0.3);
            border-top: 5px solid #2563eb;
            border-radius: 50%;
            margin: 0 auto 20px;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(processingMessage);
    
    // Start countdown
    let count = seconds;
    const countdownElement = processingMessage.querySelector('.countdown-number');
    
    const countdownInterval = setInterval(() => {
        count--;
        countdownElement.textContent = count;
        
        if (count <= 0) {
            clearInterval(countdownInterval);
            // Remove the processing message after countdown finishes
            setTimeout(() => {
                if (processingMessage.parentNode) {
                    processingMessage.parentNode.removeChild(processingMessage);
                    if (style.parentNode) {
                        style.parentNode.removeChild(style);
                    }
                }
            }, 500);
        }
    }, 1000);
}

// Function to show WhatsApp option after order confirmation
function showWhatsAppOption(whatsappNumber, userName) {
    // Create WhatsApp message element
    const whatsappMessage = document.createElement('div');
    whatsappMessage.className = 'whatsapp-message';
    whatsappMessage.innerHTML = `
        <div class="whatsapp-content glass-effect">
            <div class="whatsapp-header">
                <i class="fab fa-whatsapp whatsapp-icon"></i>
                <h3>Send Order Details to WhatsApp</h3>
            </div>
            <p>Hello ${userName}! Your order has been confirmed.</p>
            <p>Would you like to receive a copy of your order details via WhatsApp?</p>
            <div class="whatsapp-actions">
                <button class="btn btn-outline whatsapp-btn" id="sendToWhatsApp">
                    <i class="fab fa-whatsapp"></i> Send to WhatsApp
                </button>
                <button class="btn btn-secondary" id="cancelWhatsApp">Cancel</button>
            </div>
        </div>
    `;
    
    // Add styles for the WhatsApp message
    const style = document.createElement('style');
    style.textContent = `
        .whatsapp-message {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .whatsapp-content {
            background: rgba(15, 23, 42, 0.95);
            padding: 30px;
            border-radius: 20px;
            text-align: center;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.15);
        }
        
        .whatsapp-header {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
        }
        
        .whatsapp-header h3 {
            color: #fff;
            margin: 0;
            margin-left: 10px;
        }
        
        .whatsapp-icon {
            color: #25D366;
            font-size: 2rem;
        }
        
        .whatsapp-content p {
            color: #cbd5e1;
            margin-bottom: 15px;
        }
        
        .whatsapp-actions {
            display: flex;
            gap: 15px;
            margin-top: 20px;
            justify-content: center;
        }
        
        .whatsapp-btn {
            background: #25D366;
            border: none;
            color: white;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .whatsapp-btn:hover {
            background: #128C7E;
            transform: translateY(-2px);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @media (max-width: 576px) {
            .whatsapp-actions {
                flex-direction: column;
            }
            
            .whatsapp-actions button {
                width: 100%;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(whatsappMessage);
    
    // Add event listeners
    const sendBtn = whatsappMessage.querySelector('#sendToWhatsApp');
    const cancelBtn = whatsappMessage.querySelector('#cancelWhatsApp');
    
    sendBtn.addEventListener('click', () => {
        // Create WhatsApp message with order confirmation
        const message = `Hello, I'm ${userName}. I just placed an order for the following services: ${document.getElementById('selectedServices').value}. Please send me the order details. Thank you!`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
        
        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank');
        
        // Remove the message
        if (whatsappMessage.parentNode) {
            whatsappMessage.parentNode.removeChild(whatsappMessage);
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        }
    });
    
    cancelBtn.addEventListener('click', () => {
        // Remove the message
        if (whatsappMessage.parentNode) {
            whatsappMessage.parentNode.removeChild(whatsappMessage);
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        }
    });
}

// Generate PDF from contact form data
function generateContactPDF(formData) {
    return new Promise((resolve, reject) => {
        try {
            console.log('Starting PDF generation...');
            console.log('Window object keys:', Object.keys(window));
            console.log('jspdf available:', typeof window.jspdf);
            console.log('jsPDF available:', typeof window.jsPDF);
            
            // Check if jsPDF is available
            let jsPDFConstructor = null;
            
            // Try multiple ways to access jsPDF
            if (window.jspdf && window.jspdf.jsPDF) {
                jsPDFConstructor = window.jspdf.jsPDF;
                console.log('Using window.jspdf.jsPDF');
            } else if (window.jsPDF) {
                jsPDFConstructor = window.jsPDF;
                console.log('Using window.jsPDF');
            } else {
                console.error('jsPDF not found in window object');
                console.error('Available window properties:', Object.keys(window).filter(key => key.toLowerCase().includes('pdf')));
                reject(new Error('jsPDF library not loaded')); 
                return;
            }
            
            // Create PDF document
            const doc = new jsPDFConstructor();
            console.log('PDF document created successfully');
            
            // Set font and styling
            doc.setFont('helvetica');
            
            // Add header
            doc.setFontSize(20);
            doc.setTextColor(37, 99, 235);
            doc.text('Contact Form Submission', 20, 20);
            
            // Add separator line
            doc.setDrawColor(37, 99, 235);
            doc.line(20, 25, 190, 25);
            
            // Add form data
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            
            let yPos = 40;
            
            // Full Name
            doc.setFont('helvetica', 'bold');
            doc.text('Full Name:', 20, yPos);
            doc.setFont('helvetica', 'normal');
            doc.text(formData.fullName, 60, yPos);
            yPos += 10;
            
            // Email
            doc.setFont('helvetica', 'bold');
            doc.text('Email:', 20, yPos);
            doc.setFont('helvetica', 'normal');
            doc.text(formData.email, 60, yPos);
            yPos += 10;
            
            // Contact Number
            doc.setFont('helvetica', 'bold');
            doc.text('Contact Number:', 20, yPos);
            doc.setFont('helvetica', 'normal');
            doc.text(formData.contactNumber, 60, yPos);
            yPos += 15;
            
            // Message
            doc.setFont('helvetica', 'bold');
            doc.text('Message:', 20, yPos);
            yPos += 8;
            
            doc.setFont('helvetica', 'normal');
            const messageLines = doc.splitTextToSize(formData.message, 150);
            doc.text(messageLines, 20, yPos);
            yPos += messageLines.length * 7;
            
            // Timestamp
            yPos += 15;
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text(`Submitted on: ${formData.timestamp}`, 20, yPos);
            
            // Save as blob
            const pdfBlob = doc.output('blob');
            resolve(pdfBlob);
            
        } catch (error) {
            console.error('Error generating PDF:', error);
            reject(error);
        }
    });
}

// Save PDF to server
function savePDFToserver(pdfBlob, filename) {
    return new Promise((resolve, reject) => {
        console.log('Starting PDF server save for:', filename);
        
        const reader = new FileReader();
        reader.onload = function() {
            try {
                const arrayBuffer = this.result;
                const uint8Array = new Uint8Array(arrayBuffer);
                
                console.log('PDF converted to byte array, size:', uint8Array.length);
                
                fetch('/api/save-pdf?filename=' + encodeURIComponent(filename), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/pdf'
                    },
                    body: uint8Array
                })
                .then(async response => {
                    console.log('Server response status:', response.status);
                    
                    if (!response.ok) {
                        const errorText = await response.text();
                        console.error('Server error response:', errorText);
                        throw new Error(`Server error: ${response.status} - ${errorText}`);
                    }
                    
                    return response.json();
                })
                .then(result => {
                    console.log('✅ PDF saved to server successfully:', result);
                    resolve(result);
                })
                .catch(error => {
                    console.error('❌ Error saving PDF to server:', error);
                    // Don't reject - let the form submission continue even if server save fails
                    resolve({ success: false, error: error.message });
                });
            } catch (error) {
                console.error('Error in PDF save process:', error);
                resolve({ success: false, error: error.message });
            }
        };
        
        reader.onerror = function() {
            console.error('Failed to read PDF blob');
            reject(new Error('Failed to read PDF blob'));
        };
        
        reader.readAsArrayBuffer(pdfBlob);
    });
}

// Send data to Telegram
function sendToTelegram(formData, pdfBlob) {
    return new Promise((resolve, reject) => {
        try {
            // Telegram Bot Token and Chat ID - YOU MUST REPLACE THESE WITH YOUR ACTUAL VALUES
            const BOT_TOKEN = '8241595280:AAGsz3wmbSn-pIZidVe8Nims3W5xBQAWYc8'; // Replace with your actual bot token from @BotFather
            const CHAT_ID = '6941188875'; // Replace with your actual chat ID from @userinfobot
            
            // Create form data for Telegram
            const telegramData = new FormData();
            
            // Create text message
            const messageText = `
📥 *New Contact Form Submission*

👤 *Name:* ${formData.fullName}
📧 *Email:* ${formData.email}
📱 *Phone:* ${formData.contactNumber}

💬 *Message:*
${formData.message}

⏰ *Time:* ${formData.timestamp}
🖥️ *Browser:* ${formData.userAgent.substring(0, 50)}...
`;
            
            telegramData.append('chat_id', CHAT_ID);
            telegramData.append('text', messageText);
            telegramData.append('parse_mode', 'Markdown');
            
            // Send text message to Telegram
            fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                body: telegramData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Telegram API error: ${response.status}`);
                }
                return response.json();
            })
            .then(result => {
                console.log('Message sent to Telegram:', result);
                
                // Send PDF file to Telegram
                const pdfData = new FormData();
                pdfData.append('chat_id', CHAT_ID);
                // Create filename with full name for Telegram
                const telegramFilename = `contact_${formData.fullName.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.pdf`;
                pdfData.append('document', pdfBlob, telegramFilename);
                pdfData.append('caption', `Contact form submission from ${formData.fullName}\nFile: ${telegramFilename}`);
                
                return fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
                    method: 'POST',
                    body: pdfData
                });
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Telegram file upload error: ${response.status}`);
                }
                return response.json();
            })
            .then(result => {
                console.log('PDF sent to Telegram:', result);
                resolve(result);
            })
            .catch(error => {
                console.error('Error sending to Telegram:', error);
                // Even if Telegram fails, we still resolve since the form was processed
                resolve({ success: true, telegramError: error.message });
            });
            
        } catch (error) {
            console.error('Error in sendToTelegram:', error);
            reject(error);
        }
    });
}
