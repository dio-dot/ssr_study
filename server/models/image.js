module.exports = (sequelize,DataTypes)=>{
    const Image = sequelize.define(
        "Image",
        {
            src:{
                type:DataTypes.STRING(200),
                allowNull:false
            }
        }
    )

    Image.associate = db =>{
        db.Image.belongsTo(db.Post);
    }
    return Image;
};

