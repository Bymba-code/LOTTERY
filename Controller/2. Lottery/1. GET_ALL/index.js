const prisma = require("../../../Middlewares/prisma")

const GET_ALL_LOTTERY = async (req , res) => {
    try 
    {
        // 1. Хуудаслах өгөгдөл бэлтгэх
        
        const {page, size} = req.query;
        const skip = (page - 1) * size;
        const take = parseInt(size)

        
        // 2. Өгөгдлийн дагуу сугалааг татах

        let lotteries;

        if(!page && !size)
        {
            lotteries = await prisma.lottery.findMany({
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
                }
            })
        }
        if(page && size)
        {
            lotteries = await prisma.lottery.findMany({
                skip:skip,
                take:take,
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
                }

            })
        }

        // 3. Өгөгдөл хоосон эсэхийг шалгах

        if(lotteries.length === 0)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Өгөгдөл олдсонгүй."
            })
        }


        // 4. Шүүх өгөгдөл байх үед нийт хуудасны хэмжээг тооцолох

        const totalLotteries = await prisma.lottery.count();
        const maxPage = Math.ceil(totalLotteries / size);

        if(page && size)
        {
            return res.status(200).json({
                success:true,
                data:lotteries,
                maxPage:maxPage,
                message: "Амжилттай"
            })
        }

        return res.status(200).json({
            success:true,
            data:lotteries,
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

module.exports = GET_ALL_LOTTERY