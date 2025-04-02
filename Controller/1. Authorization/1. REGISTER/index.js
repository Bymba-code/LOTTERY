const prisma = require("../../../Middlewares/prisma")
const bcrypt = require("bcrypt")

const REGISTER = async (req , res) => {
    try 
    {   
        const {firstName, lastName, phone, password} = req.body;

        // 1. Талбар шалгах
        if(!firstName)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message:"Овог нэр оруулна уу."
            })
        }
        if(!lastName)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Өөрийн нэр оруулна уу."
            })
        }
        if(!phone)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message:"Утасны дугаар оруулна уу."
            })
        }
        if(!password)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Нууц үг оруулна уу."
            })
        }

        // 2. Бүртгэлтэй эсэхийг шалгах

        const isUser = await prisma.users.findMany({
            where: {
                phone:phone
            }
        })

        if(isUser.length > 0)
        {
            return res.status(402).json({
                success:false,
                data:[],
                message: "Утасны дугаар бүртгэгдсэн байна."
            })
        }

        // 3. Нууц үг шиферлех

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // 4. Бүртгэх

        const result = await prisma.users.create({
            data:{
                firstname:firstName,
                lastname: lastName,
                phone: phone,
                password: hashedPassword,
                role: "user",
                create_date: new Date()
            }
        })

        return res.status(200).json({
            success:true,
            data:[],
            message: "Хэрэглэгчийн бүртгэлийг амжилттай үүсгэлээ."
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

module.exports = REGISTER