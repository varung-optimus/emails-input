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
    const defaultSettings: EmailInputSettings = { isEnterEnabled: true, isCommaEnabled: true, isBlurEnabled: true, domain: '@miro.com', placeholder: 'add more people' };

    /**
     * ================
     * Methods
     * =================
     */

    var _removeEmailEntry = (elementToBeRemoved: HTMLElement) => {
        // remove from registry
        const value = elementToBeRemoved.getAttribute('data-value');
        this.emails = this.emails.filter(email => email !== value);
        elementToBeRemoved.parentElement.remove();
        console.log(this.emails);
    };

    var _addEmailEntry = (element: HTMLElement, inputElement: HTMLInputElement, generatedId?: string) => {
        var node = document.createElement('span');
        node.className = 'email-text-icon-container';
        if (generatedId) {
            node.innerHTML = `<span class="email-text">${generatedId}</span>`;
            this.emails.push(generatedId);
        } else {
            node.innerHTML = inputElement.value;
            this.emails.push(inputElement.value);
            inputElement.value = '';
        }
        // append close icon
        var closeIcon = document.createElement('span');
        closeIcon.setAttribute('data-value', node.innerText);
        closeIcon.className = 'close-icon';
        closeIcon.innerHTML = '<i class="material-icons">close</i>';
        closeIcon.onclick = (event: any) => {
            // get item value
            var elementToBeRemoved = event.target.parentElement;
            _removeEmailEntry(elementToBeRemoved);
        };
        node.appendChild(closeIcon);

        // append the item to container
        element.insertBefore(node, inputElement);
    };

    var _attachEventHandlers = (element: HTMLElement, inputElement: HTMLInputElement) => {
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
                let paste = (event.clipboardData || (<any>window).clipboardData).getData('text');
                _addEmailEntry(element, inputElement, paste);
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
    var addEmail = () => {
        var generatedId = '';
        for (var index = 0; index < 15; index++) {
            generatedId += allowedChars[Math.floor(Math.random() * allowedChars.length)];
        }

        generatedId = `${generatedId}${props.domain}`;
        _addEmailEntry(this.emailInputContainer, this.inputElement, generatedId);
    };

    /**
     * Gets email count
     */
    var getEmailsCount = () => {
        return this.emails.length;
    };

    /**
     * Get emails
     */
    var getEmails = () => {
        return this.emails;
    }


    /**
     * ================
     * LIFECYCLE EVENTS
     * =================
     */

    /**
     * Email input initializer
     */
    var _init = () => {
        this.emails = [];
        // settings
        props = { ...defaultSettings, ...props };
        // append the node
        node.innerHTML = `<div class="email-input-container">
            <input type="text" placeholder="${props.placeholder}" />
        </div>`;
        this.emailInputContainer = node.children[0];
        this.inputElement = node.children[0].children[0];

        _attachEventHandlers(this.emailInputContainer, this.inputElement);
    };

    // Initialize the input-element
    _init();

    return {
        addEmail,
        getEmailsCount,
        getEmails
    };
};