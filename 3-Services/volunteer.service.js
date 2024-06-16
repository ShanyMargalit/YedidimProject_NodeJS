import Service from "./service.js";
import repo from "../4-Repositories/volunteers.repo.js";

class VolunteerService extends Service {
    constructor() {
        super(repo);
    }
    
    
}

export default new VolunteerService();
