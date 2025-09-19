// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeToggle.innerHTML = document.body.classList.contains('dark')
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
});

// Fade-in animation on scroll
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(element => observer.observe(element));

// Edit project functionality
const modal = document.getElementById('edit-modal');
const editButtons = document.querySelectorAll('.edit-project');
const cancelButton = document.getElementById('cancel-edit');
const saveButton = document.getElementById('save-edit');
const editTitle = document.getElementById('edit-title');
const editDescription = document.getElementById('edit-description');
const editImage = document.getElementById('edit-image');
let currentProjectId = null;

editButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentProjectId = button.getAttribute('data-project-id');
        const projectCard = document.querySelector(`.project-card[data-project-id="${currentProjectId}"]`);
        const title = projectCard.querySelector('.project-title').textContent;
        const description = projectCard.querySelector('.project-description').textContent;
        const image = projectCard.querySelector('img').src;

        editTitle.value = title;
        editDescription.value = description;
        editImage.value = image;

        modal.style.display = 'flex';
    });
});

cancelButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

saveButton.addEventListener('click', () => {
    if (currentProjectId) {
        const projectCard = document.querySelector(`.project-card[data-project-id="${currentProjectId}"]`);
        projectCard.querySelector('.project-title').textContent = editTitle.value;
        projectCard.querySelector('.project-description').textContent = editDescription.value;
        projectCard.querySelector('img').src = editImage.value || 'https://via.placeholder.com/300x200';
        modal.style.display = 'none';
    }
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Profile picture upload
const profileUpload = document.getElementById('profile-upload');
const profileImage = document.getElementById('profile-image');

profileUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profileImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please select a valid image file.');
    }
});
