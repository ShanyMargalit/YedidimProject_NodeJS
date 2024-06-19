import Controller  from "./controller.js";
import service from "../3-Services/volunteer.service.js";

class VolunteerController extends Controller {
    constructor() {
        super(service);
    }
    
    async insert(req, res, next) {
        debugger
        try {
           const response = await this.service.create(req.body);
           res.status(201).json({ message: `Volunteer created successfully your code is ${response.codeVolunteer}` });
        } catch (e) {
            // console.error(`Error: ${error.message}`);
            // res.status(500).json({ message: 'Server error', error: error.message });
            next(e);
        }
    }
}

export default new VolunteerController();