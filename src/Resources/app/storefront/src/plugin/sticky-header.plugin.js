import Plugin from 'src/plugin-system/plugin.class';

export default class StickyHeaderPlugin extends Plugin {
    static options = {
        stickyHeaderSelector: '.header-main',
        scrollThreshold: 10, // Reduziert für ein früheres Sticky-Verhalten
        visibilityThreshold: 50
    };

    init() {
        // Debugging: Prüfen, ob das Plugin geladen wird
        console.log('StickyHeader Plugin initialized');
        
        // Direkt auf das Element zugreifen, in dem das Plugin initialisiert wurde
        this.headerEl = this.el;
        
        if (!this.headerEl) {
            console.error('Header element not found!');
            return;
        }

        console.log('Header element found:', this.headerEl);

        // Save the header height for body padding compensation
        this._setHeaderHeight();
        
        // Initialize variables for scroll tracking
        this.lastScrollTop = 0;
        this.isSticky = false;
        this.ticking = false;

        // Bind scroll event handler
        window.addEventListener('scroll', this.onScroll.bind(this));
        window.addEventListener('resize', this.onResize.bind(this));
        
        // Initialer Check, ob wir schon gescrollt sind (falls Seite neu geladen wurde)
        this._checkInitialScroll();
        
        // Forcierter Test, ob Sticky funktioniert
        setTimeout(() => {
            this.makeHeaderSticky();
            console.log('Header sollte jetzt sticky sein');
            
            // Nach 2 Sekunden zurücksetzen, wenn wir nicht gescrollt haben
            setTimeout(() => {
                if (window.pageYOffset < this.options.scrollThreshold) {
                    this.makeHeaderNormal();
                    console.log('Header wieder normal');
                }
            }, 2000);
        }, 1000);
    }

    _setHeaderHeight() {
        // Warte bis alles geladen ist
        setTimeout(() => {
            this.headerHeight = this.headerEl.offsetHeight;
            console.log('Header height set to:', this.headerHeight);
            document.documentElement.style.setProperty('--header-height', `${this.headerHeight}px`);
        }, 300);
    }

    _checkInitialScroll() {
        // Prüfen, ob wir beim Laden der Seite bereits gescrollt haben
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        console.log('Initial scroll position:', scrollTop);
        if (scrollTop > this.options.scrollThreshold) {
            this.makeHeaderSticky();
        }
    }

    onScroll() {
        console.log('Scroll event detected');
        if (!this.ticking) {
            window.requestAnimationFrame(() => {
                this.handleScrollBehavior();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    onResize() {
        // Update header height on resize
        this._setHeaderHeight();
    }

    handleScrollBehavior() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        console.log('Handling scroll, position:', scrollTop);
        
        // Make header sticky after scrolling past threshold
        if (scrollTop > this.options.scrollThreshold && !this.isSticky) {
            this.makeHeaderSticky();
        } else if (scrollTop <= this.options.scrollThreshold && this.isSticky) {
            this.makeHeaderNormal();
        }

        // Hide/show header based on scroll direction
        if (this.isSticky) {
            if (scrollTop > this.lastScrollTop && scrollTop > this.options.visibilityThreshold) {
                // Scrolling down - hide header
                this.headerEl.classList.add('is-hidden');
                console.log('Header hidden');
            } else {
                // Scrolling up - show header
                this.headerEl.classList.remove('is-hidden');
                console.log('Header visible');
            }
        }

        this.lastScrollTop = scrollTop;
    }

    makeHeaderSticky() {
        console.log('Making header sticky');
        this.headerEl.classList.add('is-sticky');
        document.body.classList.add('has-sticky-header');
        this.isSticky = true;
    }

    makeHeaderNormal() {
        console.log('Reverting header to normal');
        this.headerEl.classList.remove('is-sticky', 'is-hidden');
        document.body.classList.remove('has-sticky-header');
        this.isSticky = false;
    }
}