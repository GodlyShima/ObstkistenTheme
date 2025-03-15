import Plugin from 'src/plugin-system/plugin.class';

export default class StickyHeaderPlugin extends Plugin {
    static options = {
        scrollThreshold: 50,
        animationDuration: 400 // ms
    };

    init() {
        console.log('Sticky Header Plugin initialisiert');
        
        // Get the header element
        this.headerEl = this.el;
        
        // State tracking
        this.isInitialLoad = true;
        this.lastScrollTop = 0;
        
        // Add loading class to body immediately to prevent FOUC
        document.body.classList.add('header-loading');
        
        // Save header height for body padding
        this._saveHeaderHeight();
        
        // Add event listeners
        window.addEventListener('scroll', this._onScroll.bind(this));
        window.addEventListener('resize', this._onResize.bind(this));
        
        // Initial setup when page loads
        window.addEventListener('load', () => {
            // Remove loading class
            document.body.classList.remove('header-loading');
            
            // Check initial scroll position and animate after a short delay
            this._checkInitialScrollPosition();
            
            // Set a timeout to change the initial load state and trigger animation
            setTimeout(() => {
                this.isInitialLoad = false;
                console.log('Initial load phase completed');
                
                // Trigger animation if we're already sticky
                if (this.headerEl.classList.contains('is-sticky')) {
                    this._triggerStickyAnimation();
                }
            }, 500); // Give time for any initial rendering
        });
        
        // Fallback if load event already fired
        if (document.readyState === 'complete') {
            document.body.classList.remove('header-loading');
            this._checkInitialScrollPosition();
            setTimeout(() => {
                this.isInitialLoad = false;
                
                // Trigger animation if we're already sticky
                if (this.headerEl.classList.contains('is-sticky')) {
                    this._triggerStickyAnimation();
                }
            }, 500);
        }
    }
    
    _saveHeaderHeight() {
        this.headerHeight = this.headerEl.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${this.headerHeight}px`);
        console.log('Header-Höhe gesetzt:', this.headerHeight);
    }
    
    _onResize() {
        this._saveHeaderHeight();
    }
    
    _onScroll() {
        requestAnimationFrame(() => {
            this._checkScrollPosition();
        });
    }
    
    _checkInitialScrollPosition() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > this.options.scrollThreshold) {
            // If already scrolled on page load, make sticky WITHOUT animation initially
            this.headerEl.classList.add('no-transition');
            document.body.classList.add('has-sticky-header');
            this.headerEl.classList.add('is-sticky');
            
            // Start position for later animation
            this.headerEl.classList.add('prepare-animation');
            
            // Force a reflow to make sure the class is applied
            void this.headerEl.offsetWidth;
            
            // Remove the no-transition class after a brief delay
            setTimeout(() => {
                this.headerEl.classList.remove('no-transition');
            }, 50);
        }
    }
    
    _triggerStickyAnimation() {
        if (this.headerEl.classList.contains('is-sticky') && this.headerEl.classList.contains('prepare-animation')) {
            console.log('Triggering sticky animation after load');
            
            // First, position it offscreen (outside viewport)
            this.headerEl.classList.add('position-for-animation');
            
            // Force a reflow
            void this.headerEl.offsetWidth;
            
            // Then trigger animation
            setTimeout(() => {
                this.headerEl.classList.remove('prepare-animation');
                this.headerEl.classList.remove('position-for-animation');
                this.headerEl.classList.add('slide-from-top');
            }, 50);
        }
    }
    
    _checkScrollPosition() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const wasScrollingDown = scrollTop > this.lastScrollTop;
        this.lastScrollTop = scrollTop;
        
        if (scrollTop > this.options.scrollThreshold) {
            this._makeSticky(wasScrollingDown);
        } else {
            this._makeNormal();
        }
    }
    
    _makeSticky(wasScrollingDown) {
        if (!this.headerEl.classList.contains('is-sticky')) {
            console.log('Header wird sticky');
            
            // If it's the initial page load, don't animate
            if (this.isInitialLoad) {
                this.headerEl.classList.add('no-transition');
            }
            
            // If scrolling down, start the animation from the top (slide down)
            if (!this.isInitialLoad && wasScrollingDown) {
                this.headerEl.classList.add('slide-from-top');
            }
            
            document.body.classList.add('has-sticky-header');
            this.headerEl.classList.add('is-sticky');
            
            // Remove the no-transition class after the header is in place
            if (this.isInitialLoad) {
                setTimeout(() => {
                    this.headerEl.classList.remove('no-transition');
                }, 50);
            }
        }
    }
    
    _makeNormal() {
        if (this.headerEl.classList.contains('is-sticky')) {
            console.log('Header wird normal');
            this.headerEl.classList.remove('slide-from-top');
            document.body.classList.remove('has-sticky-header');
            this.headerEl.classList.remove('is-sticky');
        }
    }
}