export interface EmailInputType {
    addEmail(): void;
    getEmailsCount(): number;
    getEmails(): string[];
    replaceEmails(emails: string[]): void;
    listenToChanges(callback: Function): void;
}