// Main JavaScript for Little Flower Library Management System

document.addEventListener('DOMContentLoaded', function() {
    // Show loading progress bar on page load
    showLoadingProgress();
    
    // Initialize page entrance animations
    initPageEntranceAnimations();
    
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Auto-hide alerts after 5 seconds with fade animation
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(function(alert, index) {
        if (!alert.classList.contains('alert-permanent')) {
            alert.style.animationDelay = `${index * 0.1}s`;
            alert.classList.add('fade-in');
            setTimeout(function() {
                alert.classList.add('fade-out');
                setTimeout(function() {
                    const bsAlert = new bootstrap.Alert(alert);
                    bsAlert.close();
                }, 300);
            }, 5000);
        }
    });

    // Form validation
    const forms = document.querySelectorAll('.needs-validation');
    forms.forEach(function(form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });

    // Confirm dialogs for destructive actions
    const deleteButtons = document.querySelectorAll('[data-confirm-delete]');
    deleteButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            const message = button.getAttribute('data-confirm-delete') || 'Are you sure you want to delete this item?';
            if (!confirm(message)) {
                event.preventDefault();
            }
        });
    });

    // Search functionality enhancements
    const searchInput = document.querySelector('input[name="q"]');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(function() {
                // Add visual feedback for search
                if (searchInput.value.length > 0) {
                    searchInput.classList.add('border-primary');
                } else {
                    searchInput.classList.remove('border-primary');
                }
            }, 300);
        });
    }

    // Table sorting functionality
    const sortableHeaders = document.querySelectorAll('[data-sort]');
    sortableHeaders.forEach(function(header) {
        header.style.cursor = 'pointer';
        header.addEventListener('click', function() {
            const table = header.closest('table');
            const tbody = table.querySelector('tbody');
            const rows = Array.from(tbody.querySelectorAll('tr'));
            const column = Array.from(header.parentNode.children).indexOf(header);
            const isAscending = header.classList.contains('sort-asc');
            
            // Remove existing sort classes
            sortableHeaders.forEach(h => h.classList.remove('sort-asc', 'sort-desc'));
            
            // Add new sort class
            header.classList.add(isAscending ? 'sort-desc' : 'sort-asc');
            
            // Sort rows
            rows.sort(function(a, b) {
                const aValue = a.children[column].textContent.trim();
                const bValue = b.children[column].textContent.trim();
                
                // Try to parse as numbers
                const aNum = parseFloat(aValue);
                const bNum = parseFloat(bValue);
                
                if (!isNaN(aNum) && !isNaN(bNum)) {
                    return isAscending ? bNum - aNum : aNum - bNum;
                } else {
                    return isAscending ? 
                        bValue.localeCompare(aValue) : 
                        aValue.localeCompare(bValue);
                }
            });
            
            // Reorder table rows
            rows.forEach(row => tbody.appendChild(row));
        });
    });

    // Real-time clock and date for dashboard
    function updateClock() {
        const now = new Date();
        const clockElements = document.querySelectorAll('.live-clock');
        const dateElements = document.querySelectorAll('.live-date');
        
        clockElements.forEach(function(element) {
            element.textContent = now.toLocaleString();
        });
        
        dateElements.forEach(function(element) {
            element.textContent = now.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        });
    }
    
    if (document.querySelector('.live-clock') || document.querySelector('.live-date')) {
        updateClock();
        setInterval(updateClock, 1000);
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Loading states for buttons
    const loadingButtons = document.querySelectorAll('[data-loading-text]');
    loadingButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const originalText = button.innerHTML;
            const loadingText = button.getAttribute('data-loading-text');
            
            button.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>' + loadingText;
            button.disabled = true;
            
            // Re-enable after form submission or timeout
            setTimeout(function() {
                button.innerHTML = originalText;
                button.disabled = false;
            }, 3000);
        });
    });

    // Enhanced form handling
    const smartForms = document.querySelectorAll('.smart-form');
    smartForms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            const submitButton = form.querySelector('[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
            }
        });
    });

    // Auto-focus first input in modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(function(modal) {
        modal.addEventListener('shown.bs.modal', function() {
            const firstInput = modal.querySelector('input:not([type="hidden"]), select, textarea');
            if (firstInput) {
                firstInput.focus();
            }
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl+/ for search
        if (e.ctrlKey && e.key === '/') {
            e.preventDefault();
            const searchInput = document.querySelector('#search');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                const modal = bootstrap.Modal.getInstance(openModal);
                if (modal) {
                    modal.hide();
                }
            }
        }
    });

    // Activity status indicators
    function updateActivityStatus() {
        const statusElements = document.querySelectorAll('.activity-status');
        statusElements.forEach(function(element) {
            const timestamp = element.getAttribute('data-timestamp');
            if (timestamp) {
                const date = new Date(timestamp);
                const now = new Date();
                const diffMinutes = Math.floor((now - date) / (1000 * 60));
                
                if (diffMinutes < 5) {
                    element.classList.add('text-success');
                    element.innerHTML = '<i class="fas fa-circle me-1"></i>Active';
                } else if (diffMinutes < 30) {
                    element.classList.add('text-warning');
                    element.innerHTML = '<i class="fas fa-circle me-1"></i>Recent';
                } else {
                    element.classList.add('text-muted');
                    element.innerHTML = '<i class="fas fa-circle me-1"></i>Idle';
                }
            }
        });
    }
    
    updateActivityStatus();

    // Print functionality
    const printButtons = document.querySelectorAll('.print-btn');
    printButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            window.print();
        });
    });

    // Background Animation Controls
    initializeBackgroundAnimations();
    
    // Performance optimization for animations
    handleAnimationPerformance();

    // Add fade-in animation to cards
    const cards = document.querySelectorAll('.card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    cards.forEach(function(card) {
        observer.observe(card);
    });

    // Skeleton Loading System
    initializeSkeletonLoaders();
    
    console.log('Little Flower Library Management System initialized successfully!');
});

// Skeleton Loading Functions
function initializeSkeletonLoaders() {
    // Add skeleton loading to tables
    const tables = document.querySelectorAll('.table');
    tables.forEach(table => {
        addTableSkeletonOnLoad(table);
    });
    
    // Add skeleton loading to cards
    const cardBodies = document.querySelectorAll('.card-body');
    cardBodies.forEach(cardBody => {
        addCardSkeletonOnLoad(cardBody);
    });
}

function addTableSkeletonOnLoad(table) {
    const tbody = table.querySelector('tbody');
    if (tbody && tbody.children.length === 0) {
        showTableSkeleton(tbody, 5);
    }
}

function addCardSkeletonOnLoad(cardBody) {
    // Only add skeleton if card appears to be loading content dynamically
    if (cardBody.dataset.skeleton === 'true') {
        showCardSkeleton(cardBody);
    }
}

function showTableSkeleton(tbody, rows = 5) {
    const thead = tbody.closest('table').querySelector('thead tr');
    const columnCount = thead ? thead.children.length : 4;
    
    tbody.innerHTML = '';
    
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('tr');
        row.className = 'skeleton-table-row';
        
        for (let j = 0; j < columnCount; j++) {
            const cell = document.createElement('td');
            const skeletonDiv = document.createElement('div');
            skeletonDiv.className = 'skeleton skeleton-table-cell';
            cell.appendChild(skeletonDiv);
            row.appendChild(cell);
        }
        
        tbody.appendChild(row);
    }
    
    // Remove skeleton after 2 seconds (simulating data load)
    setTimeout(() => {
        removeTableSkeleton(tbody);
    }, 2000);
}

function removeTableSkeleton(tbody) {
    const skeletonRows = tbody.querySelectorAll('.skeleton-table-row');
    skeletonRows.forEach(row => row.remove());
}

function showCardSkeleton(cardBody) {
    const skeletonHTML = `
        <div class="skeleton-card">
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-button"></div>
        </div>
    `;
    
    const originalContent = cardBody.innerHTML;
    cardBody.innerHTML = skeletonHTML;
    
    // Restore content after loading
    setTimeout(() => {
        cardBody.innerHTML = originalContent;
    }, 1500);
}

function showLoadingOverlay() {
    return showEnhancedLoadingOverlay();
}

function hideLoadingOverlay(overlay) {
    if (overlay && overlay.parentNode) {
        overlay.remove();
    }
}

// Enhanced Page Transitions
function initPageTransitions() {
    // Add loading states to navigation links
    const navLinks = document.querySelectorAll('.nav-link, .btn[href]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.href || this.href === '#') return;
            
            const overlay = showLoadingOverlay();
            
            // Remove overlay after page transition
            setTimeout(() => {
                hideLoadingOverlay(overlay);
            }, 1000);
        });
    });
}

// Enhanced Form Submissions with Loading States
function enhanceFormSubmissions() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                
                // Add loading animation
                submitBtn.innerHTML = `
                    <div class="dots-loader">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                    <span class="ms-2">Processing...</span>
                `;
                submitBtn.disabled = true;
                submitBtn.classList.add('btn-loading');
                
                // Show loading overlay for forms
                const overlay = showEnhancedLoadingOverlay();
                
                // Re-enable after timeout (fallback)
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('btn-loading');
                    hideLoadingOverlay(overlay);
                }, 5000);
            }
        });
    });
}

// Initialize enhancements
document.addEventListener('DOMContentLoaded', function() {
    initPageTransitions();
    enhanceFormSubmissions();
});

// Utility functions
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    toast.style.cssText = 'top: 20px; right: 20px; z-index: 1050; min-width: 300px;';
    toast.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(function() {
        toast.remove();
    }, 5000);
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatTime(date) {
    return new Date(date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Enhanced Loading Functions
function showLoadingProgress() {
    const progressBar = document.getElementById('loadingProgress');
    if (progressBar) {
        progressBar.style.display = 'block';
        setTimeout(() => {
            progressBar.style.display = 'none';
        }, 2000);
    }
}

function initPageEntranceAnimations() {
    // Add staggered entrance animations to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('page-enter-slide');
    });
    
    // Add entrance animations to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach((button, index) => {
        button.style.animationDelay = `${index * 0.05}s`;
        button.classList.add('fade-in');
    });
    
    // Add entrance animations to table rows
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach((row, index) => {
        row.style.animationDelay = `${index * 0.03}s`;
        row.classList.add('page-enter-stagger');
    });
}

function showEnhancedLoadingOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.innerHTML = `
        <div class="text-center">
            <div class="loading-spinner"></div>
            <div class="books-loading mt-4">
                <div class="book-loading"></div>
                <div class="book-loading"></div>
                <div class="book-loading"></div>
                <div class="book-loading"></div>
                <div class="book-loading"></div>
            </div>
            <p class="mt-3 text-muted">Loading your library...</p>
            <div class="dots-loader">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    return overlay;
}

// Background Animation Functions
function initializeBackgroundAnimations() {
    // Add random delays to floating books for more natural movement
    const floatingBooks = document.querySelectorAll('.floating-book');
    floatingBooks.forEach((book, index) => {
        const randomDelay = Math.random() * 25;
        book.style.animationDelay = `-${randomDelay}s`;
        
        // Add different book icons randomly
        const bookIcons = [
            'fas fa-book', 'fas fa-book-open', 'fas fa-bookmark', 
            'fas fa-graduation-cap', 'fas fa-feather-alt', 'fas fa-scroll',
            'fas fa-atlas', 'fas fa-journal-whills', 'fas fa-book-reader',
            'fas fa-book-medical', 'fas fa-bible', 'fas fa-spell-check'
        ];
        const randomIcon = bookIcons[Math.floor(Math.random() * bookIcons.length)];
        book.innerHTML = `<i class="${randomIcon}"></i>`;
    });
    
    // Randomize particle positions and timing
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const randomDelay = Math.random() * 18;
        const randomLeft = Math.random() * 100;
        particle.style.animationDelay = `-${randomDelay}s`;
        particle.style.left = `${randomLeft}%`;
    });
    
    // Randomize sparkle positions
    const sparkles = document.querySelectorAll('.sparkle');
    sparkles.forEach((sparkle, index) => {
        const randomDelay = Math.random() * 12;
        const randomLeft = Math.random() * 100;
        sparkle.style.animationDelay = `-${randomDelay}s`;
        sparkle.style.left = `${randomLeft}%`;
    });
    
    // Randomize floating elements
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        const randomDelay = Math.random() * 30;
        element.style.animationDelay = `-${randomDelay}s`;
    });
    
    // Add interactive hover effects to background elements
    addBackgroundInteractivity();
}

function addBackgroundInteractivity() {
    // Pause animations on hover for accessibility
    const animatedElements = document.querySelectorAll('.floating-book, .particle, .book-spine');
    
    document.addEventListener('mousemove', function(e) {
        // Subtle parallax effect
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const floatingBooks = document.querySelectorAll('.floating-book');
        floatingBooks.forEach((book, index) => {
            const speed = (index % 3 + 1) * 0.5;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            book.style.transform += ` translate(${x}px, ${y}px)`;
        });
    });
}

function handleAnimationPerformance() {
    // Pause animations when page is not visible (performance optimization)
    document.addEventListener('visibilitychange', function() {
        const backgroundAnimations = document.querySelector('.library-background');
        if (document.hidden) {
            backgroundAnimations.style.animationPlayState = 'paused';
            backgroundAnimations.querySelectorAll('*').forEach(el => {
                el.style.animationPlayState = 'paused';
            });
        } else {
            backgroundAnimations.style.animationPlayState = 'running';
            backgroundAnimations.querySelectorAll('*').forEach(el => {
                el.style.animationPlayState = 'running';
            });
        }
    });
    
    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency <= 2) {
        document.querySelector('.library-background').classList.add('reduced-motion');
    }
}

function toggleBackgroundAnimations() {
    const background = document.querySelector('.library-background');
    const isPlaying = background.style.animationPlayState !== 'paused';
    
    if (isPlaying) {
        background.style.animationPlayState = 'paused';
        background.querySelectorAll('*').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
        showToast('Background animations paused', 'info');
    } else {
        background.style.animationPlayState = 'running';
        background.querySelectorAll('*').forEach(el => {
            el.style.animationPlayState = 'running';
        });
        showToast('Background animations resumed', 'info');
    }
}

// Export utility functions for use in other scripts
window.LibraryUtils = {
    showToast,
    formatDate,
    formatTime,
    toggleBackgroundAnimations
};
