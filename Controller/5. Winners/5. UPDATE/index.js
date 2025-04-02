const prisma = require("../../../Middlewares/prisma")

const UPDATE_PRIZE = async (req, res) => {
    try 
    {
        const {id} = req.params;
        const {prize, person} = req.body;

        if(!id)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Шинэчлэх шагналын дугаарыг оруулна уу."
            })
        }

        const isPrize = await prisma.lottery_race_prizes.findUnique({
            where:
            {
                id:parseInt(id)
            }
        })

        if(!isPrize)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Өгөгдөл олдсонгүй."
            })
        }

        let updateData = {};

        if(prize) updateData.prize = prize;
        if(person) updateData.person = person;

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                data: [],
                message: "Шинэчлэх өгөгдөл байхгүй байна."
            });
        }
        
        const result = await prisma.lottery_race_prizes.update({
            where:{
                id:parseInt(id)
            },
            data: updateData
        })

        return res.status(200).json({
            success:true,
            data:[],
            message: "Амжилттай шинэчиллээ."
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

module.exports = UPDATE_PRIZE   