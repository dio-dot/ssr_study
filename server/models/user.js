module.exports = (sequelize,DataTypes)=>{
    const User = sequelize.define(
        "User",
        {
            nickname:{
                type:DataTypes.STRING(20),
                allowNull:false
            },
            userId:{
                type:DataTypes.STRING(20),
                allowNull:false,
                unique:true
            },
            password:{
                type:DataTypes.STRING(100),
                allowNull:false
            }
        }
    )
    User.associate = db =>{
        db.User.hasMany(db.Post,{as:'Posts'});
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post,{through:'Like',as:'Liked'});
        db.User.belongsToMany(db.User,{through:'Follow',as:'Followers',foreignKey:'followerId'});
        db.User.belongsToMany(db.User,{through:'Follow',as:'Followings',foreignKey:'followingId'});
    }

    return User;
};


