const prisma=require("../config/db");

exports.registerShop=(data)=>{
    return prisma.Shop.create({data});
}