import Plugin from 'src/plugin-system/plugin.class';

export default class StickyHeaderPlugin extends Plugin {
    static options = {
        stickyHeaderSelector: '.header-main',
        scrollThreshold: 200,
        visibilityThreshold: 150
    };

    init() {
        this.headerEl = document.querySelector(this.options.stickyHeaderSelector);
        if (!this.headerEl) return;

        // Save the header height for body padding compensation
        this.headerHeight = this.headerEl.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${this.headerHeight}px`);

        // Initialize variables for scroll tracking
        this.lastScrollTop = 0;
        this.isSticky = false;
        this.ticking = false;

        // Bind scroll event handler
        window.addEventListener('scroll', this.onScroll.bind(this));
        window.addEventListener('resize', this.onResize.bind(this));
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
        this.headerEl.classList.add('is-sticky');
        document.body.classList.add('has-sticky-header');
        this.isSticky = true;
    }

    makeHeaderNormal() {
        this.headerEl.classList.remove('is-sticky', 'is-hidden');
        document.body.classList.remove('has-sticky-header');
        this.isSticky = false;
    }
}
