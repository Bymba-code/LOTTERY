const express = require("express")
const GET_ALL_CUSTOMERS = require("../../Controller/6. Customers/1. GET_ALL")
const GET_SINGLE_CUSTOMERS = require("../../Controller/6. Customers/2. GET_SINGLE")
const DELETE_CUSTOMER = require("../../Controller/6. Customers/4. DELETE")
const UPDATE_CUSTOMERS = require("../../Controller/6. Customers/5. UPDATE")
const CREATE_CUSTOMER = require("../../Controller/6. Customers/3. CREATE")
const Authenticate = require("../../Middlewares/Authenticate")

const router = express.Router()

router.route("/customers").get(Authenticate, GET_ALL_CUSTOMERS)
.post(Authenticate, CREATE_CUSTOMER)

router.route("/customers/:id")
.get(GET_SINGLE_CUSTOMERS)
.delete(DELETE_CUSTOMER)
.put(UPDATE_CUSTOMERS)

module.exports = router