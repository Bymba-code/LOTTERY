const prisma = require("../../../Middlewares/prisma")

const GET_SINGLE_PRIZE = async (req , res) => {
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

        // 2. Байрыг шүүх
        const isPrize = await prisma.lottery_race_prizes.findMany({
            where:{
                id:parseInt(id)
            },
            include: {
                lottery_race_winners: true,
            },
        })

        if(isPrize.length === 0)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Устсан эсвэл байхгүй байна."
            })
        }

        

        return res.status(200).json({
            success:true,
            data:isPrize,
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

module.exports = GET_SINGLE_PRIZE