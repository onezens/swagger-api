/**
 * Created by wangzhen on 16/11/29.
 */

module.exports = {
    //注册
    create: function(user){
        return User.create(user).exec();
    },
    //检索
    getUserByName: function getUserByName(name){
        return User
            .findOne({name : name})
            .addCreatedAt()
            .exec();
    }
};
