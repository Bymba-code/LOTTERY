const prisma = require("../../../Middlewares/prisma")
const bcrypt = require("bcrypt")

const CREATE_USER = async (req , res) => {
    try 
    {
        const {firstName, lastName, phone, password, role} = req.body;

        if(!firstName)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Овог нэр оруулна уу."
            })
        }
        if(!lastName)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Нэрийг оруулна уу."
            })
        }
        if(!phone)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Гар утасны дугаар оруулна уу."
            })
        }
        if(!password)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message:"Нууц үг байхгүй оруулна уу."
            })
        }
        if(!role)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Хэрэглэгчийн эрхийг сонгоно уу."
            })
        }

        const isUser = await prisma.users.findMany({
            where:{ 
                phone:phone
            }
        })

        if(isUser.length > 0)
        {
            return res.status(402).json({
                success:false,
                data:[],
                message: "Хэрэглэгчийн утасны дугаар бүртгэлтэй байна."
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const result = await prisma.users.create({
            data:{
                firstname:firstName,
                lastname:lastName,
                phone:phone,
                password:hashedPassword,
                role:role,
                create_date:new Date()
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

module.exports = CREATE_USER