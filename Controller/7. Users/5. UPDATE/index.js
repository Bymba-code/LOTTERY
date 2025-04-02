const prisma = require("../../../Middlewares/prisma")
const bcrypt = require("bcrypt")

const UPDATE_USERS = async (req, res) => {
    try 
    {
        const {id} = req.params;
        
        const {firstName, lastName, phone, password,role} = req.body;

        if(!id)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Шинэчлэх хүсэлтийн дугаар байхгүй байна."
            })
        }

        const row = await prisma.users.findUnique({
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

        if(firstName) updateData.firstname = firstName;
        if(lastName) updateData.lastname = lastName;
        if(phone) updateData.phone  = phone;
        if(password) 
        {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            update.password = hashedPassword;
        }
        if(role) updateData.role = role;
       

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                data: [],
                message: "Шинэчлэх өгөгдөл байхгүй байна."
            });
        }
        
        const result = await prisma.users.update({
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

module.exports = UPDATE_USERS   