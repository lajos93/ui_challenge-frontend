export class User{
    constructor(
        public id:number,
        public username:string,
        public email:string,
        public bio:string,
        public image:string,
        public token?:string,

    ){}
}