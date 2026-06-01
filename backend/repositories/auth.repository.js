const prisma=require("../config/db");

exports.createUser=(data)=>{
    return prisma.User.create({data});
}

exports.findByEmail=(email)=>{
      return prisma.user.findUnique({where:{email}});
}

exports.createRole=(data)=>{
    return prisma.Role.create({data});
}
