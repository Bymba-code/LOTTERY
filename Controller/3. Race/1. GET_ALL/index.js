const prisma = require("../../../Middlewares/prisma")

const GET_ALL_RACES = async (req , res) => {
    try 
    {
        // 1. Хуудаслах өгөгдөл бэлтгэх
        
        const {page, size, lottery} = req.query;
        const skip = (page - 1) * size;
        const take = parseInt(size)

        
        // 2. Өгөгдлийн дагуу сугалааг татах

        let races;

        if(!page && !size)
        {
            races = await prisma.lottery_races.findMany({
                include:{
                    lottery_race_prizes:{
                        include:{
                            lottery_race_winners:{
                                include:{
                                    users:true
                                }
                            }
                        }
                        
                    }
                }
            })
        }
        if(page && size)
        {
            races = await prisma.lottery_races.findMany({
                skip:skip,
                take:take,
                include:{
                    lottery_race_prizes:{
                        include:{
                            lottery_race_winners:{
                                include:{
                                    users:true
                                }
                            }
                        }
                            
                    }
                }
            
            })
        }
        
        if(page && size && lottery)
        {
            races = await prisma.lottery_races.findMany({
                skip:skip,
                take:take,
                include:{
                    lottery_race_prizes:{
                        include:{
                            lottery_race_winners:{
                                include:{
                                    users:true
                                }
                            }
                        }
                            
                    }
                },
                where:{
                    lottery:parseInt(lottery)
                }
            
            })
        }

        if(!page && !size && lottery)
        {
            races = await prisma.lottery_races.findMany({
                include:{
                    lottery_race_prizes:{
                        include:{
                            lottery_race_winners:{
                                include:{
                                    users:true
                                }
                            }
                        }
                            
                    }
                },
                where:{
                    lottery:parseInt(lottery)
                }
            
            })
        }

        // 3. Өгөгдөл хоосон эсэхийг шалгах

        if(races.length === 0)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Өгөгдөл олдсонгүй."
            })
        }


        // 4. Шүүх өгөгдөл байх үед нийт хуудасны хэмжээг тооцолох

        const totalLotteries = await prisma.lottery_race_prizes.count();
        const maxPage = Math.ceil(totalLotteries / size);

        if(page && size)
        {
            return res.status(200).json({
                success:true,
                data:races,
                maxPage:maxPage,
                message: "Амжилттай"
            })
        }

        return res.status(200).json({
            success:true,
            data:races,
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

module.exports = GET_ALL_RACES