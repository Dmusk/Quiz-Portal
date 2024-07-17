"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./routes/user"));
const app = (0, express_1.default)();
const PORT = 4500;
const connectionString = "mongodb+srv://Dadu:DaduMDB%402003@cluster0.mzwtfbm.mongodb.net/quiz_portal";
// Middleware to parse JSON bodies
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send("This is My hosted site");
});
// user
// Redirect to -> /route/user 
app.use('/user', user_1.default);
mongoose_1.default.connect(connectionString, {}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});
