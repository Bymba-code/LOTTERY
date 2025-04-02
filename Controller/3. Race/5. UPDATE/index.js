const prisma = require("../../../Middlewares/prisma")

const UPDATE_RACE = async (req, res) => {
    try 
    {
        const {id} = req.params
        const {race} = req.body;

        // 1. Өгөгдөл шалгах
        if(!id)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Сонгох сугалааны өгөгдөл байхгүй байна."
            })
        }

        // 2. Шалгах

        const isRace = await prisma.lottery_races.findUnique({
            where:{
                id:parseInt(id)
            }
        })

        if(!isRace)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Сонгосон байр устсан эсвэл байхгүй байна."
            })
        }

        // 3. Пронт оос ирсэн өгөгдлүүдийг бэлтгэх

        const updateData = {}

        if(race) updateData.race = race;

        // 4. Шинэчлэх өгөгдөл байгаа эсэхийг шалгах
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                data: [],
                message: "Шинэчлэх өгөгдөл байхгүй байна."
            });
        }

        // 5. Шинэчлэх

        const update = await prisma.lottery_races.update({
            where: {
                id:parseInt(id)
            },
            data: updateData,
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
            success: false,
            data: [],
            message: "Серверийн алдаа гарлаа." + err
        });
    }
}

module.exports = UPDATE_RACE