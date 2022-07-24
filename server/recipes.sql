CREATE DATABASE recipes_db;

use recipes_db;


/* CREATE USERS TABLE */
CREATE TABLE users
(
userID int auto_increment,
first_name varchar(255),
last_name varchar(255),
username varchar(255),
password varchar(1000),
description text,
profile_img varchar(255),
PRIMARY KEY (userID),
UNIQUE (username)
);

/* CREATE RECIPES TABLE */
CREATE TABLE recipes
(
recipeID int auto_increment,
recipe_name varchar(255),
user_id int,
recipe_content text,
recipe_img varchar(255),
PRIMARY KEY (recipeID),
FOREIGN KEY (user_id) references users(userID)
);

ALTER TABLE recipes
ADD recipe_desc text;

ALTER TABLE recipes
ADD recipe_info text;

ALTER TABLE recipes
DROP COLUMN recipe_content;

/* CREATE CATEGORIES (of recipes) TABLE */
CREATE TABLE categories
(
categoryID int auto_increment,
category_name varchar(255),
PRIMARY KEY (categoryID),
UNIQUE (category_name)
);


/* CREATE TABLE - connection table (recipes of categories) */
CREATE TABLE categories_of_recipes
(
rowID int auto_increment,
recipe_id int,
category_id int,
PRIMARY KEY (rowID),
FOREIGN KEY (recipe_id) references recipes(recipeID),
FOREIGN KEY (category_id) references categories(categoryID)
);


/* CREATE TABLE - connection table (recipes of users) */
CREATE TABLE recipes_of_users
(
rowID int auto_increment,
user_id int,
recipe_id int,
PRIMARY KEY (rowID),
FOREIGN KEY (user_id) references users(userID),
FOREIGN KEY (recipe_id) references recipes(recipeID),
CONSTRAINT UC_Recipe UNIQUE (user_id,recipe_id)
);

/* INSERT - USERS TABLE */
INSERT INTO users
(first_name, last_name, username, password, description, profile_img)
VALUES
("Yuval", "David", "yuval1", "123123", "Hello, I will happy to learn from your recipes.", "yuval.jpg"),
("Eyal", "David", "eyal024", "123123", "Hello everyone, I will happy to see your recipes.", "eyal.jpg"),
("Smadar", "David", "smadi_7", "123123", "", ""),
("Ayelet", "Artzi", "ayelet", "123123", "Hello, I will happy to share with you my special recipes.", "ayelet.jpg");



/* CREATE TABLE - connection table (recipes of users) */
CREATE TABLE products_of_recipes
(
rowID int auto_increment,
product_name varchar(255),
product_amount varchar(255),
recipe_id int,
PRIMARY KEY (rowID),
FOREIGN KEY (recipe_id) references recipes(recipeID)
);


/* CREATE TABLE - steps of recipes */
CREATE TABLE steps_recipes
(
rowID int auto_increment,
step text,
step_order int,
recipe_id int,
PRIMARY KEY (rowID),
FOREIGN KEY (recipe_id) references recipes(recipeID)
);



/* INSERT - CATEGORIES TABLE */
INSERT INTO categories
(category_name)
VALUES
("Milky"),
("Meat"),
("Healthy"),
("Breakfast"),
("Lunch"),
("Dinner"),
("Desserts"),
("Vegan"),
("Vegeterian");


ALTER TABLE recipes
DROP COLUMN recipe_info;

/* INSERT - PRODUCTS TABLE */
INSERT INTO recipes
(recipe_name, user_id, recipe_img, recipe_desc)
VALUES
("Steamed cabbage stew in tomato sauce", 1, "stewed-cabbage.jpg", "A great nostalgic recipe for any diet - steamed cabbage in a juicy tomato sauce that is a gentle addition to any dish, from meat and poultry dishes to vegetarian meatballs and even alongside mashed potatoes."),
("Rich bulgur salad", 2, "bulgur-salad.jpg", "Bulgur salad with cranberries and lots of herbs. Seasoned with good taste, festive and rich and most importantly - it is so delicious. Very suitable for an elaborate meal or as a dinner on its own."),
("Classic ice cream cake", 3, "ice-cream-cake.jpg", "You don't have to be a great baker to make this classic ice cream cake. The classic ice cream cake combines a layer of vanilla ice cream and a layer of chocolate ice cream."),
("Zucchini Pie", 1, "zucchini-casserol.jpg", "Let's make a delicious, nutritious and indulgent zucchini pie."),
("Mushroom risotto", 1, "mushroom-risotto.jpg", "You can't go wrong with a risotto like this - a detailed, step-by-step recipe for making a rich and indulgent mushroom risotto with a combination of dried and fresh mushrooms."),
("Omelet with potatoes", 4, "crispy-potato-omelette.jpg", "If there's one thing we've learned over time, it's that everyone loves a good omelette. And what could be better than an omelette filled with crispy potatoes? Easily prepare and enjoy an upgraded, satisfying and super tasty omelette!"),
("Amazing lotus cake", 2, "lotus-cake.jpg", "A recipe for an amazing lotus and cheese cake that is really easy to make. The cake combines spread and lotus cookies, cheese and vanilla aroma. It is better to prepare in advance because the cake requires freezing.");


/* INSERT - PRODUCTS TABLE  - recipe 1 */
INSERT INTO products_of_recipes
(product_name, product_amount, recipe_id)
VALUES
("Oil", "2 spoons", 1),
("Garlic cloves", "3-4, chopped", 1),
("A large onion, chopped", "1", 1),
("Paprika", "1 spoons", 1),
("Large cabbage", "1, grated or cut into strips", 1),
("Fresh tomato sauce", "1 cup", 1),
("Glass of water", "1-1.5", 1),
("Vinegar", "2 Spoons", 1),
("Sugar", "2 Spoons", 1 ),
("Salt and Pepper", "To taste", 1);


/* INSERT - STEPS TABLE  - recipe 1 */
INSERT INTO steps_recipes
(step, step_order, recipe_id)
VALUES
("Heat oil in a large pan over medium-high heat.", 1, 1),
("Add onion and cook for 3-4 minutes.", 2, 1),
("Add garlic, paprika, salt and pepper to taste. Cook and stir until the onion becomes soft and transparent.", 3, 1),
("Add shredded cabbage, tomato sauce and water to the pan. Mix everything well, taste and season again.", 4, 1),
("Cover the pan and continue to cook on medium-high heat for another 7-10 minutes.", 5, 1),
("When the cabbage becomes softer, you can add vinegar, sugar and more salt if necessary.
Continue to cook covered and stir every 3 minutes.", 6, 1),
("When the cabbage is cooked and very soft, turn off the heat and let the pot sit with the lid on for another 3 minutes.", 7, 1);




/* INSERT - PRODUCTS TABLE  - recipe 2 */
INSERT INTO products_of_recipes
(product_name, product_amount, recipe_id)
VALUES
("Washed thick bulgur", "1 cup", 2),
("Garlic cloves", "3-4, chopped", 2),
("Chopped parsley", "1 bundle", 2),
("Paprika", "1 spoons", 2),
("Chopped cabbage leaves", "5 + Chopped stem", 2),
("Chopped green onion stalks", "4", 2),
("Dried cranberries", "Handful", 2),
("Oil", "2 spoons", 2),
("Sugar", "1 Spoon", 2 ),
("Salt and Pepper", "To taste", 2);


/* INSERT - STEPS TABLE  - recipe 2 */
INSERT INTO steps_recipes
(step, step_order, recipe_id)
VALUES
("First of all, prepare the bulgur: strain the bulgur through a fine sieve and place in a bowl with a lid, cover with boiling water and soak for a full hour, until the bulgur is soft and ready to eat.", 1, 2),
("Drain the bulgur from liquid and leave to dry and cool in a sieve for 10 minutes.", 2, 2),
("In a large bowl, mix all the herbs and add the bulgur and cranberries.", 3, 2),
("In a glass, mix well olive oil, lemon, sugar, salt and black pepper - taste and adjust salt and pepper to taste.", 4, 2),
("Pour the dressing over the salad just before serving, mix well and serve.", 5, 2);



/* INSERT - CATEGORIES of RECIPES TABLE */
INSERT INTO categories_of_recipes
(recipe_id, category_id)
VALUES
(1, 8),
(1, 9),
(1, 3),
(1, 6),
(2, 8),
(2, 9),
(2, 3),
(2, 6);



/* INSERT - RECIPES of USERS TABLE */
INSERT INTO recipes_of_users
(user_id, recipe_id)
VALUES
(1, 2),
(1, 3),
(2, 4),
(3, 6),
(3, 7),
(4, 1),
(4, 2),
(4, 3);
