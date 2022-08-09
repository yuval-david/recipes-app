/*************    USER ROUTES    *************/

const router = require('express').Router();
const sql_query = require('./query-promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pass = require('./pass');

// Array of all users
let users_arr;


// GET ALL USERS before every action
router.use(async (req, res, next) => {
    let q = `SELECT * FROM recipes_db.users;`;
    try {
        const results = await sql_query.Query(q);
        users_arr = results;
        console.log(users_arr);
    }
    catch (err) {
        res.sendStatus(500);
        throw err;
    }
    next();
});



// GET USER DETAILS BY USER ID
router.get("/:userID", async (req, res) => {
    let q = `SELECT * FROM recipes_db.users
            WHERE userID=${req.params.userID};`;
    try {
        const results = await sql_query.Query(q);
        users_arr = results;
        res.json(users_arr);
    }
    catch (err) {
        res.sendStatus(500);
        throw err;
    }
});


// POST LOGIN REQUEST (including TOKEN creation)
router.post("/login", async (req, res) => {

    // Request Body
    const { username, pass } = req.body;

    //Check if username & password were sent
    if (username && pass) {
        console.log(req.body);
        const user = users_arr.filter(u => u.username == req.body.username);

        // Check if user exist
        if (user.length) {
            const user_object = user[0];
            // Check if the encoded pass is correct (using bycrypt)
            if (bcrypt.compareSync(pass, user_object.password)) {
                jwt.sign(
                    {
                        username: user_object.username,
                        user_id: user_object.userID,
                        first_name: user_object.first_name
                    },
                    pass.JWT_Secret,
                    { expiresIn: "10m" },
                    (err, token) => {
                        if (err) {
                            res.sendStatus(500);
                            throw err;
                        }
                        res.status(201).json({
                            "token": token,
                            "user_id": user_object.userID,
                            "first_name": user_object.first_name
                        });
                    }
                );
            } else {
                res.status(400).send("Wrong password");
            }


        } else {
            res.status(400).send("User not found");
        }

    } else {
        res.status(400).send("Missing some info.");
    }
});


// POST REGISTER REQUEST (including password encode using bycrypt)
router.post("/register", async (req, res) => {

    // Request Body
    const { first_name, last_name, username, password, description, profile_img } = req.body;

    // Check if required details were sent
    if (first_name && last_name && username && password) {

        const user = users_arr.filter(u => u.username == req.body.username);

        if (user.length == 0) {
            // Generate hash from password & add the new user
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {

                    // Add the new user to DB
                    let q = `INSERT INTO users
                        (first_name, last_name, username, password, description, profile_img)
                        VALUES
                        ("${first_name}","${last_name}","${username}","${hash}","${description}","${profile_img}")
                        `;

                    try {
                        const results = await sql_query.Query(q);
                        console.log(results);
                        res.sendStatus(201);
                    }
                    catch (err) {
                        res.sendStatus(500);
                        throw err;
                    }

                });
            });
        } else {
            res.status(400).send("Username exist. Please try another username.")
        }

    } else {
        res.status(400).send("Missing some info");
    }

});


// PUT EDIT USER DETAILS REQUEST
router.put("/edit/:userID", async (req, res) => {

    const { first_name, last_name, description, profile_img } = req.body;

    let q = `UPDATE users SET first_name="${first_name}", last_name="${last_name}", description="${description}", profile_img="${profile_img}" WHERE userID=${req.params.userID};`;

    try {
        const results = await sql_query.Query(q);
        res.sendStatus(202);
    }
    catch (err) {
        res.sendStatus(500);
        throw err;
    }
});





module.exports = router;