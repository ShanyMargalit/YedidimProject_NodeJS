import Repository from "./repository.js";
import district from "../5-Models/district.model.js";

class districtRepository extends Repository {
    constructor() {
        super(district);
    }
    async getById(queryParameters) {
        debugger
        if (queryParameters) {
            const query = { name: queryParameters };
            const projection = { _id: 0, cities: 1 }; // להחזיר רק את שדה הערים
    
            const location = await this.model.findOne(query, { projection });
    
            if (location) {
                console.log(location.cities);
                return location.cities;
            } else {
                console.log(`Location with name ${locationName} not found`);
                return null;
            }
            
        }
        const res = await this.model.find({ statusCode: "001" });
        console.log(res);
        return res;
    }
    
}

export default new districtRepository();