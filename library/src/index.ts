import { EmailInputType } from './types/email-input.model';

/**
 * Element Input module
 * ==
 * Exports major functionality to other modules
 */
var EmailInput = (function (): EmailInputType {
    var addEmail = (): string => {
        console.log('Adding Email');
        return '';
    }

    var getEmailsCount = (): number => {
        console.log('Get emails count');
        return 0;
    }

    return {
        addEmail,
        getEmailsCount
    }
})();