const prisma = require("../../../Middlewares/prisma")

const CREATE_RACE = async (req , res) => {
    try 
    {
        const {lottery, race} = req.body;
        
        if(!lottery)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Сугадааны дугаар хоосон байна."
            })
        }
        if(!race)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Байрыг оруулна уу."
            })
        }

        // 1. Сугалаа байгаа эсэхийг шалгах

        const isLottery = await prisma.lottery.findUnique({
            where:{
                id:parseInt(lottery)
            }
        })

        if(!isLottery)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Сугалаа байхгүй эсвэл устсан байна."
            })
        }

        const result = await prisma.lottery_races.create({
            data:{
                lottery:parseInt(lottery),
                race:race
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

module.exports = CREATE_RACE