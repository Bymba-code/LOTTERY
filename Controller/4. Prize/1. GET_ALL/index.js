const prisma = require("../../../Middlewares/prisma");

const GET_ALL_PRIZE = async (req, res) => {
    try {
        const { page, size } = req.query;

        const take = size ? parseInt(size) : undefined;
        const skip = page && size ? (page - 1) * size : undefined; 

        let prizes;

        if (!page || !size) {
            prizes = await prisma.lottery_race_prizes.findMany({
                include: {
                    lottery_race_winners: true,
                },
            });
        } else {
            prizes = await prisma.lottery_race_prizes.findMany({
                skip: skip,
                take: take,
                include: {
                    lottery_race_winners: true,
                },
            });
        }

        if (prizes.length === 0) {
            return res.status(404).json({
                success: false,
                data: [],
                message: "Өгөгдөл олдсонгүй.",
            });
        }

        let response = {
            success: true,
            data: prizes,
            message: "Амжилттай",
        };

        if (page && size) {
            const totalPrizes = await prisma.lottery_race_prizes.count();
            const maxPage = Math.ceil(totalPrizes / size);
            response.maxPage = maxPage;
        }

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({
            success: false,
            data: [],
            message: "Серверийн алдаа гарлаа." + err.message, 
        });
    }
};

module.exports = GET_ALL_PRIZE;
