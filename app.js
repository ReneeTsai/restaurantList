const express = require("express");
const exphbs = require("express-handlebars");
//參考:把results加進變數
const restaurants = require("./restaurant.json").results;

const app = express();
const port = 3000;
// setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// setting static files
app.use(express.static("public"));
// routes setting
app.get("/", (req, res) => {
  res.render("index", { restaurants });
});
//search input
app.get("/search", (req, res) => {
  const keywords = req.query.keywords;
  const filterRestaurantsData = restaurants.filter(
    (data) =>
      data.name.toLowerCase().includes(keywords.trim().toLowerCase()) ||
      data.category.includes(keywords.trim().toLowerCase())
  );
  //keywords: keywords
  res.render("index", { restaurants: filterRestaurantsData, keywords });
});

app.get("/restaurants/:restaurantId", (req, res) => {
  const { restaurantId } = req.params;
  //restaurantId-string
  const restaurant = restaurants.find((data) => data.id == restaurantId);
  res.render("show", { restaurant });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
