/* ============================================
   LEBRONIFY WEBSITE - SCRIPTS
   Landing page: in-page song previews, the hero record,
   the breakdown tabs and the Fun Stuff demos.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
    const icon = (name, size) => (window.LBIcons ? window.LBIcons.svg(name, size) : '');
    const track = (event, params) => { if (window.LBAnalytics) window.LBAnalytics.track(event, params); };
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const escapeHtml = (str) => String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

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
    // Score ticker
    // -------------------------------------------
    const ticker = $('#ticker');
    if (ticker) {
        const html = songs.map((s) => `<span>${escapeHtml(s.title)}</span>`).join('');
        ticker.innerHTML = html + html; // two copies so the -50% crawl loops seamlessly
    }

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
                        <span class="song-badge"><span class="eq" aria-hidden="true"><i></i><i></i><i></i></span></span>
                        <span class="song-play" aria-hidden="true">${icon('play', 18)}</span>
                    </span>
                    <span class="song-title">${escapeHtml(song.title)}</span>
                    <span class="song-artist">${escapeHtml(song.artist)}</span>
                </button>
            </li>`).join('');

        grid.addEventListener('click', (e) => {
            const btn = e.target.closest('.song');
            if (!btn) return;
            const i = Number(btn.dataset.index);
            btn.classList.remove('pop');
            void btn.offsetWidth;
            btn.classList.add('pop');
            if (i === player.index) player.toggle();
            else player.play(i, 'roster');
        });

        const more = $('#roster-more');
        const toggle = $('#roster-toggle');
        if (more && toggle) {
            const label = $('.roster-toggle-label', toggle);
            more.hidden = false;
            toggle.addEventListener('click', () => {
                const expanded = grid.classList.toggle('collapsed') === false;
                toggle.setAttribute('aria-expanded', String(expanded));
                label.textContent = expanded ? 'Show fewer' : `Show all ${songs.length} songs`;
                if (!expanded) grid.scrollIntoView({ block: 'start' });
            });
        }
    }

    // -------------------------------------------
    // Preview player: one <audio> shared by every play control on the page
    // -------------------------------------------
    const player = (() => {
        const audio = new Audio();
        audio.preload = 'none';
        const dock = $('#dock');
        const dockFill = $('#dock-fill');
        const dockBar = $('#dock-progress');
        const dockPlay = $('#dock-play');
        const heroBtn = $('#hero-preview');
        const api = { index: -1, playing: false };

        function render() {
            const on = api.playing;
            document.body.classList.toggle('is-playing', on);
            if (dockPlay) {
                dockPlay.innerHTML = icon(on ? 'pause' : 'play', 20);
                dockPlay.setAttribute('aria-label', on ? 'Pause' : 'Play');
            }
            if (heroBtn) {
                heroBtn.innerHTML = on
                    ? `${icon('pause', 18)}<span>Pause</span>`
                    : `${icon('shuffle', 18)}<span>${api.index < 0 ? 'Play a Random Song' : 'Resume'}</span>`;
            }
            const state = $('#now-state');
            if (state && api.index >= 0) state.textContent = on ? 'Now playing' : 'Paused';
            $$('.song').forEach((el) => {
                const current = Number(el.dataset.index) === api.index;
                el.classList.toggle('is-current', current);
                el.classList.toggle('is-playing', current && on);
                const playIcon = $('.song-play', el);
                if (playIcon) playIcon.innerHTML = icon(current && on ? 'pause' : 'play', 18);
            });
        }

        function show(song) {
            $('#sleeve-art').src = imgSrc(song);
            document.body.classList.add('has-played');
            $('#now-title').textContent = `${song.title} · ${song.artist}`;
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
            api.playing = true;
            render();
            audio.play().catch(() => { api.playing = false; render(); });
            if (source) track('landing_preview', { song: song.title, source });
        };
        api.pause = () => { audio.pause(); };
        api.resume = () => { audio.play().catch(() => {}); };
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
            audio.pause();
            if (dock) dock.hidden = true;
            document.body.classList.remove('has-dock');
        };

        audio.addEventListener('play', () => { api.playing = true; render(); });
        audio.addEventListener('pause', () => { api.playing = false; render(); });
        audio.addEventListener('ended', api.next);
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

    $('#hero-preview')?.addEventListener('click', () => player.toggle());
    // The King: bobble, crown hop, a burst of team-color confetti, then a song.
    const king = $('#king');
    function confetti(x, y) {
        if (reduceMotion.matches) return;
        const colors = ['#006bb6', '#ed174c', '#ffffff', '#fdb927'];
        for (let i = 0; i < 36; i++) {
            const c = document.createElement('i');
            c.className = 'confetti';
            const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.4;
            const dist = 80 + Math.random() * 140;
            c.style.left = `${x}px`;
            c.style.top = `${y}px`;
            c.style.background = colors[i % colors.length];
            c.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
            c.style.setProperty('--dy', `${Math.sin(angle) * dist + 120}px`);
            c.style.setProperty('--rot', `${Math.random() * 720 - 360}deg`);
            document.body.appendChild(c);
            setTimeout(() => c.remove(), 1200);
        }
    }
    if (king) {
        king.addEventListener('click', () => {
            king.classList.remove('bonk');
            void king.offsetWidth; // restart the bobble
            king.classList.add('bonk');
            const r = king.getBoundingClientRect();
            confetti(r.left + r.width / 2, r.top + r.height * 0.25);
            player.random('king');
        });
    }

    $('#king-decide')?.addEventListener('click', () => {
        const i = player.random('king_decide');
        const btn = $(`.song[data-index="${i}"]`);
        if (!btn) return;
        if (btn.offsetParent === null) $('#roster-toggle')?.click(); // pick is behind "Show all"
        btn.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'center' });
    });

    // -------------------------------------------
    // Nav: solid on scroll, dropdown menu on phones
    // -------------------------------------------
    const nav = $('#nav');
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 10);
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
    }
    if (burger && navLinks) {
        burger.addEventListener('click', () => setMenu(!navLinks.classList.contains('active')));
        $$('a', navLinks).forEach((a) => a.addEventListener('click', () => setMenu(false)));
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
    }

    // -------------------------------------------
    // App Breakdown tabs
    // -------------------------------------------
    const tabBtns = $$('.tab-btn');
    tabBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            tabBtns.forEach((b) => {
                const on = b === btn;
                b.classList.toggle('active', on);
                b.setAttribute('aria-selected', String(on));
            });
            $$('.breakdown-panel').forEach((panel) => panel.classList.toggle('active', panel.id === `tab-${btn.dataset.tab}`));
        });
    });

    // -------------------------------------------
    // AD breaks: dismissing him only brings the next one
    // -------------------------------------------
    const AD_DATA = [
        { title: 'The Brow Knows', img: 'images/ui/ad_pose1.jpg', msg: "Need more hang time? Try AD's secret workout routine!", dismiss: 'Trade AD to Dallas' },
        { title: 'AD Approved', img: 'images/ui/ad_pose2.jpg', msg: "Anthony Davis says these parodies hit harder than his blocks.", dismiss: 'Send AD to the Bench' },
        { title: 'Brow Down', img: 'images/ui/anthony_davis_default.jpg', msg: 'The Brow demands you listen to at least 3 more songs!', dismiss: 'AD Fouled Out - Skip' },
        { title: 'Trade Offer', img: 'images/ui/ad_pose2.jpg', msg: 'You receive: more parodies. AD receives: your undivided attention.', dismiss: 'Decline Trade' },
        { title: 'The Unibrow Speaks', img: 'images/ui/anthony_davis_default.jpg', msg: "AD's eyebrow has its own gravitational pull. And opinions.", dismiss: 'Wax the Brow' },
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
            $('#ad-msg').textContent = ad.msg;
            adDismiss.textContent = ad.dismiss;
            pop.classList.remove('swap');
            void pop.offsetWidth; // restart the fade
            pop.classList.add('swap');
        });
    }

    // -------------------------------------------
    // Taco storm: "Make it Tuesday", or type T-A-C-O
    // -------------------------------------------
    let storming = false;
    function tacoStorm() {
        if (storming || reduceMotion.matches) return;
        storming = true;
        track('landing_taco');
        const layer = document.createElement('div');
        layer.className = 'taco-storm';
        layer.setAttribute('aria-hidden', 'true');
        const count = window.innerWidth < 640 ? 20 : 36;
        for (let i = 0; i < count; i++) {
            const img = document.createElement('img');
            img.src = 'images/ui/taco_image.png';
            img.alt = '';
            img.style.width = `${32 + Math.random() * 36}px`;
            img.style.left = `${Math.random() * 100}%`;
            img.style.animationDuration = `${2.6 + Math.random() * 1.8}s`;
            img.style.animationDelay = `${Math.random() * 1.2}s`;
            img.style.setProperty('--spin', `${(Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 360)}deg`);
            layer.appendChild(img);
        }
        document.body.appendChild(layer);
        setTimeout(() => { layer.remove(); storming = false; }, 4800);
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
    // Chalk toss (on tap only)
    // -------------------------------------------
    const chalk = $('#chalk-demo');
    if (chalk) {
        const cloud = $('.chalk-cloud', chalk);
        chalk.addEventListener('click', () => {
            chalk.classList.remove('tossed');
            void chalk.offsetWidth;
            chalk.classList.add('tossed');
            cloud.innerHTML = '';
            if (reduceMotion.matches) return;
            for (let i = 0; i < 36; i++) {
                const p = document.createElement('i');
                const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.2;
                const dist = 50 + Math.random() * 120;
                p.style.setProperty('--s', `${4 + Math.random() * 10}px`);
                p.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
                p.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
                cloud.appendChild(p);
            }
        });
    }
});
