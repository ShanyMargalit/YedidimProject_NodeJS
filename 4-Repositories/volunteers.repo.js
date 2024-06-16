import Repository from "./repository.js";
import Volunteer from "../5-Models/volunteer.model.js";

class VolunteersRepository extends Repository {
    constructor() {
        super(Volunteer);
    }
}

export default new VolunteersRepository();