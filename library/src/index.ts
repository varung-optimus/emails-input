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
    const defaultSettings: EmailInputSettings = { isEnterEnabled: true, isCommaEnabled: true, isBlurEnabled: true, domain: '@miro.com', placeholder: 'add more person' };

    /**
     * ================
     * Methods
     * =================
     */

    var _addEmailEntry = (element: HTMLElement, inputElement: HTMLInputElement) => {
        var node = document.createElement('span');
        node.innerText = inputElement.value;
        inputElement.value = '';
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
                _addEmailEntry(element, inputElement);
                return false;
            }
            if (props.isCommaEnabled && event && event.keyCode === 44) {
                // Add item as an email item entry
                _addEmailEntry(element, inputElement);
                return false;
            }
        };

        inputElement.onblur = (event) => {
            // add item on blur
        }
    };

    var addEmail = () => {
        // Generate random email and append in textarea element
        var generatedId = '';
        for (var index = 0; index < 15; index++) {
            generatedId += allowedChars[Math.floor(Math.random() * allowedChars.length)];
        }

        generatedId = `${generatedId}${props.domain}`;
        this.emails.push(generatedId);

        var addedEmail = document.createElement('span');
        addedEmail.innerText = generatedId;
        this.emailInputContainer.insertBefore(addedEmail, this.inputElement);
    };

    var getEmailsCount = () => {
        return this.emails.length;
    };


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
        getEmailsCount
    };
};