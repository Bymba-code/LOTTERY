const express = require("express")
const GET_ALL_USERS = require("../../Controller/7. Users/1. GET_ALL")
const GET_SINGLE_USERS = require("../../Controller/7. Users/2. GET_SINGLE")
const CREATE_USER = require("../../Controller/7. Users/3. CREATE")
const DELETE_USERS = require("../../Controller/7. Users/4. DELETE")
const UPDATE_USERS = require("../../Controller/7. Users/5. UPDATE")
const Authenticate = require("../../Middlewares/Authenticate")

const router = express.Router()

router.route("/users")
.get(GET_ALL_USERS)
.post(CREATE_USER)

router.route("/users/:id")
.delete(DELETE_USERS)
.put(UPDATE_USERS)

router.route("/users/detail").get(Authenticate, GET_SINGLE_USERS)


module.exports = router