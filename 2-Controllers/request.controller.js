import Controller  from "./controller.js";
import service from "../3-Services/request.service.js";

class RequestController extends Controller {
    constructor() {
        super(service);
    }
}

export default new RequestController();