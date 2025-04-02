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

const upload = multer({ storage: storage }).fields([
  { name: 'image', maxCount: 1 }, 
  { name: 'ebarimt', maxCount: 1 }  
]);

const CREATE_CUSTOMER = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      const { lottery } = req.body;

      if (!lottery) {
        return res.status(400).json({
          success: false,
          message: "Өгөгдөл дутуу байна.",
        });
      }

      const imageUrl = req.files['image'] ? `/uploads/${req.files['image'][0].filename}` : null;
      const ebarimtUrl = req.files['ebarimt'] ? `/uploads/${req.files['ebarimt'][0].filename}` : null;


      if(!imageUrl || !ebarimtUrl)
      {
        return res.status(404).json({
            success:false,
            data:[],
            message: "Зурагнуудыг оруулна уу."
        })
      }

      const customer = await prisma.lottery_users.create({
        data: {
          lottery:parseInt(lottery),
          user:req.user.id,
          ebarimt_img:ebarimtUrl,
          image: imageUrl,
          isAllow: 0,
          date: new Date() 
        },
      });

      return res.status(200).json({
        success: true,
        data: customer,
        message: 'Хэрэглэгч амжилттай үүсгэгдлээ.',
      });
    });
  } catch (err) {
    // Серверийн алдаа
    return res.status(500).json({
      success: false,
      message: "Серверийн алдаа гарлаа. " + err,
    });
  }
};

module.exports = CREATE_CUSTOMER;
