import Plugin from 'src/plugin-system/plugin.class';

export default class StickyHeaderPlugin extends Plugin {
    static options = {
        scrollThreshold: 50
    };

    init() {
        console.log('Sticky Header Plugin Initialized');
        
        // Direkt auf das aktuelle Element zugreifen
        this.headerEl = this.el;
        console.log('Header element found:', this.headerEl);
        
        // Höhe für Body-Padding
        this._saveHeaderHeight();
        
        // Event Listener hinzufügen
        window.addEventListener('scroll', this._onScroll.bind(this));
        window.addEventListener('resize', this._onResize.bind(this));
        
        // Initialer Check
        this._checkScrollPosition();
    }
    
    _saveHeaderHeight() {
        setTimeout(() => {
            this.headerHeight = this.headerEl.offsetHeight;
            document.documentElement.style.setProperty('--header-height', `${this.headerHeight}px`);
            console.log('Header height set:', this.headerHeight);
        }, 200);
    }
    
    _onResize() {
        this._saveHeaderHeight();
    }
    
    _onScroll() {
        this._checkScrollPosition();
    }
    
    _checkScrollPosition() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > this.options.scrollThreshold) {
            this._makeSticky();
        } else {
            this._makeNormal();
        }
    }
    
    _makeSticky() {
        if (!this.headerEl.classList.contains('is-sticky')) {
            console.log('Making sticky');
            this.headerEl.classList.add('is-sticky');
            document.body.classList.add('has-sticky-header');
        }
    }
    
    _makeNormal() {
        if (this.headerEl.classList.contains('is-sticky')) {
            console.log('Making normal');
            this.headerEl.classList.remove('is-sticky');
            document.body.classList.remove('has-sticky-header');
        }
    }
}