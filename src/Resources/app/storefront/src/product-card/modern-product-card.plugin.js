import DomAccess from 'src/helper/dom-access.helper';
import Plugin from 'src/plugin-system/plugin.class';

/**
 * This plugin adds interactive functionality to the modern product cards:
 * - Quantity selector
 * - Quick view button
 * - Card background color variations
 */
export default class ModernProductCardPlugin extends Plugin {
    static options = {
        /**
         * Selector for the quantity input field
         *
         * @type string
         */
        quantityInputSelector: '.quantity-input',
        
        /**
         * Selector for the hidden quantity input field for the form
         *
         * @type string
         */
        quantityHiddenInputSelector: '.quantity-hidden-input',
        
        /**
         * Selector for decrease quantity button
         *
         * @type string
         */
        decreaseButtonSelector: '.btn-quantity.decrease',
        
        /**
         * Selector for increase quantity button
         *
         * @type string
         */
        increaseButtonSelector: '.btn-quantity.increase',
        
        /**
         * Selector for the quickview button
         *
         * @type string
         */
        quickviewButtonSelector: '.btn-quickview-product',
        
        /**
         * Selector for close button
         *
         * @type string
         */
        closeButtonSelector: '.btn-close-product',
        
        /**
         * Default background colors based on product categories
         * (These could be determined by product properties or categories)
         *
         * @type array
         */
        backgroundColors: ['blue', 'green', 'pink', 'yellow'],
    };

    init() {
        this._initQuantitySelector();
        this._initQuickView();
        this._initCloseButton();
        this._initColorVariation();
    }

    /**
     * Initialize quantity selector functionality
     * 
     * @private
     */
    _initQuantitySelector() {
        // Get DOM elements
        this.quantityInput = DomAccess.querySelector(this.el, this.options.quantityInputSelector, false);
        this.quantityHiddenInput = DomAccess.querySelector(this.el, this.options.quantityHiddenInputSelector, false);
        this.decreaseButton = DomAccess.querySelector(this.el, this.options.decreaseButtonSelector, false);
        this.increaseButton = DomAccess.querySelector(this.el, this.options.increaseButtonSelector, false);
        
        if (!this.quantityInput || !this.quantityHiddenInput) {
            return;
        }
        
        // Add event listeners
        if (this.decreaseButton) {
            this.decreaseButton.addEventListener('click', this._onDecreaseQuantity.bind(this));
        }
        
        if (this.increaseButton) {
            this.increaseButton.addEventListener('click', this._onIncreaseQuantity.bind(this));
        }
        
        this.quantityInput.addEventListener('change', this._onQuantityChange.bind(this));
    }
    
    /**
     * Handle decrease quantity button click
     * 
     * @private
     */
    _onDecreaseQuantity() {
        const currentValue = parseInt(this.quantityInput.value);
        if (currentValue > 1) {
            this.quantityInput.value = currentValue - 1;
            this._updateHiddenInput();
        }
    }
    
    /**
     * Handle increase quantity button click
     * 
     * @private
     */
    _onIncreaseQuantity() {
        const currentValue = parseInt(this.quantityInput.value);
        const maxValue = parseInt(this.quantityInput.getAttribute('max')) || 99;
        
        if (currentValue < maxValue) {
            this.quantityInput.value = currentValue + 1;
            this._updateHiddenInput();
        }
    }
    
    /**
     * Handle quantity input change
     * 
     * @private
     */
    _onQuantityChange() {
        const value = parseInt(this.quantityInput.value);
        const minValue = parseInt(this.quantityInput.getAttribute('min')) || 1;
        const maxValue = parseInt(this.quantityInput.getAttribute('max')) || 99;
        
        // Validate input
        if (isNaN(value) || value < minValue) {
            this.quantityInput.value = minValue;
        } else if (value > maxValue) {
            this.quantityInput.value = maxValue;
        }
        
        this._updateHiddenInput();
    }
    
    /**
     * Update the hidden input with the current quantity
     * 
     * @private
     */
    _updateHiddenInput() {
        this.quantityHiddenInput.value = this.quantityInput.value;
    }
    
    /**
     * Initialize quick view button functionality
     * 
     * @private
     */
    _initQuickView() {
        const quickviewButton = DomAccess.querySelector(this.el, this.options.quickviewButtonSelector, false);
        
        if (!quickviewButton) {
            return;
        }
        
        // If using a modal for quick view, the functionality would be handled by Bootstrap
        // This is just for any additional logic that might be needed
        quickviewButton.addEventListener('click', this._onQuickView.bind(this));
    }
    
    /**
     * Handle quick view button click
     * 
     * @private
     */
    _onQuickView(event) {
        // This is where you'd add any custom functionality for quick view
        // For now, we'll just use the built-in modal functionality
        console.log('Quick view clicked');
    }
    
    /**
     * Initialize close button functionality
     * 
     * @private
     */
    _initCloseButton() {
        const closeButton = DomAccess.querySelector(this.el, this.options.closeButtonSelector, false);
        
        if (!closeButton) {
            return;
        }
        
        closeButton.addEventListener('click', this._onClose.bind(this));
    }
    
    /**
     * Handle close button click
     * 
     * @private
     */
    _onClose() {
        // Hide the product card
        this.el.style.display = 'none';
    }
    
    /**
     * Initialize background color variation based on product properties
     * 
     * @private
     */
    _initColorVariation() {
        // This would ideally use product categories or properties to assign colors
        // For now, we'll just use a random selection from our color options
        const randomIndex = Math.floor(Math.random() * this.options.backgroundColors.length);
        const colorClass = `product-color-${this.options.backgroundColors[randomIndex]}`;
        
        // Add the color class to the product box
        this.el.classList.add(colorClass);
    }
}