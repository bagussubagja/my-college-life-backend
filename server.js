const express = require('express');
const cors = require('cors');
const app = express();

const db = require('./models');
db.sequelize.sync();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.json({ message: "Made by ❤️ from Bagus Subagja (2008315) 5B-RPL" });
});

require("./routes/task_routes.js")(app);

const PORT = process.env.PORT || 4000; app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});



