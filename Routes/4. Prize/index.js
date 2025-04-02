const express = require("express")
const GET_ALL_PRIZE = require("../../Controller/4. Prize/1. GET_ALL")
const GET_SINGLE_PRIZE = require("../../Controller/4. Prize/2. GET_SINGLE")
const CREATE_PRIZE = require("../../Controller/4. Prize/3. CREATE")
const DELETE_PRIZE = require("../../Controller/4. Prize/4. DELETE")
const UPDATE_PRIZE = require("../../Controller/4. Prize/5. UPDATE")

const router = express.Router()

router.route("/prize").get(GET_ALL_PRIZE)
.post(CREATE_PRIZE)

router.route("/prize/:id")
.get(GET_SINGLE_PRIZE)
.delete(DELETE_PRIZE)
.put(UPDATE_PRIZE)

module.exports = router