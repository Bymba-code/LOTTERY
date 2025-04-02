const prisma = require("../../../Middlewares/prisma")

const UPDATE_LOTTERY = async (req, res) => {
    try 
    {
        const {id} = req.params
        const {title, image, start_date, end_date} = req.body;

        // 1. Өгөгдөл шалгах
        if(!id)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Сонгох сугалааны өгөгдөл байхгүй байна."
            })
        }

        // 2. Сугалааг шалгах
        const isLottery = await prisma.lottery.findUnique({
            where:{
                id:parseInt(id)
            }
        })
        if(!isLottery)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Сугалаа байхгүй эсвэл устгагдсан байна."
            })
        }
        
        // 3. Пронт оос ирсэн өгөгдлүүдийг бэлтгэх

        const updateData = {}

        if(title) updateData.title = title;
        if(start_date) updateData.start_date = new Date(start_date);
        if(end_date) updateData.end_date = new Date(end_date);


        // 4. Шинэчлэх өгөгдөл байгаа эсэхийг шалгах

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                data: [],
                message: "Шинэчлэх өгөгдөл байхгүй байна."
            });
        }

        // 5. Шинэчлэх

        const update = await prisma.lottery.update({
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

module.exports = UPDATE_LOTTERY