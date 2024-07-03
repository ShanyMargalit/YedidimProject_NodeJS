import Repository from "./repository.js";
import district from "../5-Models/district.model.js";
import districName from "../5-Models/districtName.model.js";
import connect from "./db.js"


class districtRepository extends Repository {

    constructor() {
        super(district);
        this.districName=districName;
        connect();
    }

    async getAll(queryParameters) {
        try {
            debugger
            const query = { name: queryParameters.name };
            const location = await this.model.findOne(query);
    
            if (location) {
                let result = {};
    
                if (queryParameters.cities === 'true' && queryParameters.roads === 'true') {
                    result = { roads: location.roads, cities: location.cities };
                } else if (queryParameters.roads === 'true') {
                    result = { roads: location.roads };
                } else if (queryParameters.cities === 'true') {
                    result = { cities: location.cities };
                } else if(queryParameters.name ==='true') {
                    result = location;
                }
    
                console.log(result);
                return result;
            } else {
                try {
                    const districtNames = await this.model.find({}, { name: 1, _id: 0 }); // מוצא את כל המחוזות עם השדה name בלבד
                    return districtNames;
                } catch (err) {
                    console.error("Error fetching district names:", err);
                    throw err;
                }
            }
        } catch (error) {
            console.error('Error retrieving location:', error);
            return null;
        }
    }
   
    
}



export default new districtRepository();