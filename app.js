const mongoose = require("mongoose");
const express = require("express");
const api = require("./routes/api");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");

const app = express();

app.use(
	cors({
    origin: [
      "https://compassionate-visvesvaraya-95a676.netlify.app",
      "http://localhost:3000"
    ],
		optionsSuccessStatus: 200,
		credentials: true,
	})
);

app.use(compression());

app.use(helmet());

app.use(express.json());

app.use("/", api);

const database_Url =
	"mongodb+srv://khanhlieu:khanhlieuuit1710@filmticketbooking.op1jv.mongodb.net/filmTicketBooking?retryWrites=true&w=majority";
mongoose.connect(
	database_Url,
	{ useFindAndModify: true, useNewUrlParser: true, useUnifiedTopology: true },
	(error) => {
		if (!error) {
			console.log("Connect to MongoDB successful !!");
		} else {
			console.log("Failed to connect to MongoDB !!");
		}
	}
);

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log("Application is listening at port 5000");
});
