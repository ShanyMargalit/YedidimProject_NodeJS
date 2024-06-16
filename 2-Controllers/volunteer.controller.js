import Controller  from "./controller.js";
import service from "../3-Services/volunteer.service.js";

class VolunteerController extends Controller {
    constructor() {
        super(service);
    }
}

export default new VolunteerController();