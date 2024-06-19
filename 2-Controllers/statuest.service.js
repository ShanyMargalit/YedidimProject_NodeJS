import Controller  from "./controller.js";
import service from "../3-Services/statuest.rpo.js";

class statuestController extends Controller {
    constructor() {
        super(service);
    }
}

export default new statuestController();