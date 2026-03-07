// Hamburger menu toggle
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', function () {
        mobileMenu.style.display = (mobileMenu.style.display === 'block') ? 'none' : 'block';
    });
}

document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu) mobileMenu.style.display = 'none';
    });
});

window.addEventListener('resize', function () {
    if (window.innerWidth > 800 && mobileMenu) {
        mobileMenu.style.display = 'none';
    }
});


// Modern Dynamic Image Viewer
document.querySelectorAll('.portfolio-img-thumb').forEach(img => {
    img.style.cursor = 'zoom-in';

    img.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        // Remove existing modal if any (prevents duplicates)
        const existingModal = document.getElementById('modern-img-modal');
        if (existingModal) existingModal.remove();

        // 1. Create the modal container dynamically
        const modal = document.createElement('div');
        modal.id = 'modern-img-modal';
        Object.assign(modal.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '9999',
            cursor: 'zoom-out',
            opacity: '0',
            transition: 'opacity 0.2s ease-in-out'
        });

        // 2. Create the close button
        const closeBtn = document.createElement('span');
        closeBtn.innerHTML = '&times;';
        Object.assign(closeBtn.style, {
            position: 'absolute',
            top: '24px',
            right: '36px',
            color: '#94a3b8',
            fontSize: '3rem',
            fontWeight: '300',
            cursor: 'pointer',
            lineHeight: '1',
            transition: 'color 0.2s',
            userSelect: 'none'
        });
        closeBtn.onmouseenter = () => closeBtn.style.color = '#fff';
        closeBtn.onmouseleave = () => closeBtn.style.color = '#94a3b8';

        // 3. Create the image element
        const fullImg = document.createElement('img');
        fullImg.src = this.getAttribute('data-img') || this.src;
        fullImg.alt = this.alt || 'Full size portfolio image';
        Object.assign(fullImg.style, {
            maxWidth: '90vw',
            maxHeight: '85vh',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            objectFit: 'contain',
            transform: 'scale(0.95)',
            transition: 'transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        });

        // Assemble the modal and inject it into the DOM
        modal.appendChild(closeBtn);
        modal.appendChild(fullImg);
        document.body.appendChild(modal);

        // Disallow scrolling on the underlying page while modal is open
        document.body.style.overflow = 'hidden';

        // Trigger the opening animation
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
            fullImg.style.transform = 'scale(1)';
        });

        // 4. Modal closing logic
        const closeModal = () => {
            modal.style.opacity = '0';
            fullImg.style.transform = 'scale(0.95)';
            document.body.style.overflow = ''; // Restore scrolling

            // Wait for fade animation before destroying the node
            setTimeout(() => {
                if (modal.parentNode) modal.remove();
            }, 200);
        };

        // Close when clicking anywhere on the modal
        modal.addEventListener('click', closeModal);

        // Add escape key listener to close
        const escListener = (event) => {
            if (event.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escListener);
            }
        };
        document.addEventListener('keydown', escListener);
    });
});
