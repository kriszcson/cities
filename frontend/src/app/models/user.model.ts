export class User {
    constructor(
        public email: string,
        public name: string,
        public _tokenExpirationDate: Date,
        private _token: string,
        private _refreshToken: string,
    ) { }

    public get token() {
        return this._token;
    }

    public get refreshToken() {
        return this._refreshToken;
    }
}