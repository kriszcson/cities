export class dbUser {
    constructor(
        public oldEmail: string,
        public name: string,
        private _password: string,
        private _role: string,
        public newEmail?: string,
    ) { }

    public get password() {
        return this._password;
    }

    public get role() {
        return this._role;
    }
}