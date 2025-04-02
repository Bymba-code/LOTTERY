const express = require("express")
const GET_ALL_WINNERS = require("../../Controller/5. Winners/1. GET_ALL")
const GET_SINGLE_WINNER = require("../../Controller/5. Winners/2. GET_SINGLE")
const CREATE_WINNER = require("../../Controller/5. Winners/3. CREATE")
const DELETE_WINNER = require("../../Controller/5. Winners/4. DELETE")

const router = express.Router()

router.route("/winner")
.get(GET_ALL_WINNERS)
.post(CREATE_WINNER)


router.route("/winner/:id")
.get(GET_SINGLE_WINNER)
.delete(DELETE_WINNER)


module.exports = router