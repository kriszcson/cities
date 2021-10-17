export class User {
    constructor(
        public email: string,
        public name: string,
        public _tokenExpirationDate: Date,
        public _token: string,
        public _refreshToken: string
    ) { }

}