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

    // Public variables
    textElement: HTMLElement;
    emails: [];

    // Private variables/consts
    // TODO: Should be i18n compatible characters
    const allowedChars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    const defaultSettings: EmailInputSettings = { isAddEnabled: true, isCommaEnabled: true, isBlurEnabled: true, domain: '@miro.com' };

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
        // append the node
        node.innerHTML = `<textarea class="${props.textElementClasses}"></textarea>`;
        this.textElement = node.children[0];
        // settings
        props = { ...defaultSettings, ...props };
    };

    // Initialize the input-element
    _init();


    /**
     * ================
     * Methods
     * =================
     */
    var addEmail = () => {
        // Generate random email and append in textarea element
        var generatedId = '';
        for (var index = 0; index < 15; index++) {
            generatedId += allowedChars[Math.floor(Math.random() * allowedChars.length)];
        }

        generatedId = `${this.textElement.value} ${generatedId}${props.domain}`;
        this.emails.push(generatedId);
        this.textElement.value = generatedId;
    }


    return {
        addEmail
    };
};