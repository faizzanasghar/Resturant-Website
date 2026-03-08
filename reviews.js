// Reviews Management System with localStorage

class ReviewsManager {
    constructor() {
        this.STORAGE_KEY = 'delizaReviews';
        this.reviews = this.loadReviews();
    }

    loadReviews() {
        const savedReviews = localStorage.getItem(this.STORAGE_KEY);
        return savedReviews ? JSON.parse(savedReviews) : [];
    }

    saveReviews() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.reviews));
    }

    addReview(name, rating, reviewText) {
        const review = {
            id: Date.now(),
            name: name,
            rating: parseInt(rating),
            text: reviewText,
            date: new Date().toLocaleDateString()
        };
        this.reviews.unshift(review); // Add to beginning (newest first)
        this.saveReviews();
        return review;
    }

    deleteReview(id) {
        this.reviews = this.reviews.filter(review => review.id !== id);
        this.saveReviews();
    }

    getReviews() {
        return this.reviews;
    }

    getAverageRating() {
        if (this.reviews.length === 0) return 5.0;
        const sum = this.reviews.reduce((total, review) => total + review.rating, 0);
        return (sum / this.reviews.length).toFixed(1);
    }

    getTotalReviews() {
        return this.reviews.length;
    }
}

// Initialize reviews manager
const reviewsManager = new ReviewsManager();

// DOM Elements
const reviewForm = document.getElementById('review-form');
const reviewerName = document.getElementById('reviewer-name');
const reviewText = document.getElementById('review-text');
const ratingHidden = document.getElementById('rating-hidden');
const successMessage = document.getElementById('success-message');
const reviewsContent = document.getElementById('reviews-content');
const starRating = document.getElementById('star-rating');
const stars = document.querySelectorAll('.star');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    displayReviews();
    updateAverageRating();
    setupStarRating();
});

// Setup star rating
function setupStarRating() {
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.dataset.rating;
            ratingHidden.value = rating;
            
            // Update all stars
            stars.forEach(s => {
                if (s.dataset.rating <= rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });

        // Hover effect
        star.addEventListener('mouseover', function() {
            const rating = this.dataset.rating;
            stars.forEach(s => {
                if (s.dataset.rating <= rating) {
                    s.style.color = '#ff6347';
                } else {
                    s.style.color = '#ddd';
                }
            });
        });
    });

    // Reset on mouse leave
    starRating.addEventListener('mouseleave', function() {
        const currentRating = ratingHidden.value;
        stars.forEach(s => {
            if (s.dataset.rating <= currentRating) {
                s.style.color = '#ff6347';
            } else {
                s.style.color = '#ddd';
            }
        });
    });

    // Set initial stars (5 stars)
    stars.forEach(s => {
        if (s.dataset.rating <= ratingHidden.value) {
            s.classList.add('active');
        }
    });
}

// Handle form submission
reviewForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = reviewerName.value.trim();
    const rating = ratingHidden.value;
    const review = reviewText.value.trim();

    if (!name) {
        alert('Please enter your name');
        return;
    }

    if (!review) {
        alert('Please write a review');
        return;
    }

    // Add review
    reviewsManager.addReview(name, rating, review);

    // Reset form
    reviewForm.reset();
    ratingHidden.value = '5';
    stars.forEach(s => {
        if (s.dataset.rating <= 5) {
            s.classList.add('active');
        } else {
            s.classList.remove('active');
        }
    });

    // Show success message
    successMessage.style.display = 'block';
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);

    // Refresh display
    displayReviews();
    updateAverageRating();

    // Scroll to reviews
    reviewsContent.scrollIntoView({ behavior: 'smooth' });
});

// Display all reviews
function displayReviews() {
    const reviews = reviewsManager.getReviews();

    if (reviews.length === 0) {
        reviewsContent.innerHTML = '<div class="no-reviews">No reviews yet. Be the first to review!</div>';
        return;
    }

    reviewsContent.innerHTML = reviews.map(review => `
        <div class="review-item">
            <div class="review-header">
                <div>
                    <div class="review-author">${escapeHtml(review.name)}</div>
                    <div class="review-date">${review.date}</div>
                </div>
                <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
            </div>
            <p class="review-text">${escapeHtml(review.text)}</p>
        </div>
    `).join('');
}

// Update average rating
function updateAverageRating() {
    document.getElementById('avg-rating').textContent = reviewsManager.getAverageRating();
    document.getElementById('review-count').textContent = reviewsManager.getTotalReviews();
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Load sample reviews on first visit (optional)
if (reviewsManager.getTotalReviews() === 0) {
    const sampleReviews = [
        { name: 'Ali Rahman', rating: 5, text: 'Amazing pizza! The crust is perfect and the toppings are fresh. Highly recommend!' },
        { name: 'Fatima Khan', rating: 5, text: 'Best burgers in the city. The service was quick and friendly.' },
        { name: 'Hassan Ahmed', rating: 4, text: 'Great taste, generous portions. Will definitely order again!' }
    ];

    sampleReviews.forEach(review => {
        reviewsManager.addReview(review.name, review.rating, review.text);
    });

    displayReviews();
    updateAverageRating();
}
