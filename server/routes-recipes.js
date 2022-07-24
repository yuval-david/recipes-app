/*************    RECIPES ROUTES    *************/
const router = require('express').Router();
const sql_query = require('./query-promise');



// GET ALL RECIPES
router.get("/", async (req, res) => {
    let q = `SELECT * FROM recipes_db.recipes;`;

    try {
        const results = await sql_query.Query(q);
        res.send(results);
    }
    catch (err) {
        res.sendStatus(500);
        throw err;
    }

});


// GET ALL RECIPES CATEGORIES
router.get("/categories", async (req, res) => {
    let q = `SELECT * FROM recipes_db.categories;`;

    try {
        const results = await sql_query.Query(q);
        res.send(results);
    }
    catch (err) {
        res.sendStatus(500);
        throw err;
    }
});

// GET RECIPE DETAILS BY RECIPE ID
router.get("/:recipeID", async (req, res) => {
    let q = `SELECT * FROM recipes_db.recipes
            WHERE recipeID=${req.params.recipeID};`;
    try {
        const results = await sql_query.Query(q);
        res.send(results);
    }
    catch (err) {
        res.sendStatus(500);
        throw err;
    }
});


// GET RECIPE STEPS BY RECIPE ID
router.get("/steps/:recipeID", async (req, res) => {
    let q = `SELECT * FROM recipes_db.steps_recipes
            WHERE recipe_id=${req.params.recipeID} ORDER BY step_order;`;
    try {
        const results = await sql_query.Query(q);
        res.send(results);
    }
    catch (err) {
        res.sendStatus(500);
        throw err;
    }
});


// GET RECIPE PRODUCTS BY RECIPE ID
router.get("/products/:recipeID", async (req, res) => {
    let q = `SELECT * FROM recipes_db.products_of_recipes
            WHERE recipe_id=${req.params.recipeID};`;
    try {
        const results = await sql_query.Query(q);
        res.send(results);
    }
    catch (err) {
        res.sendStatus(500);
        throw err;
    }
});


// GET RECIPES CREATED BY SPECIFIC USER
router.get("/owner/:userID", async (req, res) => {
    let q = `SELECT * FROM recipes_db.recipes 
            WHERE user_id=${req.params.userID};`;

    try {
        const results = await sql_query.Query(q);
        res.send(results);
    }
    catch (err) {
        res.sendStatus(500);
        throw err;
    }
});


// GET FAVORITES RECIPES IDs BY SPECIFIC USER
router.get("/favorites/:userID", async (req, res) => {
    let q = `SELECT recipe_id FROM recipes_db.recipes_of_users
            WHERE user_id=${req.params.userID};`;

    try {
        const results = await sql_query.Query(q);
        res.send(results);
    }
    catch (err) {
        res.sendStatus(500);
        throw err;
    }
});

// GET ALL RECIPES IDs OF A SPECIFIC CATEGORY
router.get("/category/:categoryID", async (req, res) => {
    let q = `SELECT * FROM recipes_db.categories_of_recipes
            WHERE category_id=${req.params.categoryID};`;

    try {
        const results = await sql_query.Query(q);
        res.send(results);
    }
    catch (err) {
        res.sendStatus(500);
        throw err;
    }
});



// POST ADD NEW RECIPE BY USER
// 4 PARTS - Need to finish this request
router.post("/add/recipe_details", async (req, res) => {
    const { recipe_name, user_id, recipe_img, recipe_desc } = req.body;
    const { recipe_cats } = req.body; //Array with IDs of recipe categories
    let q = `INSERT INTO recipes
    (recipe_name, user_id, recipe_img, recipe_desc)
    VALUES 
    (${recipe_name}, ${user_id}, ${recipe_img}, ${recipe_desc});`;
    q += ``;
    try {
        const results = await sql_query.Query(q);
        res.status(201).send(results);
    }
    catch (err) {
        res.sendStatus(500);
        throw err;
    }
});















module.exports = router;