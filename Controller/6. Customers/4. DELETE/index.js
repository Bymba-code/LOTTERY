const prisma = require("../../../Middlewares/prisma")

const DELETE_CUSTOMER = async (req , res) => {
    try 
    {
        const {id} = req.params

        if(!id)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Устгах хүсэлтийн дугаарыг оруулна уу."
            })
        }

        const row = await prisma.lottery_users.findUnique({
            where: {
                id:parseInt(id)
            }
        })

        if(!row)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Өгөгдөл устсан эсвэл олдсонгүй."
            })
        }

        const result = await prisma.lottery_users.delete({
            where:{
                id:parseInt(id)
            }
        })

        return res.status(200).json({
            success:true,
            data:[],
            message: "Амжилттай."
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

module.exports = DELETE_CUSTOMER