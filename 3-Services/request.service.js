import Service from "./service.js";
import repo from "../4-Repositories/requests.repo.js";

class RequestService extends Service {
    constructor() {
        super(repo);
    }
    
    
}

export default new RequestService();
