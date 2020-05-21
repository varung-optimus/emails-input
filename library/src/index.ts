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

    /**
     * ================
     * LIFECYCLE EVENTS
     * =================
     */

    /**
     * Email input initializer
     */
    var _init = () => {
       node.innerHTML = `<textarea class="${props.textElementClasses}"></textarea>`;
        console.log(props);
    };

    // Initialize the input-element
    _init();


    /**
     * ================
     * Methods
     * =================
     */
    var addEmail = () => {
        console.log('Adding email ' + node);
        return '';
    }


    return {
        addEmail
    };
};