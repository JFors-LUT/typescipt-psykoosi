import express, {Express, Request, Response} from "express";
import path from "path";
const app: Express = express();
const port: number = 3000;

app.use(express.json());

interface Vehicle {
    model?: string;
    color?: string;
    year?: number;
    power?: number;
    bodyType?: string;
    wheelCount?: number;
    draft?: number;
    wingspan?: number;
  }



const vehicleList: Vehicle[] = [];

app.get("/hello", (req: Request, res: Response) => {
    let message: string = "Hello world";
    res.send(message);
});

app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.post("/vehicle/add", (req: Request, res: Response) => {
    const { model, color, year, power, bodyType, wheelCount, draft, wingspan} = req.body;

    if(draft){
        const newVehicle: Vehicle = {
        };

        if (model) {
          newVehicle.model = model;
        };

        if (color) {
          newVehicle.color = color;
        };

        if (year) {
          newVehicle.year = year;
        };
        if (power) {
          newVehicle.power = power;
        };

        newVehicle.draft = draft
        
          vehicleList.push(newVehicle);
          console.log(vehicleList)
        return res.status(201).json({ message: 'Vehicle added' });
    }

    if(wingspan){
        const newVehicle: Vehicle = {
          };
          if (model) {
            newVehicle.model = model;
          };

          if (color) {
            newVehicle.color = color;
          };

          if (year) {
            newVehicle.year = year;
          };
          if (power) {
            newVehicle.power = power;
          };

          newVehicle.wingspan = wingspan

          vehicleList.push(newVehicle);
          console.log(vehicleList)
        return res.status(201).json({ message: 'Vehicle added' });
    }
    
    if ((!draft && !wingspan) ) {
        const newVehicle: Vehicle = {
            model,
          };

          if (color) {
            newVehicle.color = color;
          };

          if (year) {
            newVehicle.year = year;
          };
          if (power) {
            newVehicle.power = power;
          };

          if (bodyType) {
            newVehicle.bodyType = bodyType;
          };
          if (wheelCount) {
            newVehicle.wheelCount = wheelCount;
          };

        
          vehicleList.push(newVehicle);
          console.log(vehicleList);
          
      return res.status(201).json({ message: 'Vehicle added' });
      }
    
if (!model || !color || !year || !power || !bodyType || !wheelCount || !draft || !wingspan){
  return res.status(400).json({ error: 'Some fields are required.' });
}
});

app.get("/vehicle/search/:model", (req: Request, res: Response) => {
    
    const search = req.params.model;
  
    const getVehicle = vehicleList.find((vehicle) => vehicle.model === search);
  
    if (getVehicle) {
      return res.status(200).json(getVehicle);
    } else {
      return res.status(404).json({ error: "Vehicle not found" });
    }
  });


app.listen(port, () => {
    console.log("Server is up'n'running at http://localhost:" + port);
});

