const prisma = require("../../../Middlewares/prisma")

const CREATE_WINNER = async (req , res) => {
    try 
    {
        const {lottery, race} = req.body;

        if(!lottery)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Сугалааны дугаар байхгүй байна."
            })
        }

        if(!race)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Тодруулах байрны дугаарыг оруулна уу."
            })
        }

    
        const races = await prisma.lottery_races.findUnique({
            where:{
                id:parseInt(race)
            },
            include:{
                lottery_race_prizes:true
            }
        })

        if(!races)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message:"Байр байхгүй байна."
            })
        }


        if(races.lottery_race_prizes.length < 0)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message:"Шагнал байхгүй байна."
            })
        }

        const raceWinners = await prisma.lottery_race_winners.findMany({
            where: {
                race_prize:parseInt(races.lottery_race_prizes[0].id)
            }
        })


        if(raceWinners.length >= races.lottery_race_prizes[0].person)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Тухайн шагналыг олгох ёстой тоо бүрдсэн байна."
            })
        }

        if (!races || races.lottery_race_prizes.length === 0) {
            return res.status(404).json({
                success: false,
                data: [],
                message: "Энэ уралдаанд шагнал байхгүй байна."
            });
        }

        const lotteryUsers = await prisma.lottery_users.findMany({
            where: {
             lottery:parseInt(lottery),
             isAllow:1
            },
            include:{
                users:true
            }
        })

        if(lotteryUsers.length === 0)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message:"Сугалаанд оролцогчид байхгүй байна."
            })
        }    
        
        const randomIndex = Math.floor(Math.random() * lotteryUsers.length);

        const randomUser = lotteryUsers[randomIndex];

        const deleteResult = await prisma.$queryRaw`
            DELETE FROM lottery_users
            WHERE lottery = ${parseInt(lottery)}
            AND user = ${parseInt(randomUser.user)};
        `;


        const result = await prisma.lottery_race_winners.create({
            data:{
                race_prize:races.lottery_race_prizes[0].id,
                user:randomUser.user
            }
        })


        return res.status(200).json({
            success: true,
            data: randomUser,
            message: "Сугалааны ялагчийг амжилттай тодрууллаа."
        });

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

module.exports = CREATE_WINNER