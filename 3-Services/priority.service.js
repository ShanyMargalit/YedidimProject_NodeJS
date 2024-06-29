import Service from "./service.js";
import repo from "../4-Repositories/priorities.repo.js";

class prioritiesService extends Service {
    constructor() {
        super(repo);
    }
    
    
}

export default new prioritiesService();