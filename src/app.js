const path = require("path")
const express = require("express")
const app = express()

//app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static("public"))
app.set("views", "views")
//app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "hbs")

app.get("/", (req, res)=> {
  res.render("../public/views/index", {
    title: "Express Weather Finder"
  })

})


app.get("/about", (req, res) => {
  res.render("../public/views/about")
})

app.listen(3000, () => {
  console.log("server now running on Port 3000")
})