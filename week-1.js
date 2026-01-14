// Week 1 specific JavaScript

let week1Unlocked = false;
let video1Completed = false;
let video2Unlocked = false;
let video2Completed = false;

// Initialize week 1
document.addEventListener('DOMContentLoaded', function() {
    initializeWeek1();
    setupWeek1Listeners();
});

function initializeWeek1() {
    // Check if course has been unlocked
    const courseUnlocked = localStorage.getItem('course-unlocked') === 'true';
    week1Unlocked = courseUnlocked;
    
    // Check if videos were previously completed
    const v1Completed = localStorage.getItem('week1-video1-completed') === 'true';
    const v2Completed = localStorage.getItem('week1-video2-completed') === 'true';
    video1Completed = v1Completed;
    video2Completed = v2Completed;
    video2Unlocked = v1Completed;
    
    updateVideoStates();
}

function setupWeek1Listeners() {
    // Video 1
    const video1 = document.getElementById('video1');
    if (video1) {
        video1.addEventListener('timeupdate', handleVideo1TimeUpdate);
    }
    
    // Video 2
    const video2 = document.getElementById('video2');
    if (video2) {
        video2.addEventListener('timeupdate', handleVideo2TimeUpdate);
    }
    
    // Reset button
    const resetBtn = document.getElementById('reset-demo-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetProgress);
    }
}

function updateVideoStates() {
    const video1 = document.getElementById('video1');
    const video2 = document.getElementById('video2');
    const video1Wrapper = document.getElementById('video1-wrapper');
    const video2Wrapper = document.getElementById('video2-wrapper');
    const video1Lock = document.getElementById('video1-lock');
    const video2Lock = document.getElementById('video2-lock');
    const video1LockMsg = document.getElementById('video1-lock-msg');
    const video2LockMsg = document.getElementById('video2-lock-msg');
    
    // Video 1 state
    if (!week1Unlocked) {
        video1.controls = false;
        video1.style.filter = 'blur(4px) brightness(0.5)';
        video1Wrapper.classList.add('locked-state');
        video1Lock.style.display = 'flex';
        video1LockMsg.style.display = 'block';
    } else {
        video1.controls = true;
        video1.style.filter = 'none';
        video1Wrapper.classList.remove('locked-state');
        video1Lock.style.display = 'none';
        video1LockMsg.style.display = 'none';
    }
    
    // Video 2 state
    if (!video2Unlocked) {
        video2.controls = false;
        video2.style.filter = 'blur(4px) brightness(0.5)';
        video2Wrapper.classList.add('locked-state');
        video2Lock.style.display = 'flex';
        video2LockMsg.style.display = 'block';
    } else {
        video2.controls = true;
        video2.style.filter = 'none';
        video2Wrapper.classList.remove('locked-state');
        video2Lock.style.display = 'none';
        video2LockMsg.style.display = 'none';
    }
}

function handleVideo1TimeUpdate() {
    const video = document.getElementById('video1');
    if (video && video.duration) {
        const progress = (video.currentTime / video.duration) * 100;
        if (progress >= 90 && !video1Completed) {
            video1Completed = true;
            video2Unlocked = true;
            localStorage.setItem('week1-video1-completed', 'true');
            updateVideoStates();
        }
    }
}

function handleVideo2TimeUpdate() {
    const video = document.getElementById('video2');
    if (video && video.duration) {
        const progress = (video.currentTime / video.duration) * 100;
        if (progress >= 90 && !video2Completed) {
            video2Completed = true;
            localStorage.setItem('week1-video2-completed', 'true');
        }
    }
}

function resetProgress() {
    localStorage.clear();
    video1Completed = false;
    video2Completed = false;
    video2Unlocked = false;
    week1Unlocked = false;
    
    const video1 = document.getElementById('video1');
    const video2 = document.getElementById('video2');
    
    if (video1) video1.currentTime = 0;
    if (video2) video2.currentTime = 0;
    
    updateVideoStates();
    location.reload();
}
