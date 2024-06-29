import Service from "./service.js";
import statuest from "../4-Repositories/statuses.repo.js";

class statuestService extends Service {
    constructor() {
        super(statuest);
    }
    
    
}

export default new statuestService();