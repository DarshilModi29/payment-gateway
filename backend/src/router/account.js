const router = require("express").Router();
const Auth = require("../middleware/Auth");
const Account = require("../models/accountSchema");
const bcryptjs = require("bcryptjs");

router.post("/api/createAccount", Auth, async (req, res) => {
    try {
        const user_id = req.user._id;
        const { payment_method } = req.body;
        const isExist = await Account.findOne({ user: user_id, payment_method });
        if (isExist) {
            return res.status(400).json({ message: "Account already exists" });
        }
        const account = new Account({
            user: user_id,
            payment_method
        });
        if (payment_method === "card") {
            const { cvv, card_num, card_name, card_expired, acc_num } = req.body;
            bcryptjs.hash(cvv, 10, (err, hashCvv) => {
                if (err) {
                    console.log(err.toString());
                    return res.status(500).json({ message: "Internal server error" })
                }
                account.cvv = hashCvv;
            });

            account.card_num = card_num;
            account.card_name = card_name;
            account.acc_num = acc_num;
            account.card_expired = card_expired;
        } else if (payment_method === "upi") {
            const { upi_id, mpin } = req.body;
            account.upi_id = upi_id;
            bcryptjs.hash(mpin, 10, (err, hashMpin) => {
                if (err) {
                    console.log(err.toString());
                    return res.status(500).json({ message: "Internal server error" })
                }
                account.mpin = hashMpin;
            });
        } else {
            return res.status(400).json({ message: "Invalid payment method" });
        }
        await account.save();
        res.json({ message: "Your account has been created" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/api/your-account", Auth, async (req, res) => {
    try {
        const data = await Account.find({ user: req.user._id });
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

module.exports = router