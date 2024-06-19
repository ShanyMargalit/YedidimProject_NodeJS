import Repository from "./repository.js";
import Volunteer from "../5-Models/request.model.js";

class RequestRepository extends Repository {
    constructor() {
        super(Volunteer);
    }
    
}

export default new RequestRepository();