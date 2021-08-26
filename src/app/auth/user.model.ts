export class User{
    constructor(
        public id:string,
        public username:string,
        public email:string,
        public bio:string,
        public image:string,
        public token?:string,

    ){}
}

export interface authResponseData{
    user: User;
}