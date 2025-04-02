const prisma = require("../../../Middlewares/prisma")

const DELETE_PRIZE = async (req , res) => {
    try 
    {
        const {id} = req.params

        // 1. Өгөгдөл шалгах
        if(!id)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Устгах шагналын дугаарыг оруулна уу."
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


        const result = await prisma.lottery_race_prizes.delete({
            where:{
                id:parseInt(id)
            }
        })
        6
        return res.status(200).json({
            success:true,
            data:[],
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

module.exports = DELETE_PRIZE