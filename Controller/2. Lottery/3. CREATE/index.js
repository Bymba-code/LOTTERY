const multer = require('multer');
const path = require('path');
const prisma = require("../../../Middlewares/prisma");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).single('image'); 

const CREATE_LOTTERY = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        // Return error if file upload fails
        return res.status(400).json({
          success: false,
          data: [],
          message: err.message,
        });
      }

      const { title, start_date, end_date } = req.body;

      if (!title) {
        return res.status(403).json({
          success: false,
          data: [],
          message: "Сугалааны нэрийг оруулна уу.",
        });
      }
      if (!start_date) {
        return res.status(403).json({
          success: false,
          data: [],
          message: "Сугалааны эхлэх хугацааг оруулна уу.",
        });
      }
      if (!end_date) {
        return res.status(403).json({
          success: false,
          data: [],
          message: "Сугалааны дуусах хугацааг оруулна уу.",
        });
      }

      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

      const lottery = await prisma.lottery.create({
        data: {
          title,
          start_date: new Date(start_date),
          end_date: new Date(end_date),
          image: imageUrl, 
        },
      });

      return res.status(200).json({
        success: true,
        data: lottery,
        message: 'Сугалаа амжилттай үүсгэгдлээ.',
      });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: [],
      message: "Серверийн алдаа гарлаа." + err,
    });
  }
};

module.exports = CREATE_LOTTERY;
