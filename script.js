// Y2K Nostalgic Website JavaScript

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Welcome popup functionality
    const welcomePopup = document.getElementById('welcome-popup');
    const enterSiteBtn = document.getElementById('enter-site');

    if (enterSiteBtn && welcomePopup) {
        enterSiteBtn.addEventListener('click', function() {
            welcomePopup.style.display = 'none';
        });
    }

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
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active-section');
            }
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

    if (playButton) {
        playButton.addEventListener('click', function() {
            if (isPlaying) {
                this.textContent = '▶';
                isPlaying = false;
            } else {
                this.textContent = '❚❚';
                isPlaying = true;
            }
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', function() {
            currentSong = (currentSong - 1 + songs.length) % songs.length;
            if (songTitle) songTitle.textContent = songs[currentSong];
            if (playButton) playButton.textContent = '❚❚';
            isPlaying = true;
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', function() {
            currentSong = (currentSong + 1) % songs.length;
            if (songTitle) songTitle.textContent = songs[currentSong];
            if (playButton) playButton.textContent = '❚❚';
            isPlaying = true;
        });
    }

    if (toggleMusic) {
        toggleMusic.addEventListener('click', function(e) {
            e.preventDefault();
            if (this.textContent === 'Stop Music') {
                this.textContent = 'Play Music';
            } else {
                this.textContent = 'Stop Music';
            }
        });
    }

    // Guestbook functionality
    const guestbookForm = document.getElementById('guestbook-form');
    const guestbookEntries = document.querySelector('.guestbook-entries');

    if (guestbookForm && guestbookEntries) {
        guestbookForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const asl = document.getElementById('asl').value;
            const message = document.getElementById('message').value;

            // Get current date in MM/DD/YYYY format
            const now = new Date();
            const date = `${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')}/${now.getFullYear()}`;

            // Create new entry safely (no innerHTML to prevent XSS)
            const newEntry = document.createElement('div');
            newEntry.className = 'entry';

            const header = document.createElement('p');
            header.className = 'entry-header';
            header.textContent = `From: ${name} (${asl}) - ${date}`;

            const msg = document.createElement('p');
            msg.className = 'entry-message';
            msg.textContent = message;

            newEntry.appendChild(header);
            newEntry.appendChild(msg);

            // Add new entry at the top
            const entriesHeading = guestbookEntries.querySelector('h3');
            const insertPoint = entriesHeading ? entriesHeading.nextSibling : guestbookEntries.firstChild;
            guestbookEntries.insertBefore(newEntry, insertPoint);

            // Reset form
            guestbookForm.reset();

            // Show confirmation
            alert('Thanks for signing my guestbook!');
        });
    }

    // Poll functionality
    const pollForm = document.getElementById('poll-form');
    const pollResults = document.querySelector('.poll-results');

    if (pollForm) {
        pollForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const selected = pollForm.querySelector('input[name="poll"]:checked');
            if (!selected) {
                alert('Please select an option before voting!');
                return;
            }

            // Hide form and show results
            pollForm.style.display = 'none';
            if (pollResults) {
                pollResults.style.display = 'block';
            }

            alert('Thanks for voting! ✨');
        });
    }

    // Download buttons - nostalgic 404
    document.querySelectorAll('.download-button').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Error 404: File not found!\nJust like the old days! 😄');
        });
    });

    // Cool links - dead link handlers
    document.querySelectorAll('.links a[href="#"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('This link is broken!\n\n"This page has been removed because GeoCities has closed."\n\nRIP GeoCities 1994-2009');
        });
    });

    // Webring navigation
    document.querySelectorAll('.webring-nav a').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('The webring has disbanded.\nAll good things must come to an end! 💔');
        });
    });

    // ICQ and AIM links in footer
    document.querySelectorAll('footer a[href="#"]').forEach(function(link) {
        if (link.id === 'toggle-music') return;
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Service no longer available.\nTry MySpace instead! 😂');
        });
    });

    // Visitor counter with localStorage persistence
    const counter = document.getElementById('counter');
    if (counter) {
        let count = parseInt(localStorage.getItem('y2k-visitor-count'), 10);
        if (isNaN(count)) {
            count = 1337;
        }
        count++;
        localStorage.setItem('y2k-visitor-count', count);
        counter.textContent = count.toLocaleString();

        setInterval(function() {
            count++;
            localStorage.setItem('y2k-visitor-count', count);
            counter.textContent = count.toLocaleString();
        }, 60000);
    }

    // Cursor trail effect
    const cursorTrail = document.getElementById('cursor-trail');
    if (cursorTrail) {
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
            for (let i = trailElements.length - 1; i > 0; i--) {
                trailElements[i].style.left = trailElements[i-1].style.left;
                trailElements[i].style.top = trailElements[i-1].style.top;
            }

            trailElements[0].style.left = e.clientX + 'px';
            trailElements[0].style.top = e.clientY + 'px';

            trailElements.forEach(function(element, index) {
                element.style.opacity = 1 - (index / trailLength);
            });
        });
    }

    // Random sparkle effect with element pool (no DOM churn)
    const sparklePool = [];
    const maxSparkles = 10;

    for (let i = 0; i < maxSparkles; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.position = 'fixed';
        sparkle.style.width = '5px';
        sparkle.style.height = '5px';
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9998';
        sparkle.style.boxShadow = '0 0 5px white';
        sparkle.style.transition = 'opacity 0.5s';
        sparkle.style.opacity = '0';
        document.body.appendChild(sparkle);
        sparklePool.push(sparkle);
    }

    let sparkleIndex = 0;

    setInterval(function() {
        const sparkle = sparklePool[sparkleIndex];
        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.top = Math.random() * window.innerHeight + 'px';
        sparkle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 75%)`;
        sparkle.style.opacity = '1';

        setTimeout(function() {
            sparkle.style.opacity = '0';
        }, 500);

        sparkleIndex = (sparkleIndex + 1) % maxSparkles;
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
                document.body.style.backgroundImage = 'url(https://web.archive.org/web/20090901000000/http://www.geocities.com/Athens/Olympus/5939/stars.gif)';
                alert('You found the secret code! Welcome to SUPER Y2K MODE!');
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
});
