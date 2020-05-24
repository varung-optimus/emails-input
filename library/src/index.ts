import { EmailInputSettings } from './types/email-input-settings.model';
import { EmailInputType } from './types/email-input.model';

/**
 * Element Input module
 * ==
 * Exports major functionality to other modules
 * @param {html DOM element} node
 * @param {properties} props
 */

var EmailInput = function (node: HTMLElement, props: EmailInputSettings): EmailInputType {
    this._node = node;
    this._props = props;

    // Private variables/consts
    // TODO: Should be i18n compatible characters
    const allowedChars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    const generatedEmailLength = 15;
    const defaultSettings: EmailInputSettings = { isEnterEnabled: true, isCommaEnabled: true, isBlurEnabled: true, isSpaceEnabled: true, domain: '@miro.com', placeholder: 'add more people' };
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    /**
     * ================
     * Methods
     * =================
     */

    /**
     * Removes the element from registry array and removes from DOM
     * @param removeIconElement Receives the span element of remove icon
     */
    const _removeEmailEntry = (removeIconElement: HTMLElement) => {
        const value = removeIconElement.getAttribute('data-value');
        // remove from registry
        this.emails = this.emails.filter(email => email !== value);
        // remove from DOM
        removeIconElement.parentElement.remove();
    };

    /**
     * Adds remove icon to the newly added node
     * @param node New node getting added to the DOM
     */
    const _addRemoveIcon = (node) => {
        // create remove icon and set initial config
        var removeIcon = document.createElement('span');
        removeIcon.setAttribute('data-value', node.innerText);
        removeIcon.className = 'close-icon';
        removeIcon.innerHTML = '<i class="material-icons">close</i>';

        // attach onclick handler for remove icon
        removeIcon.onclick = (event: any) => {
            // get item value
            var elementToBeRemoved = event.target.parentElement;
            _removeEmailEntry(elementToBeRemoved);
        };

        // append the icon to new node
        node.appendChild(removeIcon);
    }

    /**
     * Adds email entry to the element container
     * @param element element container instance
     * @param inputElement input element instance within the element container
     * @param generatedId optional param for generated ID string - if not passed then use input element value
     */
    const _addEmailEntry = (element: HTMLElement, inputElement: HTMLInputElement, generatedId?: string) => {
        // create a new node
        var node = document.createElement('span');

        // set value from either generated ID or inputElement value
        const value = generatedId ? generatedId : inputElement.value;

        if (value && value !== '') {
            // check if value is invalid/invalid
            const emailValidityClass = emailRegex.test(value) ? 'email-text-icon-container' : 'invalid-email';

            // set the value of DOM and registry
            node.innerHTML = value;
            node.className = emailValidityClass;
            this.emails.push(value);

            // Add remove icon to the new node
            _addRemoveIcon(node);

            // Add the node before the input element
            element.insertBefore(node, inputElement);

            // reset the input element state
            if (!generatedId) {
                inputElement.value = '';
            }
        }
    };

    /**
     * Attach events
     * @param element main container element
     * @param inputElement input element within the container element
     */
    const _attachEventHandlers = (element: HTMLElement, inputElement: HTMLInputElement) => {
        // click event for container
        element.onclick = () => {
            inputElement.focus();
        };

        // listen to ENTER and COMMA
        inputElement.onkeypress = (event) => {
            if (props.isEnterEnabled && event && event.keyCode === 13) {
                // Add item as an email item entry
                if (inputElement && inputElement.value) {
                    _addEmailEntry(element, inputElement);
                }
                return false;
            }
            if (props.isSpaceEnabled && event && event.keyCode === 32) {
                // Add item as an email item entry
                if (inputElement && inputElement.value) {
                    _addEmailEntry(element, inputElement);
                }
                return false;
            }
            if (props.isCommaEnabled && event && event.keyCode === 44) {
                // Add item as an email item entry
                if (inputElement && inputElement.value) {
                    _addEmailEntry(element, inputElement);
                }
                return false;
            }
        };

        // on paste
        inputElement.onpaste = (event) => {
            if (event && event.clipboardData) {
                let pasteData = (event.clipboardData || (<any>window).clipboardData).getData('text');
                let pastedEmails = pasteData ? pasteData.split(',') : [];
                if (pastedEmails.length > 0) {
                    for (let email of pastedEmails) {
                        _addEmailEntry(element, inputElement, email.trim());
                    }
                }
                return false;
            }
        };

        inputElement.onblur = (event) => {
            // add item on blur
            if (inputElement && inputElement.value) {
                _addEmailEntry(element, inputElement);
            }
        }
    };

    /**
     * Generate random email
     */
    const addEmail = () => {
        var generatedId = '';
        for (var index = 0; index < generatedEmailLength; index++) {
            generatedId += allowedChars[Math.floor(Math.random() * allowedChars.length)];
        }

        generatedId = `${generatedId}${props.domain}`;
        _addEmailEntry(this.emailInputContainer, this.inputElement, generatedId);
    };

    /**
     * Gets valid email count
     */
    const getEmailsCount = () => {
        let validEmailsCount = 0;
        for (let email of this.emails) {
            if (emailRegex.test(email)) {
                validEmailsCount++;
            }
        }
        return validEmailsCount;
    };

    /**
     * Get emails
     */
    const getEmails = () => {
        return this.emails;
    };


    /**
     * Replace existing emails with the new list
     * @param newEmails new emails list to be added
     */
    const replaceEmails = (newEmails: string[]) => {
        var emails = this._node.querySelectorAll('.email-text-icon-container');

        // Remove existing emails (if any)
        for (let email of emails) {
            email.remove();
        }

        // Add new emails
        for (let email of newEmails) {
            _addEmailEntry(this.emailInputContainer, this.inputElement, email);
        }

        // Update the registry
        this.emails = newEmails;
    };


    /**
     * ================
     * LIFECYCLE EVENTS
     * =================
     */

    /**
     * Email input initializer
     */
    const _init = () => {
        this.emails = [];
        // settings
        props = { ...defaultSettings, ...props };
        // append the node
        node.innerHTML = `<div class="email-input-container">
            <input type="text" placeholder="${props.placeholder}" />
        </div>`;
        this.emailInputContainer = node.querySelector('.email-input-container');
        this.inputElement = node.querySelector('input[type="text"');

        _attachEventHandlers(this.emailInputContainer, this.inputElement);
    };

    // Initialize the input-element
    _init();

    /**
     * ================
     * EXPOSED API METHODS
     * =================
     */
    return {
        addEmail,
        getEmailsCount,
        getEmails,
        replaceEmails
    };
};