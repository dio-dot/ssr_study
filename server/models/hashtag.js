module.exports = (sequelize, DataTypes) => {
    const Hashtag = sequelize.define(
      "Hashtag",
      {
        src: {
          type: DataTypes.STRING(20),
          allowNull: false
        }
      }
    );
    Hashtag.associate = db => {
      db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" });
    };
  
    return Hashtag;
  };