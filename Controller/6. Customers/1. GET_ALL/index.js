const prisma = require("../../../Middlewares/prisma");

const GET_ALL_CUSTOMERS = async (req, res) => {
    try {
        const { page, size, lottery , user} = req.query;

        const take = size ? parseInt(size) : undefined;
        const skip = page && size ? (page - 1) * size : undefined; 

        let customers;

        if (!page && !size && !lottery) 
        {
            customers = await prisma.lottery_users.findMany({
                include:
                {
                    users:true
                }
            });
        } 
        if(!page && !size && lottery)
        {
            customers = await prisma.lottery_users.findMany({
                where: {
                    lottery:parseInt(lottery)
                },
                include:
                {
                    users:true
                }
            });
        }
        
        if(page && size && !lottery)
        {
            customers = await prisma.lottery_users.findMany({
                skip:skip,
                take:take
            });
        }
        if(page && size && lottery)
        {
            customers = await prisma.lottery_users.findMany({
                skip:skip,
                take:take,
                where:{
                    lottery:parseInt(lottery)
                }
            })
        }
        if(!page && !size && user)
        {
            customers = await prisma.lottery_users.findMany({
                skip:skip,
                take:take,
                where:{
                    user:parseInt(req.user.id)
                }
            })
        }

        if(customers.length === 0)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Өгөгдөл олдсонгүй."
            })
        }

        let maxPage;

        if(page && size && !lottery)
        {
            const total = await prisma.lottery_users.count();
            maxPage = Math.ceil(total / size);
        }
        if(page && size && lottery)
        {
            const total = await prisma.lottery_users.count({
                where:{
                    lottery:parseInt(lottery)
                }
            });
            maxPage = Math.ceil(total / size);
        }


        if(page && size)
        {
            return res.status(200).json({
                success:true,
                data:customers,
                maxPage:maxPage,
                message:"Амжилттай"
            })
        }
        else 
        {
            return res.status(200).json({
                success:true,
                data:customers,
                message: "Амжилттай"
            })
        }
       
        



    } catch (err) {
        return res.status(500).json({
            success: false,
            data: [],
            message: "Серверийн алдаа гарлаа." + err.message, 
        });
    }
};

module.exports = GET_ALL_CUSTOMERS;
