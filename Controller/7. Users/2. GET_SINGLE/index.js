const prisma = require("../../../Middlewares/prisma")

const GET_SINGLE_USERS = async (req , res) => {
    try 
    {

        // 2. Байрыг шүүх
        const user = await prisma.users.findUnique({
            include:{
                lottery_race_winners:true,
                lottery_users:true
            },
            where:{
                id:parseInt(req.user.id)
            },
        })

        if(!user)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Устсан эсвэл байхгүй байна."
            })
        }

    
        return res.status(200).json({
            success:true,
            data:user,
            message: "Амжилттай"
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

module.exports = GET_SINGLE_USERS