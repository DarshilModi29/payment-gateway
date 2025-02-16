const router = require("express").Router();
const Transaction = require("../models/transactionSchema");
const Account = require("../models/accountSchema");
const Auth = require("../middleware/Auth");
const bcryptjs = require("bcryptjs");

router.post("/api/make-transaction", Auth, async (req, res) => {
    try {
        const sender = req.user._id;
        const { payment_method, amount } = req.body;
        const transaction = new Transaction({
            sender,
            payment_method,
            amount
        });
        if (payment_method === "upi") {
            const { upi_id, mpin } = req.body;
            const receiver = await Account.findOne({ upi_id: upi_id });
            const senderMpin = await Account.findOne({ user: sender });
            console.log(senderMpin);
            if (!receiver) {
                return res.status(404).json({ message: "User not found with this upi id" });
            }
            transaction.receiver = receiver._id;
        } else if (payment_method === "card") {
            const { account_num } = req.body;
            const receiver = await Account.findOne({ acc_num: account_num });
            if (!receiver) {
                return res.status(404).json({ message: "User not found with this upi id" });
            }
            transaction.receiver = receiver._id;
        }
        await transaction.save();
        res.json({ message: "Amount has been credited" });
    } catch (error) {
        console.log(error);
        res.json(500).json({ message: "Internal Server Error" });
    }
});

router.get("/api/transaction-history", Auth, async (req, res) => {
    try {
        const data = await Transaction.aggregate([
            {
                $match: {
                    $or: [
                        { receiver: req.user._id },
                        { sender: req.user._id }
                    ]
                },
            },
            {
                $lookup: {
                    from: "USER",
                    localField: "receiver",
                    foreignField: "_id",
                    as: "receiver"
                }
            },
            {
                $unwind: "$receiver"
            },
            {
                $lookup: {
                    from: "USER",
                    localField: "sender",
                    foreignField: "_id",
                    as: "sender"
                }
            },
            {
                $unwind: "$sender"
            },
            {
                $project: {
                    _id: 1,
                    "sender.username": 1,
                    "receiver.username": 1,
                    amount: 1
                }
            }
        ]);
        res.json(data);
    } catch (error) {
        console.log(error);
        res.json(500).json({ message: "Internal Server Error" });
    }
})

module.exports = router;