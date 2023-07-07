const express = require("express");
const exphbs = require('express-handlebars')
const path = require('path');
require("dotenv").config();
const app = express();
const port = process.env.TOKEN | 8000;
const db = require("./config/db").connect();
const Group = require("./models/group")
const User = require("./models/user")
var hbs = exphbs.create({});
//BodyParser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Initial template engines
app.engine('.hbs', exphbs.engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')

hbs.handlebars.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});
//Requests
app.get("/", async (req, res) => {
    try {
        const courses = await Group.find().lean();
    const len = (await User.find()).length
    res.render("home", {
        title: "Asosiy sahifa",
        groups: [courses.filter(e=> e.course==1 || e.groupY==2022),courses.filter(e=> e.course==2 || e.groupY==2021),courses.filter(e=> e.course==3 || e.groupY==2020),courses.filter(e=> e.course==4 || e.groupY==2019)],
        len,
        lenGroup: courses.length
    })
    } catch (error) {
        console.log(error);
        res.render('error', {
            title: "Xatolik",
            error: error
        })
    }
})
app.get("/view/:groupName", async (req, res) => {
    const group = await Group.findOne({ groupName: req.params.groupName }).lean();
    res.render("one", {
        title: "Guruh ma'lumotlari",
        group
    })
})
app.get("/edit/:groupName", async (req, res) => {
    const group = await Group.findOne({ groupName: req.params.groupName }).lean();
    res.render("edit", {
        title: "Tahrirlash",
        group
    })
})
app.post("/edit/:groupName", async (req, res) => {
    const { groupName, context, course } = req.body;
    await Group.findOneAndUpdate({ groupName: req.params.groupName },
        { groupName, context, course: Number(course) }
    )
    res.redirect("/")
})
app.post("/add", async (req, res) => {
    try {
        const { groupName, context, course } = req.body
        await Group.create({ groupName, context, course: Number(course) })
        res.redirect("/")
    } catch (error) {
        console.log(error);
        res.render('error', {
            title: "Xatolik",
            error: error
        })
    }
})
app.get("/delete/:groupName", async (req, res) => {
    try {
        await Group.findOneAndDelete({ groupName: req.params.groupName })
        res.redirect("/")
    } catch (error) {
        console.log(error);
        res.render('error', {
            title: "Xatolik",
            error: error
        })
    }
})
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})