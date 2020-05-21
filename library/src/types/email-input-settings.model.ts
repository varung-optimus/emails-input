export class EmailInputSettings {
    // Functionality settings
    isAddEnabled?: boolean = true;
    isCommaEnabled?: boolean = true;
    isBlurEnabled?: boolean = true;
    // Styling settings
    textElementClasses?: string;
    // Data
    // TODO: Should be dynamic (i18n compatible)
    domain?: string = '@miro.com';
}