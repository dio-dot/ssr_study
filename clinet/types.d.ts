type Post =  {
        createdAt:string,
        id:number,
        User:{
            id:string,
            nickname:string
        },
        content:string,
        img:string,
        Comments?:Array<any>
}
