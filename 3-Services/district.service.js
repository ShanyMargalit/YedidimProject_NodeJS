import Service from "./service.js";
import repo from "../4-Repositories/district.repo.js";

class districtService extends Service {
    constructor() {
        super(repo);
    }
    
    
}

export default new districtService();