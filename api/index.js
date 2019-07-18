var config = require("config");
var express = require('express');
var app = express();
var Bcrypt = require('bcryptjs');
var validator = require('joi');
var AdminClass = require("./models/admin");
require('./connections/serverConnection');
app.use(express.json());
const auth = require("./middleware/auth");
var donors = require('./routes/donor');
app.use('/donor', donors);

if (!config.get("myprivatekey")) {
    console.error("FATAL ERROR: myprivatekey is not defined.");
    process.exit(1);
}

app.post('/admin/register', async (req, res) => {
    const validationSchema = {
        username: validator.string().required().lowercase(),
        password: validator.required()
    }
    const resultOfValidator = validator.validate(req.body, validationSchema);
    if (resultOfValidator.error) {
        res.status(400).send({
            message: resultOfValidator.error.details[0].message
        });
    } else {
        req.body.password = Bcrypt.hashSync(req.body.password, Bcrypt.genSaltSync(10));
        var user = await AdminClass.findOne({ username: req.body.username }).exec();
        if (user) {
            return res.send({ message: "The username exist" });
        } else {
            const course = new AdminClass({
                username: req.body.username,
                password: req.body.password,
            });

            await course.save();
            res.json(course);
        }
    }
});

app.post("/admin/login", async (req, res) => {

    try {
        var user = await AdminClass.findOne({ username: req.body.username }).exec();
        if (!user) {
            return res.status(400).send({ message: "The username does not exist" });
        }
        if (!Bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).send({ message: "The password is invalid" });
        }
        const token = user.generateAuthToken();
        res.header("x-auth-token", token).json({ message: "Correct!" });
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/admin/me", auth, async (req, res) => {
    const token = req.header("x-auth-token");
    res.status(401);
    const user = await AdminClass.findById({ _id: req.body.id }).select("-password");
    res.json(user);
})


app.listen(process.env.PORT || 3000);

