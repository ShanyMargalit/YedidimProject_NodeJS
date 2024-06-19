import Controller  from "./controller.js";
import service from "../3-Services/district.service.js";

class DistrictController extends Controller {
    constructor() {
        super(service);
    }
}

export default new DistrictController();