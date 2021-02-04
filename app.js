const mongoose = require("mongoose");
const expresss = require("express");
const api = require("./routes/api");
const cors = require("cors");

const app = expresss();

app.use(cors({
	origin: ["http://localhost:3000"],
	credentials: true,
	optionsSuccessStatus: 200,
}))

app.use(expresss.json());

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

app.listen(5000, () => {
	console.log("Application is listening at port 5000");
});
