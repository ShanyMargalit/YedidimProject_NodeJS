import Controller  from "./controller.js";
import service from "../3-Services/priority.service.js";

class prioritiesController extends Controller {
    constructor() {
        super(service);
    }
}

export default new prioritiesController();