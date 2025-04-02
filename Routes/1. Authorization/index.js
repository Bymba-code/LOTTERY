const express = require("express")
const REGISTER = require("../../Controller/1. Authorization/1. REGISTER")
const LOGIN = require("../../Controller/1. Authorization/2. LOGIN")

const router = express.Router()

router.route("/auth/register").post(REGISTER)

router.route("/auth/login").post(LOGIN)

module.exports = router