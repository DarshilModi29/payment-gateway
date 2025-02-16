const router = require("express").Router();
const Auth = require("../middleware/Auth");
const Users = require("../models/userSchema");
const bcryptjs = require("bcryptjs");

router.post("/api/register", async (req, res) => {
    try {
        const { username, email, password, pan_number, aadhar_number, phn_number } = req.body;

        const isExist = await Users.findOne({ email });
        if (isExist) {
            return res.status(400).json({ message: "Email already exist" });
        }
        const user = await new Users({
            username,
            email,
            pan_number,
            aadhar_number,
            phn_number,
        });
        bcryptjs.hash(password, 10, (err, hashPass) => {
            if (err) {
                console.log(err.toString());
                return res.status(500).json({ message: "Internal server error" })
            }
            user.set('password', hashPass);
            user.save();
            res.json({ message: "User create successfully" });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Your account has been created" });
    }
});

router.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const validate = await bcryptjs.compare(password, user.password);
        if (!validate) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        const payload = {
            id: user._id,
            username: user.username,
        };
        let jwt_key = process.env.JWT_SECRET_KEY;
        const expiresIn = 2 * 365 * 24 * 60 * 60;
        jwt.sign(
            payload,
            jwt_key,
            { expiresIn },
            (err, token) => {
                if (err) {
                    console.log(err.toString);
                    return res.status(500).json({ message: "Internal server error" })
                }
                return res.json({ user, token });
            }
        );
    } catch (error) {
        console.log(error.toString());
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;