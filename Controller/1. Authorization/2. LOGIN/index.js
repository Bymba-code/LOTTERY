const prisma = require("../../../Middlewares/prisma")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const LOGIN = async (req , res) => {
    try 
    {
        const {phone, password} = req.body;

        // 1. Талбар шалгах
        if(!phone)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Утасны дугаар оруулна уу."
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

        // 2. Бүртгэл шалгах

        const isUser = await prisma.users.findMany({
            where:
            { 
                phone:phone
            }
        })

        if(isUser.length === 0)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Хэрэглэгчийн бүртгэл устсан эсвэл байхгүй байна."
            })
        }

        // 3. Нууц үг бэлтгэх, шалгах

        const hashedPassword = isUser[0].password
        const passwordMatch = await bcrypt.compare(password, hashedPassword)

        if(!passwordMatch)
        {
            return res.status(402).json({
                success:false,
                data:[],
                message: "Нууц үг буруу байна."
            })
        }

        // 4. Токен бэлтгэх

        const token = jwt.sign(
            {id:isUser[0].id, },
            process.env.TOKEN_SECRET,
            {expiresIn:"2h"}
        )

        // 5. Хариу 

        return res.status(200).json({
            success:false,
            data:token,
            role:isUser[0].role,
            message:"Амжилттай нэвтэрлээ."
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

module.exports = LOGIN