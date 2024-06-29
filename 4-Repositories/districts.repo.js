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
    async getById(queryParameters) {
        debugger
        if (queryParameters) {
            const query = { name: queryParameters };
            // const projection = {  cities: 1, _id: 0 }; // להחזיר רק את שדה הערים

            const location = await this.model.findOne(query);

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
                } else {
                    result = location;
                }
    
                console.log(result);
                return result;
            } else {
               return await this.model.find();
                
                // return location;
                // console.log(`Location not found`);
                // return null;
            }
        } catch (error) {
            console.error('Error retrieving location:', error);
            return null;
        }
    }
   
    
}



export default new districtRepository();