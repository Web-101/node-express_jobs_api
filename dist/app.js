"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const db = __importStar(require("./db"));
const jobs_route_1 = __importDefault(require("./routes/jobs_route"));
const auth_route_1 = __importDefault(require("./routes/auth_route"));
const authentication_1 = __importDefault(require("./middlewares/authentication"));
// constants
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000,
    max: 50 // limit each IP to 50 requests per windowMs
});
// middleware
app.set("trust proxy", 1);
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(limiter);
// routes
app.use("/api/v1/jobs", authentication_1.default, jobs_route_1.default);
app.use("/api/v1/auth", auth_route_1.default);
// start server
app.listen(port, () => console.log("Server is running on port " + port));
// start db connection
db.connect(process.env.DB_URI);
