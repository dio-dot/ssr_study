type Post =  {
        createdAt:string,
        id:number,
        User:{
            id:string,
            nickname:string
        },
        Likers:any,
        content:string,
        img:string,
        Comments?:Array<any>
}
