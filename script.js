// Fade-in animation on scroll

document.addEventListener('DOMContentLoaded', function () {
    // Fade-in
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    };
    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, appearOptions);
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navbar = document.querySelector('.navbar');
                    const yOffset = navbar ? navbar.offsetHeight : 0;
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    if (yOffset) {
                        setTimeout(() => {
                            window.scrollBy({ top: -yOffset + 1, left: 0, behavior: 'instant' });
                        }, 400);
                    }
                }
                // 모바일 메뉴 닫기
                document.querySelector('.nav-menu').classList.remove('open');
            }
        });
    });

    // Hamburger menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('open');
    });
    // 메뉴 외부 클릭 시 닫기 (모바일)
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('open');
        }
    });

    // '지금 시작하기' 버튼 클릭 시 상담신청 섹션으로 스크롤
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            const contact = document.getElementById('contact');
            if (contact) {
                const navbar = document.querySelector('.navbar');
                const yOffset = navbar ? navbar.offsetHeight : 0;
                contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (yOffset) {
                    setTimeout(() => {
                        window.scrollBy({ top: -yOffset + 1, left: 0, behavior: 'instant' });
                    }, 400);
                }
            }
        });
    }

    // 문제 카드 자동 스크롤
    const problemCards = document.querySelector('.problem-cards');
    if (problemCards && problemCards.children.length > 1) {
        let currentIndex = 0;
        const cards = Array.from(problemCards.children);
        const scrollInterval = 2500; // ms
        setInterval(() => {
            const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(problemCards).gap || 0);
            currentIndex++;
            if (currentIndex >= cards.length) {
                currentIndex = 0;
            }
            problemCards.scrollTo({
                left: cardWidth * currentIndex,
                behavior: 'smooth'
            });
        }, scrollInterval);
    }

    // 특징 카드 무한 가로 자동 스크롤
    const featuresCards = document.querySelector('.features-cards');
    if (featuresCards && featuresCards.children.length > 1) {
        let scrollPos = 0;
        const cardEls = Array.from(featuresCards.children);
        const cardWidth = cardEls[0].offsetWidth + parseInt(getComputedStyle(featuresCards).gap || 0);
        // 무한 스크롤을 위해 카드 복제
        cardEls.forEach(card => {
            const clone = card.cloneNode(true);
            featuresCards.appendChild(clone);
        });
        function autoScrollFeatures() {
            scrollPos += 1.2; // px per frame
            if (scrollPos >= cardWidth * cardEls.length) {
                scrollPos = 0;
            }
            featuresCards.scrollLeft = scrollPos;
            requestAnimationFrame(autoScrollFeatures);
        }
        requestAnimationFrame(autoScrollFeatures);
    }
});