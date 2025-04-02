const prisma = require("../../../Middlewares/prisma")

const UPDATE_CUSTOMERS = async (req, res) => {
    try 
    {
        const {id} = req.params;
        
        const {lottery, user ,ebarimt_img,image,isAllow} = req.body;

        if(!id)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Шинэчлэх хүсэлтийн дугаар байхгүй байна."
            })
        }

        const row = await prisma.lottery_users.findUnique({
            where:
            {
                id:parseInt(id)
            }
        })

        if(!row)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Өгөгдөл олдсонгүй."
            })
        }

        let updateData = {};

        if(lottery) updateData.lottery = lottery;
        if(user) updateData.user = user;
        if(ebarimt_img) updateData.ebarimt_img  = ebarimt_img;
        if(image) updateData.image = image;
        if(isAllow) updateData.isAllow = isAllow;
       

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                data: [],
                message: "Шинэчлэх өгөгдөл байхгүй байна."
            });
        }
        
        const result = await prisma.lottery_users.update({
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

module.exports = UPDATE_CUSTOMERS   