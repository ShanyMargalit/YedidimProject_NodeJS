import Repository from "./repository.js";
import Volunteer from "../5-Models/volunteer.model.js";

class VolunteersRepository extends Repository {
    constructor() {
        super(Volunteer);
    }
    async getById(id) {
        try {

            const volunteer = await this.model.findOne({ codeVolunteer: id });
            if (!volunteer) {
                // throw new Error(`Volunteer with code ${code} not found`);
                return null;
            }
            console.log(`Volunteer ${volunteer}`)

            return volunteer;
        } catch (error) {
            throw new Error(`Error fetching help request: ${error.message}`);
        }
    }
}

export default new VolunteersRepository();