import Repository from "./repository.js";
import Request from "../5-Models/request.model.js";

class RequestRepository extends Repository {
    constructor() {
        super(Request);
    }

    async getAll(queryParameters) {
        const aggregationPipeline = [
            {
                $lookup: {
                    from: 'locations', // שם הקולקציה של המיקומים
                    localField: 'locationCode', // השדה בקולקציית הבקשות שמצביע על הקוד במיקומים
                    foreignField: '_id', // השדה בקולקציית המיקומים שמתאים לקוד
                    as: 'locationDetails'
                }
            },
            {
                $unwind: '$locationDetails' // לפצל את המערך שנוצר
            },
            {
                $match: { statusCode: "001" } // תנאי סינון בסיסי
            }
        ];

        // להוסיף תנאים לחיפוש אם נדרש
        if (queryParameters) {
            const matchConditions = {};

            if (queryParameters.statusCode) {
                matchConditions.statusCode = queryParameters.statusCode;
            }
            if (queryParameters.priorityCode) {
                matchConditions.priorityCode = queryParameters.priorityCode;
            }
            if (queryParameters.city) {
                matchConditions['locationDetails.city'] = queryParameters.city;
            }
            if (queryParameters.road) {
                matchConditions['locationDetails.road'] = queryParameters.road;
            }
            if (queryParameters.districtCode) {
                matchConditions['locationDetails.districtCode'] = queryParameters.districtCode;
            }

            if (Object.keys(matchConditions).length > 0) {
                aggregationPipeline.push({
                    $match: matchConditions
                });
            }
        }

        const res = await this.model.aggregate(aggregationPipeline).exec();
        console.log(res);
        return res;
    }
}

export default new RequestRepository();
