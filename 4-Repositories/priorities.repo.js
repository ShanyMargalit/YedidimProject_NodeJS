import Repository from "./repository.js";
import priorities from "../5-Models/priorities.repo.js";

class prioritiesepository extends Repository {
    constructor() {
        super(priorities);
    }
  
}

export default new prioritiesepository();