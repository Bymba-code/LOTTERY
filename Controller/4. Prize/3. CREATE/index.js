const prisma = require("../../../Middlewares/prisma")

const CREATE_PRIZE = async (req , res) => {
    try 
    {
        const {race, prize, person} = req.body;
        
        if(!race)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Байрыг оруулна уу."
            })
        }

        if(!prize)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Шагналыг оруулна уу."
            })
        }

        if(!person)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Хүний тоог оруулна уу."
            })
        }

        const result = await prisma.lottery_race_prizes.create({
            data:{
                race:parseInt(race),
                prize:prize,
                person:parseInt(person)
            }
        })

        return res.status(200).json({
            success:true,
            data:[],
            message:"Амжилттай."
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

module.exports = CREATE_PRIZE