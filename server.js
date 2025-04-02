const express = require("express")
const authRoutes = require("./Routes/1. Authorization")
const lotteryRoutes = require("./Routes/2. Lottery")
const raceRoutes = require("./Routes/3. Races")
const prizeRoutes = require("./Routes/4. Prize")
const winnerRoutes = require("./Routes/5. Winners")
const customerRoutes = require("./Routes/6. Customers")
const userRoutes = require("./Routes/7. Users")

const app = express()

app.use(express.json())

app.use('/uploads', express.static('uploads'));


app.use(process.env.API, authRoutes)
app.use(process.env.API, lotteryRoutes)
app.use(process.env.API , raceRoutes)
app.use(process.env.API, prizeRoutes)
app.use(process.env.API, winnerRoutes)
app.use(process.env.API, customerRoutes)
app.use(process.env.API, userRoutes)



app.listen(3000, () => {
    console.log("App listening 3000")
})