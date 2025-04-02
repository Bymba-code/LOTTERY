const express = require("express")
const GET_ALL_RACES = require("../../Controller/3. Race/1. GET_ALL")
const GET_SINGLE_RACE = require("../../Controller/3. Race/2. GET_SINGLE")
const CREATE_RACE = require("../../Controller/3. Race/3. CREATE")
const DELETE_RACE = require("../../Controller/3. Race/4. DELETE")
const UPDATE_RACE = require("../../Controller/3. Race/5. UPDATE")

const router = express.Router()

router.route("/race")
.get(GET_ALL_RACES)
.post(CREATE_RACE)

router.route("/race/:id").get(GET_SINGLE_RACE)
.delete(DELETE_RACE)
.put(UPDATE_RACE)

module.exports = router