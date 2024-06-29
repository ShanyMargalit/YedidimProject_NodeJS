import Repository from "./repository.js";
import statuest from "../5-Models/status.model.js";

class statuestRepository extends Repository {
    constructor() {
        super(statuest);
    }
  
}

export default new statuestRepository();