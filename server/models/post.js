module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define(
      "Post",
      {
        content: {
          type: DataTypes.TEXT,
          allowNull: false
        }
      },
      {
        charset: "utf8mb4",
      }
    );
    Post.associate = db => {
      db.Post.belongsTo(db.User);
      db.Post.hasMany(db.Comment);
      db.Post.hasMany(db.Image);
      db.Post.belongsTo(db.Post,{as:'Retweet'});
      db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
      db.Post.belongsToMany(db.User, { through: "Like" ,as:'Likers'});
    };

    return Post;
  };