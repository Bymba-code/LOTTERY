const prisma = require("../../../Middlewares/prisma")

const GET_SINGLE_CUSTOMERS = async (req , res) => {
    try 
    {
        const {id} = req.params

        // 1. Өгөгдөл шалгах
        if(!id)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Сонгох бүртгэлийн дугаарыг оруулна уу."
            })
        }

        // 2. Байрыг шүүх
        const customer = await prisma.lottery_users.findUnique({
            include:{
                users:true
            },
            where:{
                id:parseInt(id)
            },

        })

        if(!customer)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Устсан эсвэл байхгүй байна."
            })
        }

    
        return res.status(200).json({
            success:true,
            data:customer,
            message: "Амжилттай"
        })

    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            data:[],
            message: "Серверийн алдаа гарлаа." + err
        })
    }
}

module.exports = GET_SINGLE_CUSTOMERS