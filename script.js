/* ============================================
   LEBRONIFY WEBSITE - SCRIPTS
   Landing page: in-page song previews, the turntable, confetti,
   and all the little bits of fun.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
    const icon = (name, size) => (window.LBIcons ? window.LBIcons.svg(name, size) : '');
    const track = (event, params) => { if (window.LBAnalytics) window.LBAnalytics.track(event, params); };
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const escapeHtml = (str) => String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // -------------------------------------------
    // Song data — mirrors SONGS in app.js
    // -------------------------------------------
    const songs = [
        { title: "Ain't It Bron", artist: "hen.bouselog", image: "ain't_it_bron.png", audio: "Ain't It Bron - hen.bouselog.mp3" },
        { title: "All LeBron Things", artist: "jeremytache", image: "all_lebron_things.png", audio: "All LeBron Things - jeremytache.mp3" },
        { title: "Bring Me Back To Bron", artist: "LeBron Fan", image: "bring_me_back_to_bron.png", audio: "Bring Me Back To Bron.mp3" },
        { title: "Bron Royalty", artist: "ilyaugust", image: "bron_royalty.png", audio: "Bron Royalty - ilyaugust.mp3" },
        { title: "Bronpeii", artist: "ilyaugust", image: "bronpeii.png", audio: "Bronpeii - ilyaugust.mp3" },
        { title: "Brons Not Brongedies", artist: "ilyaugust", image: "brons_not_brongedies.png", audio: "Brons Not Brongedies - ilyaugust.mp3" },
        { title: "Brontastic", artist: "ilyaugust", image: "brontastic.png", audio: "Brontastic - ilyaugust.mp3" },
        { title: "Catch a LeNade For You", artist: "ilyaugust", image: "catch_a_lenade_for_you.png", audio: "Catch a LeNade For You - ilyaugust.mp3" },
        { title: "Dear LeBron", artist: "sdotreidy", image: "dear_lebron.png", audio: "Dear LeBron - sdotreidy.mp3" },
        { title: "Dunk With a Smile", artist: "LeBron Fan", image: "dunk_with_a_smile.png", audio: "Dunk With a Smile.mp3" },
        { title: "He Is LeBron James", artist: "My Way", image: "he_is_lebron_james.png", audio: "He Is Lebron James - My Way.mp3" },
        { title: "He Is The King", artist: "LeBron Fan", image: "he_is_the_king.png", audio: "He is The King.mp3" },
        { title: "I'm Like That's Bron", artist: "ilyaugust", image: "i'm_like_that's_bron.png", audio: "I'm Like That's Bron - ilyaugust.mp3" },
        { title: "I Believe in LeBron", artist: "imakeparodyzz", image: "i_believe_in_lebron.png", audio: "I Believe in LeBron - imakeparodyzz.mp3" },
        { title: "I Glazed LeBron (And I Liked It)", artist: "timringling", image: "i_glazed_lebron_(and_i_liked_it).png", audio: "I Glazed LeBron (And I Liked It) - timringling.mp3" },
        { title: "In The Bron", artist: "ilyaugust", image: "in_the_bron.png", audio: "In The Bron - ilyaugust.mp3" },
        { title: "La Bron Bron Land", artist: "House of Highlights", image: "la_bron_bron_land.png", audio: "La Bron Bron Land - House of Highlights.mp3" },
        { title: "Le Bronba", artist: "enrique_l_garibay", image: "le_bronba.png", audio: "Le Bronba - enrique_l_garibay.mp3" },
        { title: "LeAfrica", artist: "standleyjohnsonmusic", image: "leafrica.png", audio: "LeAfrica - standleyjohnsonmusic.mp3" },
        { title: "LeAll of Me", artist: "musicbykidb", image: "leall_of_me.png", audio: "LeAll of Me - musicbykidb.mp3" },
        { title: "LeBron, LeBron, LeBron", artist: "LeBron Fan", image: "lebron,_lebron,_lebron.png", audio: "LeBron, LeBron, LeBron.mp3" },
        { title: "LeBron Has Taken a Toll", artist: "ilyaugust", image: "lebron_has_taken_a_toll.png", audio: "LeBron Has Taken a Toll - ilyaugust.mp3" },
        { title: "LeBron That I Used to Know", artist: "LeBron Fan", image: "lebron_that_i_used_to_know.png", audio: "LeBron That I Used to Know.mp3" },
        { title: "LeBronifornia Girls", artist: "izzydrip", image: "lebronifornia_girls.png", audio: "LeBronifornia Girls - izzydrip.mp3" },
        { title: "LeBrons Wide Open", artist: "timringling", image: "lebrons_wide_open.png", audio: "LeBrons Wide Open - timringling.mp3" },
        { title: "LeCurious James", artist: "leiheart.radio.station", image: "lecurious_james.png", audio: "LeCurious James - leiheart.radio.station.mp3" },
        { title: "LeEarned It", artist: "kai.so", image: "leearned_it.png", audio: "LeEarned It - kai.so.mp3" },
        { title: "LeGolden Hour", artist: "ilyaugust", image: "legolden_hour.png", audio: "LeGolden Hour - ilyaugust.mp3" },
        { title: "LeHips Don't Lie", artist: "ant.jr06", image: "lehips_don't_lie.png", audio: "LeHips Don't Lie - ant.jr06.mp3" },
        { title: "LeLove Yourself", artist: "musicbykidb", image: "lelove_yourself.png", audio: "LeLove Yourself - musicbykidb.mp3" },
        { title: "LeStiches", artist: "ilyaugust", image: "lestiches.png", audio: "LeStiches - ilyaugust.mp3" },
        { title: "Let LeBron Know", artist: "LeBron Fan", image: "let_lebron_know.png", audio: "Let LeBron Know.mp3" },
        { title: "Life is a LeHighway", artist: "jeppreyjung", image: "life_is_a_lehighway.png", audio: "Life is a LeHighway - jeppreyjung.mp3" },
        { title: "Man On The Lakers", artist: "Talented Blake", image: "man_on_the_lakers.png", audio: "Man On The Lakers - Talented Blake.mp3" },
        { title: "Marry Bron", artist: "ilyaugust", image: "marry_bron.png", audio: "Marry Bron - ilyaugust.mp3" },
        { title: "No Bron", artist: "ilyaugust", image: "no_bron.png", audio: "No Bron - ilyaugust.mp3" },
        { title: "Not Like Bron", artist: "vonpierreofficial", image: "not_like_bron.png", audio: "Not Like Bron - vonpierreofficial.mp3" },
        { title: "Oh Mr LeBron", artist: "LeBron Fan", image: "oh_mr_lebron.png", audio: "Oh Mr LeBron.mp3" },
        { title: "Romantic Bronicide", artist: "ilyaugust", image: "romantic_bronicide.png", audio: "Romantic Bronicide - ilyaugust.mp3" },
        { title: "Shut Up and Dance With Bron", artist: "ilyaugust", image: "shut_up_and_dance_with_bron.png", audio: "Shut Up and Dance With Bron - ilyaugust.mp3" },
        { title: "Still Glazing You", artist: "musicbykidb", image: "still_glazing_you.png", audio: "Still Glazing You - musicbykidb.mp3" },
        { title: "Sweet LeScape", artist: "ilyaugust", image: "sweet_lescape.png", audio: "Sweet LeScape - ilyaugust.mp3" },
        { title: "TACO TUESDAYYYYY", artist: "LeBron James", image: "taco_tuesday.jpg", audio: "Taco Tuesday.mp3" },
        { title: "That's Bron", artist: "JJ Darrow", image: "that's_bron.png", audio: "That's Bron - JJ Darrow.mp3" },
        { title: "That's What Makes Bron Beautiful", artist: "ilyaugust", image: "that's_what_makes_bron_beautiful.png", audio: "That's What Makes Bron Beautiful - ilyaugust.mp3" },
        { title: "Thinkin Bout LeBron", artist: "ilyaugust", image: "thinkin_bout_lebron.png", audio: "Thinkin Bout LeBron - ilyaugust.mp3" },
        { title: "This is The Bron", artist: "fanoftatum0", image: "this_is_the_bron.png", audio: "This is The Bron - fanoftatum0.mp3" },
        { title: "Towards The Bron", artist: "ilyaugust", image: "towards_the_bron.png", audio: "Towards The Bron - ilyaugust.mp3" },
        { title: "You Are My Sunshine", artist: "LeBron Fan", image: "you_are_my_sunshine.png", audio: "You Are My Sunshine.mp3" },
    ];

    const imgSrc = (song) => `images/albums/${song.image}`;
    const audioSrc = (song) => `songs/${encodeURIComponent(song.audio)}`;

    // -------------------------------------------
    // FX canvas: confetti bursts + the crown cursor trail
    // -------------------------------------------
    const fx = (() => {
        const canvas = $('#fx-canvas');
        if (!canvas) return { burst() {}, crown() {} };
        const ctx = canvas.getContext('2d');
        const COLORS = ['#006bb6', '#3fa9ff', '#ed174c', '#ff3b6b', '#ffffff', '#fdb927'];
        let parts = [];
        let running = false;
        let dpr = 1;

        function resize() {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
        resize();
        window.addEventListener('resize', resize);

        function drawCrownShape(size) {
            const s = size / 20;
            ctx.beginPath();
            ctx.moveTo(-8 * s, 6 * s);
            ctx.lineTo(-6 * s, -2 * s);
            ctx.lineTo(-3 * s, 2 * s);
            ctx.lineTo(0, -6 * s);
            ctx.lineTo(3 * s, 2 * s);
            ctx.lineTo(6 * s, -2 * s);
            ctx.lineTo(8 * s, 6 * s);
            ctx.closePath();
            ctx.fill();
        }

        function loop() {
            ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
            parts = parts.filter((p) => p.life > 0);
            for (const p of parts) {
                p.vx *= p.drag;
                p.vy = p.vy * p.drag + p.gravity;
                p.x += p.vx;
                p.y += p.vy;
                p.rot += p.vr;
                p.life -= p.decay;
                ctx.save();
                ctx.globalAlpha = Math.max(0, Math.min(1, p.life));
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rot);
                ctx.fillStyle = p.color;
                if (p.kind === 'crown') {
                    drawCrownShape(p.size);
                } else if (p.kind === 'star') {
                    ctx.font = `${p.size * 1.6}px sans-serif`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText('★', 0, 0);
                } else {
                    // Confetti ribbon: flip with rotation for a paper-in-the-air look.
                    ctx.scale(1, Math.cos(p.rot * 2));
                    ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
                }
                ctx.restore();
            }
            if (parts.length) requestAnimationFrame(loop);
            else running = false;
        }

        function start() {
            if (!running) {
                running = true;
                requestAnimationFrame(loop);
            }
        }

        return {
            /* Confetti cannon from (x, y) in viewport coords. */
            burst(x, y, count = 90, spread = 1) {
                if (reduceMotion.matches) return;
                for (let i = 0; i < count; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = (4 + Math.random() * 9) * spread;
                    const roll = Math.random();
                    parts.push({
                        x, y,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed - 6 * spread,
                        gravity: 0.32,
                        drag: 0.965,
                        rot: Math.random() * Math.PI,
                        vr: (Math.random() - 0.5) * 0.4,
                        size: 8 + Math.random() * 8,
                        life: 1.4 + Math.random() * 0.6,
                        decay: 0.012,
                        color: roll < 0.08 ? '#fdb927' : randomFrom(COLORS),
                        kind: roll < 0.08 ? 'crown' : roll < 0.16 ? 'star' : 'paper',
                    });
                }
                start();
            },
            /* A single small crown for the cursor trail. */
            crown(x, y) {
                parts.push({
                    x, y,
                    vx: (Math.random() - 0.5) * 1.2,
                    vy: -0.4 - Math.random() * 0.6,
                    gravity: 0, drag: 1,
                    rot: (Math.random() - 0.5) * 0.5, vr: 0,
                    size: 10 + Math.random() * 8,
                    life: 0.6, decay: 0.02,
                    color: Math.random() > 0.35 ? '#3fa9ff' : '#ff3b6b',
                    kind: 'crown',
                });
                start();
            },
        };
    })();

    function burstFrom(el, count, spread) {
        const r = el.getBoundingClientRect();
        fx.burst(r.left + r.width / 2, r.top + r.height / 2, count, spread);
    }

    // Crown trail follows the mouse on desktop only.
    if (finePointer.matches && !reduceMotion.matches) {
        let lastEmit = 0;
        document.addEventListener('mousemove', (e) => {
            const now = performance.now();
            if (now - lastEmit > 70) {
                fx.crown(e.clientX, e.clientY);
                lastEmit = now;
            }
        }, { passive: true });
    }

    // -------------------------------------------
    // Jumbotron ticker
    // -------------------------------------------
    function fillTicker(el, list) {
        if (!el) return;
        const html = list.map((s) => `<span>${escapeHtml(s.title)}</span>`).join('');
        // Two copies so the -50% marquee loops seamlessly.
        el.innerHTML = html + html;
    }
    const shuffled = songs.slice().sort(() => Math.random() - 0.5);
    fillTicker($('#ticker-a'), shuffled.slice(0, 18));
    fillTicker($('#ticker-b'), shuffled.slice(18, 36));

    // -------------------------------------------
    // Roster grid
    // -------------------------------------------
    const grid = $('#roster-grid');
    if (grid) {
        grid.innerHTML = songs.map((song, i) => `
            <li>
                <button type="button" class="song" data-index="${i}" aria-label="Play ${escapeHtml(song.title)} by ${escapeHtml(song.artist)}">
                    <span class="song-art">
                        <img src="${escapeHtml(imgSrc(song))}" alt="" loading="lazy" width="200" height="200">
                        <span class="song-eq"><span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span></span>
                        <span class="song-play" aria-hidden="true">${icon('play', 20)}</span>
                    </span>
                    <span class="song-title">${escapeHtml(song.title)}</span>
                    <span class="song-artist">${escapeHtml(song.artist)}</span>
                </button>
            </li>`).join('');

        grid.addEventListener('click', (e) => {
            const btn = e.target.closest('.song');
            if (!btn) return;
            const i = Number(btn.dataset.index);
            if (i === player.index) player.toggle();
            else player.play(i, 'roster');
        });

        const more = $('#roster-more');
        const toggle = $('#roster-toggle');
        if (more && toggle) {
            const label = $('.roster-toggle-label', toggle);
            more.hidden = false;
            label.textContent = `See all ${songs.length} songs`;
            toggle.addEventListener('click', () => {
                const expanded = grid.classList.toggle('collapsed') === false;
                toggle.setAttribute('aria-expanded', String(expanded));
                label.textContent = expanded ? 'Show fewer' : `See all ${songs.length} songs`;
                if (!expanded) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
    }

    // -------------------------------------------
    // Preview player (one <audio>, shared by every play control on the page)
    // -------------------------------------------
    const player = (() => {
        const audio = new Audio();
        audio.preload = 'none';
        const dock = $('#dock');
        const dockFill = $('#dock-fill');
        const dockBar = $('#dock-progress');
        const dockPlay = $('#dock-play');
        const vinyl = $('#vinyl');
        const vinylArt = $('#vinyl-art');
        const npChip = $('#np-chip');
        const heroBtn = $('#hero-preview');
        const potdPlay = $('#potd-play');

        const api = { index: -1, playing: false };

        function setPlaying(on) {
            api.playing = on;
            document.body.classList.toggle('is-audio-playing', on);
            if (vinyl) vinyl.classList.toggle('spinning', on);
            if (npChip) npChip.classList.toggle('is-playing', on);
            if (dock) dock.classList.toggle('is-playing', on);
            if (dockPlay) {
                dockPlay.innerHTML = icon(on ? 'pause' : 'play', 22);
                dockPlay.setAttribute('aria-label', on ? 'Pause' : 'Play');
            }
            if (heroBtn) {
                heroBtn.classList.toggle('is-playing', on);
                heroBtn.innerHTML = `${icon(on ? 'pause' : 'headphones', 20)}<span>${on ? 'Pause the Banger' : 'Hear a Banger'}</span>`;
            }
            $$('.song').forEach((el) => {
                const current = Number(el.dataset.index) === api.index;
                el.classList.toggle('is-current', current);
                el.classList.toggle('is-playing', current && on);
                const playIcon = $('.song-play', el);
                if (playIcon) playIcon.innerHTML = icon(current && on ? 'pause' : 'play', 20);
            });
            if (potdPlay) {
                const potdOn = on && api.index === potdIndex;
                potdPlay.classList.toggle('is-playing', potdOn);
                potdPlay.innerHTML = icon(potdOn ? 'pause' : 'play', 18);
            }
        }

        function show(song) {
            if (vinylArt) vinylArt.src = imgSrc(song);
            $('#np-chip-title').textContent = song.title;
            $('#np-chip-artist').textContent = song.artist;
            if (dock) {
                dock.hidden = false;
                document.body.classList.add('has-dock');
                $('#dock-art').src = imgSrc(song);
                $('#dock-title').textContent = song.title;
                $('#dock-artist').textContent = song.artist;
            }
            if ('mediaSession' in navigator) {
                navigator.mediaSession.metadata = new MediaMetadata({
                    title: song.title,
                    artist: song.artist,
                    album: 'LeBronify',
                    artwork: [{ src: new URL(imgSrc(song), location.href).href, sizes: '512x512' }],
                });
            }
        }

        api.play = (i, source) => {
            const song = songs[(i + songs.length) % songs.length];
            api.index = songs.indexOf(song);
            show(song);
            audio.src = audioSrc(song);
            audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
            setPlaying(true);
            if (source) track('landing_preview', { song: song.title, source });
        };
        api.pause = () => { audio.pause(); setPlaying(false); };
        api.resume = () => { audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false)); };
        api.toggle = () => {
            if (api.index < 0) return api.random('toggle');
            if (api.playing) api.pause();
            else api.resume();
        };
        api.next = () => api.play(api.index + 1);
        api.prev = () => {
            if (audio.currentTime > 3) audio.currentTime = 0;
            else api.play(api.index - 1);
        };
        api.random = (source) => {
            let i;
            do { i = Math.floor(Math.random() * songs.length); } while (i === api.index && songs.length > 1);
            api.play(i, source);
            return i;
        };
        api.close = () => {
            api.pause();
            if (dock) dock.hidden = true;
            document.body.classList.remove('has-dock');
        };

        audio.addEventListener('ended', api.next);
        audio.addEventListener('pause', () => { if (api.playing && audio.paused) setPlaying(false); });
        audio.addEventListener('timeupdate', () => {
            if (!audio.duration) return;
            const pct = (audio.currentTime / audio.duration) * 100;
            if (dockFill) dockFill.style.width = `${pct}%`;
            if (dockBar) dockBar.setAttribute('aria-valuenow', String(Math.round(pct)));
        });

        if (dockPlay) dockPlay.addEventListener('click', api.toggle);
        $('#dock-next')?.addEventListener('click', api.next);
        $('#dock-prev')?.addEventListener('click', api.prev);
        $('#dock-close')?.addEventListener('click', api.close);
        if (dockBar) {
            dockBar.addEventListener('click', (e) => {
                if (!audio.duration) return;
                const r = dockBar.getBoundingClientRect();
                audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration;
            });
            dockBar.addEventListener('keydown', (e) => {
                if (!audio.duration) return;
                if (e.key === 'ArrowRight') audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
                if (e.key === 'ArrowLeft') audio.currentTime = Math.max(0, audio.currentTime - 5);
            });
        }
        if ('mediaSession' in navigator) {
            navigator.mediaSession.setActionHandler('play', api.resume);
            navigator.mediaSession.setActionHandler('pause', api.pause);
            navigator.mediaSession.setActionHandler('nexttrack', api.next);
            navigator.mediaSession.setActionHandler('previoustrack', api.prev);
        }
        return api;
    })();

    // -------------------------------------------
    // Hero: preview button, boopable King, pointer parallax
    // -------------------------------------------
    const heroBtn = $('#hero-preview');
    if (heroBtn) heroBtn.addEventListener('click', () => player.toggle());

    const KING_LINES = ['Boop me!', 'Again!', 'Banger alert!', 'Taco Tuesday?', "That's Bron!", 'Witness!', 'Strive for greatness', 'Not 1, not 2...', 'Chalk toss!', 'Trust the process'];
    const king = $('#king');
    const kingBubble = $('#king-bubble');
    if (king) {
        king.addEventListener('click', () => {
            king.classList.remove('booped');
            void king.offsetWidth; // restart the animation
            king.classList.add('booped');
            burstFrom(king, 110, 1.1);
            if (kingBubble) kingBubble.textContent = randomFrom(KING_LINES.slice(1));
            player.random('king');
        });
    }

    const heroVisual = $('#hero-visual');
    if (heroVisual && finePointer.matches && !reduceMotion.matches) {
        const layers = $$('[data-depth]', heroVisual);
        const hero = $('#hero');
        hero.addEventListener('pointermove', (e) => {
            const r = hero.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            layers.forEach((el) => {
                const d = Number(el.dataset.depth);
                el.style.transform = `translate3d(${px * d}px, ${py * d}px, 0)`;
            });
        });
        hero.addEventListener('pointerleave', () => layers.forEach((el) => { el.style.transform = ''; }));
    }

    // -------------------------------------------
    // Nav: glass on scroll, full-screen mobile menu
    // -------------------------------------------
    const nav = $('#nav');
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const burger = $('#nav-burger');
    const navLinks = $('#nav-links');
    function setMenu(open) {
        burger.classList.toggle('active', open);
        navLinks.classList.toggle('active', open);
        nav.classList.toggle('menu-open', open);
        burger.setAttribute('aria-expanded', String(open));
        burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        document.body.style.overflow = open ? 'hidden' : '';
    }
    if (burger && navLinks) {
        burger.addEventListener('click', () => setMenu(!navLinks.classList.contains('active')));
        $$('a', navLinks).forEach((a) => a.addEventListener('click', () => setMenu(false)));
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && navLinks.classList.contains('active')) setMenu(false); });
    }

    // -------------------------------------------
    // Scoreboard counters
    // -------------------------------------------
    function animateCounter(el) {
        const target = parseInt(el.dataset.target, 10);
        if (reduceMotion.matches || target === 0) { el.textContent = String(target); return; }
        const duration = 1600;
        const start = performance.now();
        (function tick(now) {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 4);
            el.textContent = String(Math.round(target * eased));
            if (t < 1) requestAnimationFrame(tick);
        })(start);
    }
    const counterObs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            animateCounter(entry.target);
            counterObs.unobserve(entry.target);
        });
    }, { threshold: 0.5 });
    $$('.count').forEach((el) => counterObs.observe(el));

    // -------------------------------------------
    // Scroll reveal (staggers cards that arrive together)
    // -------------------------------------------
    const revealObs = new IntersectionObserver((entries) => {
        entries
            .filter((entry) => entry.isIntersecting)
            .forEach((entry, i) => {
                setTimeout(() => entry.target.classList.add('visible'), Math.min(i, 6) * 80);
                revealObs.unobserve(entry.target);
            });
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
    $$('[data-animate]').forEach((el) => revealObs.observe(el));

    // -------------------------------------------
    // Cursor spotlight on cards
    // -------------------------------------------
    if (finePointer.matches) {
        document.addEventListener('pointermove', (e) => {
            const card = e.target.closest && e.target.closest('.spot');
            if (!card) return;
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - r.left}px`);
            card.style.setProperty('--my', `${e.clientY - r.top}px`);
        }, { passive: true });
    }

    // -------------------------------------------
    // Pick of the Day + Let The King Decide
    // -------------------------------------------
    // Same rotation as getSongOfDay() in app.js, minus the Tuesday coin-flip.
    let potdIndex = Math.floor(Date.now() / 86400000) % songs.length;
    const potd = $('#potd');
    function showPotd(i) {
        const song = songs[i];
        const cards = $$('.potd-card', potd);
        const next = [songs[(i + 1) % songs.length], songs[(i + 2) % songs.length]];
        cards[2].src = imgSrc(song);
        cards[1].src = imgSrc(next[0]);
        cards[0].src = imgSrc(next[1]);
        $('#potd-title').textContent = song.title;
        $('#potd-artist').textContent = song.artist;
        potd.classList.remove('shuffling');
        void potd.offsetWidth;
        potd.classList.add('shuffling');
    }
    if (potd) {
        showPotd(potdIndex);
        $('#potd-play').addEventListener('click', () => {
            if (player.index === potdIndex) player.toggle();
            else player.play(potdIndex, 'potd');
        });
    }

    const kingDecide = $('#king-decide');
    if (kingDecide) {
        kingDecide.addEventListener('click', () => {
            const i = player.random('king_decide');
            burstFrom(kingDecide, 60, 0.8);
            const btn = $(`.song[data-index="${i}"]`);
            if (btn) {
                // Reveal the pick if it's hidden behind "See all".
                if (btn.offsetParent === null) $('#roster-toggle')?.click();
                btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    // -------------------------------------------
    // Ring The Bell
    // -------------------------------------------
    const bell = $('#bell-btn');
    if (bell) {
        bell.addEventListener('click', () => {
            bell.classList.remove('ringing');
            void bell.offsetWidth;
            bell.classList.add('ringing');
            burstFrom(bell, 120, 1.1);
            track('landing_bell');
        });
    }

    // -------------------------------------------
    // App Breakdown tabs with a sliding pill
    // -------------------------------------------
    const seg = $('.seg');
    const segPill = $('.seg-pill');
    const tabBtns = $$('.tab-btn');
    function movePill(btn) {
        if (!segPill || !btn) return;
        segPill.style.left = `${btn.offsetLeft}px`;
        segPill.style.width = `${btn.offsetWidth}px`;
    }
    tabBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            tabBtns.forEach((b) => {
                const on = b === btn;
                b.classList.toggle('active', on);
                b.setAttribute('aria-selected', String(on));
            });
            $$('.breakdown-panel').forEach((panel) => panel.classList.toggle('active', panel.id === `tab-${btn.dataset.tab}`));
            movePill(btn);
        });
    });
    if (seg) {
        movePill($('.tab-btn.active'));
        window.addEventListener('resize', () => movePill($('.tab-btn.active')));
        // Fonts can shift button widths after first paint.
        if (document.fonts) document.fonts.ready.then(() => movePill($('.tab-btn.active')));
    }

    // -------------------------------------------
    // AD breaks: dismissing him only summons the next one
    // -------------------------------------------
    const AD_DATA = [
        { title: 'THE BROW KNOWS', img: 'images/ui/ad_pose1.jpg', msg: "Need more hang time? Try AD's secret workout routine!", dismiss: 'Trade AD to Dallas' },
        { title: 'AD APPROVED', img: 'images/ui/ad_pose2.jpg', msg: "Anthony Davis says: 'These parodies hit harder than my blocks!'", dismiss: 'Send AD to the Bench' },
        { title: 'BROW DOWN', img: 'images/ui/anthony_davis_default.jpg', msg: 'The Brow demands you listen to at least 3 more songs!', dismiss: 'AD Fouled Out - Skip' },
        { title: 'TRADE OFFER', img: 'images/ui/ad_pose2.jpg', msg: 'You receive: more parodies. AD receives: your undivided attention.', dismiss: 'Decline Trade' },
        { title: 'THE UNIBROW SPEAKS', img: 'images/ui/anthony_davis_default.jpg', msg: "AD's eyebrow has its own gravitational pull. And opinions.", dismiss: 'Wax the Brow' },
        { title: 'GLASS MAN GLAZING', img: 'images/ui/ad_pose1.jpg', msg: 'Anthony Davis is OUT tonight with a sore playlist finger.', dismiss: 'Day-to-Day' },
    ];
    let adIndex = 0;
    const adDismiss = $('#ad-dismiss');
    if (adDismiss) {
        adDismiss.addEventListener('click', () => {
            adIndex = (adIndex + 1) % AD_DATA.length;
            const ad = AD_DATA[adIndex];
            const pop = $('#ad-pop');
            $('#ad-img').src = ad.img;
            $('#ad-title').textContent = ad.title;
            $('#ad-msg').textContent = `"${ad.msg}"`;
            adDismiss.textContent = ad.dismiss;
            pop.classList.remove('swap');
            void pop.offsetWidth;
            pop.classList.add('swap');
        });
    }

    // -------------------------------------------
    // Taco storm — "Make it Tuesday" or type T-A-C-O
    // -------------------------------------------
    let stormActive = false;
    function tacoStorm() {
        if (stormActive) return;
        stormActive = true;
        track('landing_taco');
        const layer = document.createElement('div');
        layer.className = 'taco-storm';
        layer.setAttribute('aria-hidden', 'true');
        const count = reduceMotion.matches ? 0 : (window.innerWidth < 640 ? 26 : 48);
        for (let i = 0; i < count; i++) {
            const img = document.createElement('img');
            img.src = 'images/ui/taco_image.png';
            img.alt = '';
            const size = 32 + Math.random() * 46;
            img.style.width = `${size}px`;
            img.style.left = `${Math.random() * 100}%`;
            img.style.animationDuration = `${2.4 + Math.random() * 2.2}s`;
            img.style.animationDelay = `${Math.random() * 1.6}s`;
            img.style.setProperty('--spin', `${(Math.random() > 0.5 ? 1 : -1) * (240 + Math.random() * 480)}deg`);
            layer.appendChild(img);
        }
        const toast = document.createElement('div');
        toast.className = 'taco-toast';
        toast.textContent = 'TACO TUESDAYYYYY';
        document.body.append(layer, toast);
        setTimeout(() => { layer.remove(); toast.remove(); stormActive = false; }, 5200);
    }
    $('#taco-btn')?.addEventListener('click', tacoStorm);

    let typed = '';
    document.addEventListener('keydown', (e) => {
        if (e.target.matches && e.target.matches('input, textarea, [contenteditable]')) return;
        if (e.key.length !== 1) return;
        typed = (typed + e.key.toLowerCase()).slice(-4);
        if (typed === 'taco') tacoStorm();
    });

    // -------------------------------------------
    // Chalk toss
    // -------------------------------------------
    const chalk = $('#chalk-demo');
    if (chalk) {
        const cloud = $('.chalk-cloud', chalk);
        const toss = () => {
            chalk.classList.remove('tossed');
            void chalk.offsetWidth;
            chalk.classList.add('tossed');
            cloud.innerHTML = '';
            if (reduceMotion.matches) return;
            for (let i = 0; i < 46; i++) {
                const p = document.createElement('i');
                const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.3;
                const dist = 60 + Math.random() * 150;
                p.style.setProperty('--s', `${4 + Math.random() * 12}px`);
                p.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
                p.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
                p.style.animationDelay = `${Math.random() * 0.15}s`;
                cloud.appendChild(p);
            }
        };
        chalk.addEventListener('click', toss);
        // Fire once on its own the first time it scrolls into view.
        const chalkObs = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) { setTimeout(toss, 400); chalkObs.disconnect(); }
        }, { threshold: 0.6 });
        chalkObs.observe(chalk);
    }

    // -------------------------------------------
    // Splash screen loading phrases
    // -------------------------------------------
    const splashPhrases = [
        'Polishing the crown...',
        'Loading 4 rings worth of bangers...',
        'Checking LeBron\'s playlist...',
        'Warming up from the bench...',
        'Reviewing game film...',
        'LeLoading...',
        'Preparing the chalk toss...',
        'Counting triple-doubles...',
        'Activating playoff mode...',
        'The King has arrived.',
    ];
    const splashPhrase = $('#splash-phrase');
    if (splashPhrase) {
        let phraseIndex = 0;
        setInterval(() => {
            phraseIndex = (phraseIndex + 1) % splashPhrases.length;
            splashPhrase.style.opacity = '0';
            setTimeout(() => {
                splashPhrase.textContent = splashPhrases[phraseIndex];
                splashPhrase.style.opacity = '1';
            }, 300);
        }, 2200);
    }
});
