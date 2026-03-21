// Y2K Nostalgic Website JavaScript

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // =========================================================================
    // FEATURE 1: Dial-up Connection Animation
    // =========================================================================
    const welcomePopup = document.getElementById('welcome-popup');
    const enterSiteBtn = document.getElementById('enter-site');
    const dialupStatus = document.getElementById('dialup-status');
    const dialupBar = document.getElementById('dialup-bar');
    const dialupText = document.getElementById('dialup-text');

    if (enterSiteBtn && welcomePopup) {
        enterSiteBtn.addEventListener('click', function() {
            // Hide button, show dial-up animation
            enterSiteBtn.style.display = 'none';
            if (dialupStatus) {
                dialupStatus.style.display = 'block';
            }

            const stages = [
                { text: 'Dialing...', progress: 10 },
                { text: 'beeee booo beee dooo KSSSHHHH...', progress: 25 },
                { text: 'Connecting to AOL...', progress: 40 },
                { text: 'KSSSHHH DINGDINGDING...', progress: 55 },
                { text: 'Verifying username and password...', progress: 70 },
                { text: 'Negotiating connection speed: 56kbps', progress: 85 },
                { text: 'Connected! Welcome to the World Wide Web!', progress: 100 }
            ];

            let stageIndex = 0;

            function advanceDialup() {
                if (stageIndex < stages.length) {
                    if (dialupText) dialupText.textContent = stages[stageIndex].text;
                    if (dialupBar) dialupBar.style.width = stages[stageIndex].progress + '%';
                    stageIndex++;
                    setTimeout(advanceDialup, 600);
                } else {
                    // Connection complete — dismiss popup
                    setTimeout(function() {
                        welcomePopup.style.display = 'none';
                    }, 500);
                }
            }

            advanceDialup();
        });
    }

    // =========================================================================
    // Navigation with Page Transitions (Feature 6)
    // =========================================================================
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('main section');
    const transitionAnimations = [
        'section-fade-in',
        'section-slide-in',
        'section-pixelate-in',
        'section-zoom-in'
    ];
    let transitionIndex = 0;

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => {
                s.classList.remove('active-section');
                s.style.animation = 'none';
            });

            this.classList.add('active');

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                // Apply a different transition each time
                const animName = transitionAnimations[transitionIndex % transitionAnimations.length];
                transitionIndex++;

                // Force reflow to restart animation
                targetSection.offsetHeight;
                targetSection.style.animation = animName + ' 0.4s ease-out';
                targetSection.classList.add('active-section');
            }
        });
    });

    // =========================================================================
    // Music Player
    // =========================================================================
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
            this.textContent = this.textContent === 'Stop Music' ? 'Play Music' : 'Stop Music';
        });
    }

    // =========================================================================
    // FEATURE 5: Guestbook with Persistence + Enhancements
    // =========================================================================
    const guestbookForm = document.getElementById('guestbook-form');
    const guestbookEntries = document.getElementById('guestbook-entries');
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('char-count');

    const moodEmojis = {
        happy: '😊',
        sad: '😢',
        excited: '🤩',
        bored: '😴',
        confused: '🤔'
    };

    // Character counter
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            charCount.textContent = '(' + this.value.length + '/500)';
        });
    }

    // Load saved guestbook entries from localStorage
    function loadGuestbookEntries() {
        var saved = localStorage.getItem('y2k-guestbook');
        if (!saved || !guestbookEntries) return;

        var entries = JSON.parse(saved);
        var heading = guestbookEntries.querySelector('h3');
        var insertPoint = heading ? heading.nextSibling : guestbookEntries.firstChild;

        entries.forEach(function(entry) {
            var div = createEntryElement(entry.name, entry.asl, entry.date, entry.message, entry.mood);
            guestbookEntries.insertBefore(div, insertPoint);
            // Keep inserting after the last inserted entry
            insertPoint = div.nextSibling;
        });
    }

    function createEntryElement(name, asl, date, message, mood) {
        var newEntry = document.createElement('div');
        newEntry.className = 'entry';

        var header = document.createElement('p');
        header.className = 'entry-header';
        header.textContent = 'From: ' + name + ' (' + asl + ') - ' + date;

        if (mood && moodEmojis[mood]) {
            var moodSpan = document.createElement('span');
            moodSpan.className = 'entry-mood';
            moodSpan.textContent = moodEmojis[mood];
            header.appendChild(moodSpan);
        }

        var msg = document.createElement('p');
        msg.className = 'entry-message';
        msg.textContent = message;

        newEntry.appendChild(header);
        newEntry.appendChild(msg);
        return newEntry;
    }

    function saveGuestbookEntry(entryData) {
        var saved = localStorage.getItem('y2k-guestbook');
        var entries = saved ? JSON.parse(saved) : [];
        entries.unshift(entryData);
        // Keep max 50 entries
        if (entries.length > 50) entries = entries.slice(0, 50);
        localStorage.setItem('y2k-guestbook', JSON.stringify(entries));
    }

    loadGuestbookEntries();

    if (guestbookForm && guestbookEntries) {
        guestbookForm.addEventListener('submit', function(e) {
            e.preventDefault();

            var name = document.getElementById('name').value;
            var asl = document.getElementById('asl').value;
            var message = document.getElementById('message').value;
            var mood = document.getElementById('mood').value;

            var now = new Date();
            var date = (now.getMonth() + 1).toString().padStart(2, '0') + '/' +
                       now.getDate().toString().padStart(2, '0') + '/' +
                       now.getFullYear();

            var newEntry = createEntryElement(name, asl, date, message, mood);

            var heading = guestbookEntries.querySelector('h3');
            var insertPoint = heading ? heading.nextSibling : guestbookEntries.firstChild;
            guestbookEntries.insertBefore(newEntry, insertPoint);

            saveGuestbookEntry({ name: name, asl: asl, date: date, message: message, mood: mood });

            guestbookForm.reset();
            if (charCount) charCount.textContent = '(0/500)';
            alert('Thanks for signing my guestbook!');
        });
    }

    // =========================================================================
    // Poll
    // =========================================================================
    var pollForm = document.getElementById('poll-form');
    var pollResults = document.querySelector('.poll-results');

    if (pollForm) {
        pollForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var selected = pollForm.querySelector('input[name="poll"]:checked');
            if (!selected) {
                alert('Please select an option before voting!');
                return;
            }
            pollForm.style.display = 'none';
            if (pollResults) pollResults.style.display = 'block';
            alert('Thanks for voting! ✨');
        });
    }

    // =========================================================================
    // Dead Link Handlers
    // =========================================================================
    document.querySelectorAll('.download-button').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Error 404: File not found!\nJust like the old days! 😄');
        });
    });

    document.querySelectorAll('.links a[href="#"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('This link is broken!\n\n"This page has been removed because GeoCities has closed."\n\nRIP GeoCities 1994-2009');
        });
    });

    document.querySelectorAll('.webring-nav a').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('The webring has disbanded.\nAll good things must come to an end! 💔');
        });
    });

    document.querySelectorAll('footer a[href="#"]').forEach(function(link) {
        if (link.id === 'toggle-music') return;
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Service no longer available.\nTry MySpace instead! 😂');
        });
    });

    // =========================================================================
    // Visitor Counter
    // =========================================================================
    var counter = document.getElementById('counter');
    if (counter) {
        var count = parseInt(localStorage.getItem('y2k-visitor-count'), 10);
        if (isNaN(count)) count = 1337;
        count++;
        localStorage.setItem('y2k-visitor-count', count);
        counter.textContent = count.toLocaleString();

        setInterval(function() {
            count++;
            localStorage.setItem('y2k-visitor-count', count);
            counter.textContent = count.toLocaleString();
        }, 60000);
    }

    // =========================================================================
    // Cursor Trail
    // =========================================================================
    var cursorTrail = document.getElementById('cursor-trail');
    if (cursorTrail) {
        var trailElements = [];
        var trailLength = 20;

        for (var i = 0; i < trailLength; i++) {
            var div = document.createElement('div');
            cursorTrail.appendChild(div);
            trailElements.push(div);
        }

        document.addEventListener('mousemove', function(e) {
            for (var j = trailElements.length - 1; j > 0; j--) {
                trailElements[j].style.left = trailElements[j-1].style.left;
                trailElements[j].style.top = trailElements[j-1].style.top;
            }
            trailElements[0].style.left = e.clientX + 'px';
            trailElements[0].style.top = e.clientY + 'px';
            trailElements.forEach(function(el, idx) {
                el.style.opacity = 1 - (idx / trailLength);
            });
        });
    }

    // =========================================================================
    // Sparkle Effect (pooled)
    // =========================================================================
    var sparklePool = [];
    var maxSparkles = 10;

    for (var s = 0; s < maxSparkles; s++) {
        var sparkle = document.createElement('div');
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

    var sparkleIdx = 0;
    setInterval(function() {
        var sp = sparklePool[sparkleIdx];
        sp.style.left = Math.random() * window.innerWidth + 'px';
        sp.style.top = Math.random() * window.innerHeight + 'px';
        sp.style.backgroundColor = 'hsl(' + (Math.random() * 360) + ', 100%, 75%)';
        sp.style.opacity = '1';
        setTimeout(function() { sp.style.opacity = '0'; }, 500);
        sparkleIdx = (sparkleIdx + 1) % maxSparkles;
    }, 500);

    // Blink construction images
    document.querySelectorAll('.construction img').forEach(function(el) {
        el.style.animation = 'blink 1s infinite';
    });

    // =========================================================================
    // FEATURE 2: Easter Eggs
    // =========================================================================

    // --- Easter Egg: Konami Code ---
    var konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    var konamiIndex = 0;

    // --- Easter Egg: BSOD (click under construction 5 times) ---
    var constructionClicks = 0;
    var bsod = document.getElementById('bsod');

    document.querySelectorAll('.construction img').forEach(function(img) {
        img.addEventListener('click', function() {
            constructionClicks++;
            if (constructionClicks >= 5 && bsod) {
                constructionClicks = 0;
                bsod.style.display = 'flex';

                // Allow dismissal after 2 seconds
                setTimeout(function() {
                    function dismissBsod(ev) {
                        bsod.style.display = 'none';
                        document.removeEventListener('keydown', dismissBsod);
                        document.removeEventListener('click', dismissBsod);
                    }
                    document.addEventListener('keydown', dismissBsod);
                    document.addEventListener('click', dismissBsod);
                }, 2000);
            }
        });
    });

    // --- Easter Egg: Y2K Glitch (type "y2k") ---
    var glitchSequence = ['y', '2', 'k'];
    var glitchIndex = 0;

    document.addEventListener('keydown', function(e) {
        // Konami code check
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

        // Y2K glitch check
        if (e.key.toLowerCase() === glitchSequence[glitchIndex]) {
            glitchIndex++;
            if (glitchIndex === glitchSequence.length) {
                glitchIndex = 0;
                triggerGlitch();
            }
        } else {
            glitchIndex = 0;
        }
    });

    function triggerGlitch() {
        document.body.classList.add('glitching');
        setTimeout(function() {
            document.body.classList.remove('glitching');
        }, 2000);
    }

    // =========================================================================
    // FEATURE 3: Y2K Trivia Quiz
    // =========================================================================
    var quizQuestions = [
        {
            question: 'What year did the movie "Titanic" come out?',
            options: ['1995', '1996', '1997', '1998'],
            correct: 2
        },
        {
            question: 'What does A/S/L stand for?',
            options: ['Age/Sex/Location', 'Always Searching Lazily', 'American Sign Language', 'Ask Someone Later'],
            correct: 0
        },
        {
            question: 'Which Spice Girl was known as "Scary Spice"?',
            options: ['Victoria Beckham', 'Mel C', 'Mel B', 'Emma Bunton'],
            correct: 2
        },
        {
            question: 'What was the name of the popular instant messaging service by AOL?',
            options: ['MSN Messenger', 'ICQ', 'AIM', 'Yahoo Pager'],
            correct: 2
        },
        {
            question: 'Which boy band sang "I Want It That Way"?',
            options: ['*NSYNC', 'Backstreet Boys', '98 Degrees', 'O-Town'],
            correct: 1
        },
        {
            question: 'What was the name of the free web hosting service by Yahoo?',
            options: ['Angelfire', 'Tripod', 'GeoCities', 'Xanga'],
            correct: 2
        },
        {
            question: 'What movie featured the quote "As if!"?',
            options: ['Mean Girls', 'Clueless', '10 Things I Hate About You', 'She\'s All That'],
            correct: 1
        },
        {
            question: 'What was the dominant search engine before Google?',
            options: ['Yahoo!', 'AskJeeves', 'AltaVista', 'Lycos'],
            correct: 2
        },
        {
            question: 'What file-sharing service was shut down in 2001?',
            options: ['LimeWire', 'Napster', 'Kazaa', 'BearShare'],
            correct: 1
        },
        {
            question: 'Which phone was the most popular in the late 90s?',
            options: ['Motorola Razr', 'Nokia 3310', 'BlackBerry', 'iPhone'],
            correct: 1
        },
        {
            question: 'What does "Y2K" stand for?',
            options: ['Year 2 Kilo', 'Year 2000', 'Youth 2000', 'Yesterday\'s 2K'],
            correct: 1
        },
        {
            question: 'Which TV show featured the characters Ross, Rachel, and Chandler?',
            options: ['Seinfeld', 'Frasier', 'Friends', 'Will & Grace'],
            correct: 2
        },
        {
            question: 'What was the standard internet connection speed in 1999?',
            options: ['56 kbps', '1 Mbps', '10 Mbps', '100 Mbps'],
            correct: 0
        },
        {
            question: 'What virtual pet was a 90s craze?',
            options: ['Furby', 'Tamagotchi', 'Neopets', 'Webkinz'],
            correct: 1
        },
        {
            question: 'Which movie had Leonardo DiCaprio saying "I\'m the king of the world!"?',
            options: ['Romeo + Juliet', 'The Beach', 'Titanic', 'The Man in the Iron Mask'],
            correct: 2
        }
    ];

    var quizState = {
        currentQuestion: 0,
        score: 0,
        questions: [],
        active: false
    };

    var quizQuestionEl = document.getElementById('quiz-question');
    var quizOptionsEl = document.getElementById('quiz-options');
    var quizProgressBar = document.getElementById('quiz-progress-bar');
    var quizScoreText = document.getElementById('quiz-score-text');
    var quizResult = document.getElementById('quiz-result');
    var quizFinalScore = document.getElementById('quiz-final-score');
    var quizBadge = document.getElementById('quiz-badge');
    var quizStartBtn = document.getElementById('quiz-start');
    var quizRestartBtn = document.getElementById('quiz-restart');

    function shuffleArray(arr) {
        var shuffled = arr.slice();
        for (var i = shuffled.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = shuffled[i];
            shuffled[i] = shuffled[j];
            shuffled[j] = temp;
        }
        return shuffled;
    }

    function startQuiz() {
        quizState.questions = shuffleArray(quizQuestions).slice(0, 10);
        quizState.currentQuestion = 0;
        quizState.score = 0;
        quizState.active = true;

        if (quizStartBtn) quizStartBtn.style.display = 'none';
        if (quizResult) quizResult.style.display = 'none';
        showQuestion();
    }

    function showQuestion() {
        if (!quizState.active) return;
        var q = quizState.questions[quizState.currentQuestion];
        var total = quizState.questions.length;

        if (quizQuestionEl) {
            quizQuestionEl.textContent = 'Q' + (quizState.currentQuestion + 1) + '/' + total + ': ' + q.question;
        }

        if (quizProgressBar) {
            quizProgressBar.style.width = ((quizState.currentQuestion / total) * 100) + '%';
        }

        if (quizScoreText) {
            quizScoreText.textContent = 'Score: ' + quizState.score + '/' + total;
        }

        if (quizOptionsEl) {
            quizOptionsEl.innerHTML = '';
            q.options.forEach(function(option, idx) {
                var btn = document.createElement('button');
                btn.className = 'quiz-option';
                btn.textContent = option;
                btn.addEventListener('click', function() {
                    handleAnswer(idx);
                });
                quizOptionsEl.appendChild(btn);
            });
        }
    }

    function handleAnswer(selectedIdx) {
        var q = quizState.questions[quizState.currentQuestion];
        var buttons = quizOptionsEl.querySelectorAll('.quiz-option');

        // Disable all buttons
        buttons.forEach(function(btn) { btn.classList.add('disabled'); });

        // Highlight correct and wrong
        buttons[q.correct].classList.add('correct');
        if (selectedIdx !== q.correct) {
            buttons[selectedIdx].classList.add('wrong');
        } else {
            quizState.score++;
        }

        if (quizScoreText) {
            quizScoreText.textContent = 'Score: ' + quizState.score + '/' + quizState.questions.length;
        }

        // Advance after delay
        setTimeout(function() {
            quizState.currentQuestion++;
            if (quizState.currentQuestion < quizState.questions.length) {
                showQuestion();
            } else {
                showQuizResult();
            }
        }, 1200);
    }

    function showQuizResult() {
        quizState.active = false;
        var total = quizState.questions.length;
        var score = quizState.score;
        var pct = Math.round((score / total) * 100);

        if (quizQuestionEl) quizQuestionEl.textContent = '';
        if (quizOptionsEl) quizOptionsEl.innerHTML = '';
        if (quizProgressBar) quizProgressBar.style.width = '100%';

        var badge = '';
        if (pct === 100) badge = '🏆 Y2K Master! You are totally all that!';
        else if (pct >= 80) badge = '⭐ Y2K Expert! You so totally rock!';
        else if (pct >= 60) badge = '✨ Y2K Fan! Talk to the hand... you know your stuff!';
        else if (pct >= 40) badge = '🌟 Y2K Newbie! Not bad, but study up buttercup!';
        else badge = '😬 Y2K Who? Were you even alive in the 90s?!';

        if (quizFinalScore) quizFinalScore.textContent = 'You scored ' + score + '/' + total + ' (' + pct + '%)';
        if (quizBadge) quizBadge.textContent = badge;
        if (quizResult) quizResult.style.display = 'block';
    }

    if (quizStartBtn) {
        quizStartBtn.addEventListener('click', startQuiz);
    }
    if (quizRestartBtn) {
        quizRestartBtn.addEventListener('click', startQuiz);
    }

    // =========================================================================
    // FEATURE 4: AIM Chat Simulator
    // =========================================================================
    var aimChat = document.getElementById('aim-chat');
    var aimMessages = document.getElementById('aim-messages');
    var aimInput = document.getElementById('aim-input');
    var aimSend = document.getElementById('aim-send');
    var aimClose = document.getElementById('aim-close');
    var aimMinimize = document.getElementById('aim-minimize');
    var aimTitlebar = document.getElementById('aim-titlebar');
    var aimChatTitle = document.getElementById('aim-chat-title');
    var aimTyping = document.getElementById('aim-typing');
    var aimTypingName = document.getElementById('aim-typing-name');

    var currentBuddy = null;
    var buddyResponseIndex = {};

    var buddyResponses = {
        ChandlerBing: [
            "Could this BE any more of a conversation?",
            "I'm not great at the advice. Can I interest you in a sarcastic comment?",
            "I say more dumb things before 9am than most people say all day.",
            "I'm hopeless, and awkward, and desperate for love!",
            "So it seems like this internet thing is here to stay.",
            "Okay, you have to stop the Q-tip when there's resistance!",
            "I'm funny, right? What do you know, you're a door!"
        ],
        RossGeller: [
            "We were on a BREAK!",
            "PIVOT! PIVOT! PIVOOOOT!",
            "You know, I have a PhD... just saying.",
            "It's not that common, it doesn't happen to every guy, and it IS a big deal!",
            "I'm fine. TOTALLY FINE.",
            "My sandwich? MY SANDWICH?!",
            "Could you BE any more like Chandler right now?"
        ],
        MonicaGeller: [
            "I KNOW! *claps excitedly*",
            "Welcome! Make yourself at home... but use a coaster!",
            "I got the place clean, made lunch, AND reorganized the closet. What have YOU done today?",
            "Rules are good! Rules help control the fun!",
            "SEVEN! SEVEN! SEVEN!",
            "I'm breezy! I'm not trying to be breezy, I AM breezy!",
            "That's it! You just lost your bathroom privileges!"
        ],
        PhoebeBuffay: [
            "Oh, I wish I could but I don't want to.",
            "Smelly cat, smelly cat... what are they feeding you?",
            "She's your lobster!",
            "I don't even have a pla.",
            "Come on, Ross, you're a paleontologist. Dig a little deeper.",
            "My eyes! MY EYES!",
            "I'm a very open-minded person. But this is too much."
        ]
    };

    // Open chat when clicking a buddy
    document.querySelectorAll('.buddy').forEach(function(buddy) {
        buddy.addEventListener('click', function() {
            if (this.classList.contains('offline')) {
                alert(this.dataset.buddy + ' is offline.\nAway message: "' + (this.dataset.away || 'Gone') + '"');
                return;
            }

            currentBuddy = this.dataset.buddy;
            if (!buddyResponseIndex[currentBuddy]) buddyResponseIndex[currentBuddy] = 0;

            if (aimChat) aimChat.style.display = 'block';
            if (aimChatTitle) aimChatTitle.textContent = currentBuddy + ' - Instant Message';
            if (aimTypingName) aimTypingName.textContent = currentBuddy;
            if (aimMessages) aimMessages.innerHTML = '';

            // Opening message
            addAimMessage(currentBuddy, getGreeting(currentBuddy), false);
        });
    });

    function getGreeting(buddy) {
        var greetings = {
            ChandlerBing: "Hey! Could this chat BE any more exciting?",
            RossGeller: "Hey! Did you know the word 'chat' comes from Middle English?",
            MonicaGeller: "Hi! Oh good, I was just organizing my buddy list alphabetically!",
            PhoebeBuffay: "Oh hi! My psychic told me someone would message me today!"
        };
        return greetings[buddy] || "Hey there!";
    }

    function addAimMessage(username, text, isSelf) {
        if (!aimMessages) return;
        var msgDiv = document.createElement('div');
        msgDiv.className = 'aim-msg';

        var nameSpan = document.createElement('span');
        nameSpan.className = 'aim-username ' + (isSelf ? 'self' : 'buddy');
        nameSpan.textContent = username + ': ';

        var textNode = document.createTextNode(text);

        msgDiv.appendChild(nameSpan);
        msgDiv.appendChild(textNode);
        aimMessages.appendChild(msgDiv);
        aimMessages.scrollTop = aimMessages.scrollHeight;
    }

    function getBuddyResponse(buddy) {
        var responses = buddyResponses[buddy];
        if (!responses) return "...";
        var idx = buddyResponseIndex[buddy] % responses.length;
        buddyResponseIndex[buddy]++;
        return responses[idx];
    }

    function sendAimMessage() {
        if (!aimInput || !currentBuddy) return;
        var text = aimInput.value.trim();
        if (!text) return;

        addAimMessage('You', text, true);
        aimInput.value = '';

        // Show typing indicator
        if (aimTyping) aimTyping.style.display = 'block';

        // Buddy responds after a delay
        var delay = 1000 + Math.random() * 2000;
        setTimeout(function() {
            if (aimTyping) aimTyping.style.display = 'none';
            addAimMessage(currentBuddy, getBuddyResponse(currentBuddy), false);
        }, delay);
    }

    if (aimSend) {
        aimSend.addEventListener('click', sendAimMessage);
    }

    if (aimInput) {
        aimInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendAimMessage();
            }
        });
    }

    if (aimClose) {
        aimClose.addEventListener('click', function() {
            if (aimChat) aimChat.style.display = 'none';
            currentBuddy = null;
        });
    }

    if (aimMinimize) {
        aimMinimize.addEventListener('click', function() {
            if (aimChat) aimChat.style.display = 'none';
        });
    }

    // Draggable AIM window
    if (aimTitlebar && aimChat) {
        var isDragging = false;
        var dragOffsetX = 0;
        var dragOffsetY = 0;

        aimTitlebar.addEventListener('mousedown', function(e) {
            if (e.target.tagName === 'BUTTON') return;
            isDragging = true;
            var rect = aimChat.getBoundingClientRect();
            dragOffsetX = e.clientX - rect.left;
            dragOffsetY = e.clientY - rect.top;
            e.preventDefault();
        });

        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            aimChat.style.left = (e.clientX - dragOffsetX) + 'px';
            aimChat.style.top = (e.clientY - dragOffsetY) + 'px';
            aimChat.style.right = 'auto';
            aimChat.style.bottom = 'auto';
        });

        document.addEventListener('mouseup', function() {
            isDragging = false;
        });
    }

    // =========================================================================
    // Done!
    // =========================================================================
});
