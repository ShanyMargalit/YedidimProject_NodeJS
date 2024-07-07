
import Repository from "./repository.js";
import Request from "../5-Models/request.model.js";

class RequestRepository extends Repository {
    constructor() {
        super(Request);
    }
    async update(id, data) {
        debugger;
        try {
            const codeVolunteer = id;
            const idReq = data._id;

            // עדכון הבקשה עם הסטטוס החדש וה-codeVolunteer
            const updatedRequest = await this.model.findByIdAndUpdate(
                idReq,
                { $set: { statusCode: '002', codeVolunteer: codeVolunteer } },
                { new: true }
            );

            if (!updatedRequest) {
                return { status: 404, message: 'Request not found.' };
            }

            return { status: 200, data: updatedRequest };
        } catch (error) {
            console.error('Error updating request:', error);
            return { status: 500, message: 'Internal Server Error' };
        }
    }
    async getAll(queryParameters) {
        const aggregationPipeline = [
            {
                $match: { statusCode: "001" } // תנאי סינון בסיסי
            },
            {
                $lookup: {
                    from: 'locations', // שם הקולקציה של המיקומים
                    localField: 'locationCode', // השדה בקולקציית הבקשות שמצביע על הקוד במיקומים
                    foreignField: '_id', // השדה בקולקציית המיקומים שמתאים לקוד
                    as: 'locationDetails'
                }
            },
            {
                $unwind: {
                    path: '$locationDetails',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'districts',
                    localField: 'locationDetails.districtCode', // שדה districtCode בתוך locationDetails
                    foreignField: '_id',
                    as: 'districtDetails'
                }
            },
            {
                $unwind: {
                    path: '$districtDetails',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    road: '$locationDetails.road', // הוספת הכביש
                    city: '$locationDetails.city', //הוספת העיר 
                    district: '$districtDetails.name' // הוספת שם המחוז
                }
            },
            {
                $lookup: {
                    from: 'priorities', // שם הקולקציה של העדיפויות
                    localField: 'priorityCode', // השדה בקולקציית הבקשות שמצביע על קוד העדיפות
                    foreignField: '_id', // השדה בקולקציית העדיפויות שמתאים לקוד העדיפות
                    as: 'priorityDetails'
                }
            },
            {
                $unwind: {
                    path: '$priorityDetails',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    priority: '$priorityDetails.priority' 
                }
            },
            {
                $lookup: {
                    from: 'statuses', // שם הקולקציה של הסטטוסים
                    localField: 'statusCode', // השדה בקולקציית הבקשות שמצביע על קוד הסטטוס
                    foreignField: '_id', // השדה בקולקציית הסטטוסים שמתאים לקוד הסטטוס
                    as: 'statusDetails'
                }
            },
            {
                $unwind: {
                    path: '$statusDetails',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    status: '$statusDetails.statusName' // להוסיף את statusName כ-status
                }
            },
            // שלב הוספת נקודת בקרה לוודא שהשדות קיימים
            {
                $project: {
                    _id: 1, // להצגת מזהה הזריקה
                    description: 1, // הצגת תיאור הזריקה
                    phone: 1, // הצגת מספר טלפון
                    stuckPeople: 1, // הצגת מספר האנשים התקועים
                    status: 1, // הצגת שם הסטטוס
                    priority: 1, // הצגת העדיפות
                    city: 1, // הצגת העיר
                    road: 1, // 
                    district: 1, // הצגת המחוז
                   
                }
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
        console.log(JSON.stringify(res, null, 2)); // הצגת התוצאות בדיבוג
        return res;
    }
}

export default new RequestRepository();
