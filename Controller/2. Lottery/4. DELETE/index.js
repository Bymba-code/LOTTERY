const prisma = require("../../../Middlewares/prisma")

const DELETE_LOTTERY = async (req, res) => {
    try 
    {
        const {id} = req.params

        // 1. Өгөгдөл шалгах
        if(!id)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Сонгох сугалааны өгөгдөл байхгүй байна."
            })
        }

        // 2. Сугалааг шалгах

        const isLottery = await prisma.lottery.findUnique({
            where:{
                id:parseInt(id)
            }
        })

        if(!isLottery)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Сугалаа байхгүй эсвэл устгагдсан байна."
            })
        }
        
        // 3. Устгах

        const result = await prisma.lottery.delete({
            where:{
                id:parseInt(id)
            }
        })

        return res.status(200).json({
            success:true,
            data:[],
            message:"Амжилттай устгалаа."
        })

    }
    catch(err)
    {
        return res.status(500).json({
            success: false,
            data: [],
            message: "Серверийн алдаа гарлаа." + err
        });
    }
}

module.exports = DELETE_LOTTERY