"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
const vehicleList = [];
app.get("/hello", (req, res) => {
    let message = "Hello world";
    res.send(message);
});
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '/index.html'));
});
app.post("/vehicle/add", (req, res) => {
    const { model, color, year, power, bodyType, wheelCount, draft, wingspan } = req.body;
    if (draft) {
        const newVehicle = {};
        if (model) {
            newVehicle.model = model;
        }
        ;
        if (color) {
            newVehicle.color = color;
        }
        ;
        if (year) {
            newVehicle.year = year;
        }
        ;
        if (power) {
            newVehicle.power = power;
        }
        ;
        newVehicle.draft = draft;
        vehicleList.push(newVehicle);
        console.log(vehicleList);
        return res.status(201).json({ message: 'Vehicle added' });
    }
    if (wingspan) {
        const newVehicle = {};
        if (model) {
            newVehicle.model = model;
        }
        ;
        if (color) {
            newVehicle.color = color;
        }
        ;
        if (year) {
            newVehicle.year = year;
        }
        ;
        if (power) {
            newVehicle.power = power;
        }
        ;
        newVehicle.wingspan = wingspan;
        vehicleList.push(newVehicle);
        console.log(vehicleList);
        return res.status(201).json({ message: 'Vehicle added' });
    }
    if ((!draft && !wingspan)) {
        const newVehicle = {
            model,
        };
        if (color) {
            newVehicle.color = color;
        }
        ;
        if (year) {
            newVehicle.year = year;
        }
        ;
        if (power) {
            newVehicle.power = power;
        }
        ;
        if (bodyType) {
            newVehicle.bodyType = bodyType;
        }
        ;
        if (wheelCount) {
            newVehicle.wheelCount = wheelCount;
        }
        ;
        vehicleList.push(newVehicle);
        console.log(vehicleList);
        return res.status(201).json({ message: 'Vehicle added' });
    }
    if (!model || !color || !year || !power || !bodyType || !wheelCount || !draft || !wingspan) {
        return res.status(400).json({ error: 'Some fields are required.' });
    }
});
app.get("/vehicle/search/:model", (req, res) => {
    const search = req.params.model;
    const getVehicle = vehicleList.find((vehicle) => vehicle.model === search);
    if (getVehicle) {
        return res.status(200).json(getVehicle);
    }
    else {
        return res.status(404).json({ error: "Vehicle not found" });
    }
});
app.listen(port, () => {
    console.log("Server is up'n'running at http://localhost:" + port);
});
