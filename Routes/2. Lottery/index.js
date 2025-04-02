const express = require("express")
const GET_ALL_LOTTERY = require("../../Controller/2. Lottery/1. GET_ALL")
const GET_SINGLE_LOTTERY = require("../../Controller/2. Lottery/2. GET_SINGLE")
const DELETE_LOTTERY = require("../../Controller/2. Lottery/4. DELETE")
const Authenticate = require("../../Middlewares/Authenticate")
const UPDATE_LOTTERY = require("../../Controller/2. Lottery/5. UPDATE")
const CREATE_LOTTERY = require("../../Controller/2. Lottery/3. CREATE")

const router = express.Router()

router.route("/lottery").get(GET_ALL_LOTTERY)
.post(CREATE_LOTTERY)

router.route("/lottery/:id")
.get(GET_SINGLE_LOTTERY)
.delete(Authenticate ,DELETE_LOTTERY)
.put(Authenticate ,UPDATE_LOTTERY)


module.exports = router