import Plugin from 'src/plugin-system/plugin.class';

export default class StickyHeaderPlugin extends Plugin {
    static options = {
        stickyHeaderSelector: '.header-main',
        scrollThreshold: 100, // Reduziert für ein früheres Sticky-Verhalten
        visibilityThreshold: 100
    };

    init() {
        // Debugging: Prüfen, ob das Plugin geladen wird
        console.log('StickyHeader Plugin initialized');
        
        this.headerEl = document.querySelector(this.options.stickyHeaderSelector);
        if (!this.headerEl) {
            console.error('Header element not found with selector:', this.options.stickyHeaderSelector);
            return;
        }

        console.log('Header element found:', this.headerEl);

        // Save the header height for body padding compensation
        this.headerHeight = this.headerEl.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${this.headerHeight}px`);
        
        console.log('Header height set to:', this.headerHeight);

        // Initialize variables for scroll tracking
        this.lastScrollTop = 0;
        this.isSticky = false;
        this.ticking = false;

        // Bind scroll event handler
        window.addEventListener('scroll', this.onScroll.bind(this));
        window.addEventListener('resize', this.onResize.bind(this));
        
        // Prüfen, ob wir bereits gescrollt haben, falls die Seite neu geladen wurde
        this.onScroll();
    }

    onScroll() {
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
        this.headerHeight = this.headerEl.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${this.headerHeight}px`);
        console.log('Header height updated on resize:', this.headerHeight);
    }

    handleScrollBehavior() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
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
            } else {
                // Scrolling up - show header
                this.headerEl.classList.remove('is-hidden');
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