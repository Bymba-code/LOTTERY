const prisma = require("../../../Middlewares/prisma")

const GET_SINGLE_RACE = async (req , res) => {
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
        const isRace = await prisma.lottery_races.findMany({
            where:{
                id:parseInt(id)
            }
        })

        if(isRace.length === 0)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Устсан эсвэл байхгүй байна."
            })
        }

        


        return res.status(200).json({
            success:true,
            data:isRace,
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

module.exports = GET_SINGLE_RACE