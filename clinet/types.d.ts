type Post =  {
        createdAt:string,
        id:number,
        User:{
            id:string,
            nickname:string
        },
        cotent:string,
        img:string,
        Comments?:Array<any>
}
