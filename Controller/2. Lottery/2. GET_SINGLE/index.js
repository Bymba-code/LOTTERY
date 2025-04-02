const prisma = require("../../../Middlewares/prisma")


const GET_SINGLE_LOTTERY = async (req , res) => {
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

        // 2. Сугалааг шүүх

        const lottery = await prisma.lottery.findUnique({
            include: {
                    lottery_races_lottery_races_lotteryTolottery: {
                      include: {
                        lottery_race_prizes: {
                            include: {
                                lottery_race_winners:true
                            }
                        } 
                      }
                    },
                    lottery_users_lottery_users_lotteryTolottery: {
                        include: {
                            users: {
                                select: {
                                    id:true,
                                    firstname:true,
                                    lastname:true,
                                    phone:true
                                }
                            }
                        },
                        where:
                        {
                            isAllow:1
                        }
                        
                    }
            },
            where:{
                id:parseInt(id)
            }

        })

        // 3. Байгаа эсэхийг шалгах

        if(!lottery)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Өгөгдөл байхгүй байна."
            })
        }

        // 4. Хариу
        
        return res.status(200).json({
            success:false,
            data:lottery,
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

module.exports = GET_SINGLE_LOTTERY