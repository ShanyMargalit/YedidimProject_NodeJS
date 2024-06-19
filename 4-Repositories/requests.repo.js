import Repository from "./repository.js";
import Volunteer from "../5-Models/request.model.js";

class RequestRepository extends Repository {
    constructor() {
        super(Volunteer);
    }
    async getAll(queryParameters) {
        let query = {};
        if (queryParameters) {
            const res = await this.model.aggregate([
                {
                    $lookup: {
                        from: 'district',
                        localField: 'locationId', // השדה בקולקציית הבקשות שמצביע על הקוד במיקומים
                        foreignField: '_id', // השדה בקולקציית המיקומים שמתאים לקוד
                        as: 'locationDetails'
                    }
                },
                {
                    $unwind: '$locationDetails'
                },
                {
                    $match: { 
                        'locationDetails.name': 'North', // התאם את שם המיקום כאן
                        'statusCode': 1 // הוספת תנאי לחיפוש לפי סטטוס
                    }
                }
            ]).toArray();
            // להוסיף תנאים לחיפוש אם נדרש
            // לדוגמה: אם יש שדות לחיפוש ב-queryParameters, להוסיף אותם לתנאים
            //query = { field1: queryParameters.field1, field2: queryParameters.field2, ... };
        }
        const res = await this.model.find({ statusCode: "001" });
        console.log(res);
        return res;
    }
}

export default new RequestRepository();