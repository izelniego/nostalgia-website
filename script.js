// Y2K Nostalgic Website JavaScript

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('main section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active-section'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the target section and make it active
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).classList.add('active-section');
        });
    });
    
    // Music player functionality
    const songs = [
        "...Baby One More Time - Britney Spears",
        "I Want It That Way - Backstreet Boys",
        "No Scrubs - TLC",
        "Wannabe - Spice Girls",
        "Bye Bye Bye - *NSYNC",
        "Say My Name - Destiny's Child",
        "Genie in a Bottle - Christina Aguilera"
    ];
    
    let currentSong = 0;
    const songTitle = document.getElementById('song-title');
    const playButton = document.getElementById('play');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const toggleMusic = document.getElementById('toggle-music');
    
    let isPlaying = true;
    
    playButton.addEventListener('click', function() {
        if (isPlaying) {
            this.textContent = '▶';
            isPlaying = false;
        } else {
            this.textContent = '❚❚';
            isPlaying = true;
        }
    });
    
    prevButton.addEventListener('click', function() {
        currentSong = (currentSong - 1 + songs.length) % songs.length;
        songTitle.textContent = songs[currentSong];
        playButton.textContent = '❚❚';
        isPlaying = true;
    });
    
    nextButton.addEventListener('click', function() {
        currentSong = (currentSong + 1) % songs.length;
        songTitle.textContent = songs[currentSong];
        playButton.textContent = '❚❚';
        isPlaying = true;
    });
    
    toggleMusic.addEventListener('click', function(e) {
        e.preventDefault();
        if (this.textContent === 'Stop Music') {
            this.textContent = 'Play Music';
        } else {
            this.textContent = 'Stop Music';
        }
    });
    
    // Guestbook functionality
    const guestbookForm = document.getElementById('guestbook-form');
    const guestbookEntries = document.querySelector('.guestbook-entries');
    
    guestbookForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const asl = document.getElementById('asl').value;
        const message = document.getElementById('message').value;
        
        // Get current date in MM/DD/YYYY format
        const now = new Date();
        const date = `${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')}/${now.getFullYear()}`;
        
        // Create new entry
        const newEntry = document.createElement('div');
        newEntry.className = 'entry';
        newEntry.innerHTML = `
            <p class="entry-header">From: ${name} (${asl}) - ${date}</p>
            <p class="entry-message">${message}</p>
        `;
        
        // Add new entry at the top
        guestbookEntries.insertBefore(newEntry, guestbookEntries.querySelector('h3').nextSibling);
        
        // Reset form
        guestbookForm.reset();
        
        // Show confirmation
        alert('Thanks for signing my guestbook!');
    });
    
    // Visitor counter
    const counter = document.getElementById('counter');
    let count = 1337;
    
    setInterval(() => {
        count++;
        counter.textContent = count.toLocaleString();
    }, 60000); // Increment every minute
    
    // Cursor trail effect
    const cursorTrail = document.getElementById('cursor-trail');
    const trailElements = [];
    const trailLength = 20;
    
    // Create trail elements
    for (let i = 0; i < trailLength; i++) {
        const div = document.createElement('div');
        cursorTrail.appendChild(div);
        trailElements.push(div);
    }
    
    // Update trail positions
    document.addEventListener('mousemove', function(e) {
        // Shift positions
        for (let i = trailElements.length - 1; i > 0; i--) {
            trailElements[i].style.left = trailElements[i-1].style.left;
            trailElements[i].style.top = trailElements[i-1].style.top;
        }
        
        // Set position of first element to cursor position
        trailElements[0].style.left = e.clientX + 'px';
        trailElements[0].style.top = e.clientY + 'px';
        
        // Set opacity based on position in trail
        trailElements.forEach((element, index) => {
            element.style.opacity = 1 - (index / trailLength);
        });
    });
    
    // Random sparkle effect
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.top = Math.random() * window.innerHeight + 'px';
        sparkle.style.width = '5px';
        sparkle.style.height = '5px';
        sparkle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 75%)`;
        sparkle.style.position = 'fixed';
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9998';
        sparkle.style.boxShadow = '0 0 5px white';
        document.body.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }, 500);
    
    // Add blinking text effect to certain elements
    const blinkElements = document.querySelectorAll('.construction img');
    blinkElements.forEach(element => {
        element.style.animation = 'blink 1s infinite';
    });
    
    // Easter egg - Konami code
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Activate easter egg
                document.body.style.backgroundImage = 'url(https://web.archive.org/web/20090901000000/http://www.geocities.com/Athens/Olympus/5939/stars.gif)';
                alert('You found the secret code! Welcome to SUPER Y2K MODE!');
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
});