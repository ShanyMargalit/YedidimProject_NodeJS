import Controller  from "./controller.js";
import service from "../3-Services/status.service.js";

class statuestController extends Controller {
    constructor() {
        super(service);
    }
}

export default new statuestController();