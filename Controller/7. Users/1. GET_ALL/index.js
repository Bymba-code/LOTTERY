const prisma = require("../../../Middlewares/prisma");

const GET_ALL_USERS = async (req, res) => {
    try {
        const { page, size } = req.query;

        const take = size ? parseInt(size) : undefined;
        const skip = page && size ? (page - 1) * size : undefined;

        let users;

        if (!page && !size) {
            users = await prisma.users.findMany({});
        } else {
            users = await prisma.users.findMany({
                skip: skip,
                take: take
            });
        }

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                data: [],
                message: "Өгөгдөл олдсонгүй."
            });
        }

        let maxPage;

        if (page && size) {
            const total = await prisma.users.count();  
            maxPage = Math.ceil(total / size);
        }

        return res.status(200).json({
            success: true,
            data: users,
            ...(maxPage && { maxPage }), 
            message: "Амжилттай"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            data: [],
            message: "Серверийн алдаа гарлаа." + err.message,
        });
    }
};

module.exports = GET_ALL_USERS;
