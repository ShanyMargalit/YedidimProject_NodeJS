import Repository from "./repository.js";
import priorities from "../5-Models/priority.model.js";

class prioritiesepository extends Repository {
    constructor() {
        super(priorities);
    }
  
}

export default new prioritiesepository();