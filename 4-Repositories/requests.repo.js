// import Repository from "./repository.js";
// import Request from "../5-Models/request.model.js";

// class RequestRepository extends Repository {
//     constructor() {
//         super(Request);
//     }

//     async getAll(queryParameters) {
//         const aggregationPipeline = [
//             {
//                 $lookup: {
//                     from: 'locations', // שם הקולקציה של המיקומים
//                     localField: 'locationCode', // השדה בקולקציית הבקשות שמצביע על הקוד במיקומים
//                     foreignField: '_id', // השדה בקולקציית המיקומים שמתאים לקוד
//                     as: 'locationDetails'
//                 }
//             },
//             {
//                 $unwind: {
//                     path: '$locationDetails',
//                     preserveNullAndEmptyArrays: true
//                 }
//             },
//             {
//                 $lookup: {
//                     from: 'districts', 
//                     localField: 'districtCode', 
//                     foreignField: '_id', 
//                     as: 'districtDetails'
//                 }
//             },
//             {
//                 $unwind: {
//                     path: '$districtDetails',
//                     preserveNullAndEmptyArrays: true
//                 }
//             },
//             {
//                 $addFields: {
//                     district: '$districtDetails.Name' 
//                 }
//             },
//             {
//                 $lookup: {
//                     from: 'priorities', // שם הקולקציה של העדיפויות
//                     localField: 'priorityCode', // השדה בקולקציית הבקשות שמצביע על קוד העדיפות
//                     foreignField: '_id', // השדה בקולקציית העדיפויות שמתאים לקוד העדיפות
//                     as: 'priorityDetails'
//                 }
//             },
//             {
//                 $unwind: {
//                     path: '$priorityDetails',
//                     preserveNullAndEmptyArrays: true
//                 }
//             },
//             {
//                 $addFields: {
//                     priority: '$priorityDetails.priority' 
//                 }
//             },
//             {
//                 $lookup: {
//                     from: 'statuses', // שם הקולקציה של הסטטוסים
//                     localField: 'statusCode', // השדה בקולקציית הבקשות שמצביע על קוד הסטטוס
//                     foreignField: '_id', // השדה בקולקציית הסטטוסים שמתאים לקוד הסטטוס
//                     as: 'statusDetails'
//                 }
//             },
//             {
//                 $unwind: {
//                     path: '$statusDetails',
//                     preserveNullAndEmptyArrays: true
//                 }
//             },
//             {
//                 $addFields: {
//                     status: '$statusDetails.statusName' // להוסיף את statusName כ-status
//                 }
//             },
//             {
//                 $project: {
//                     locationCode: 0, 
//                     // statusCode: 0,
//                     'locationDetails._id': 0, // להסתיר את ה-_id של locationDetails אם נדרש
//                     statusDetails: 0,
//                     priorityDetails: 0 
//                 }
//             },
//             {
//                 $match: { statusCode: "001" } // תנאי סינון בסיסי
//             }
//         ];

//         // להוסיף תנאים לחיפוש אם נדרש
//         if (queryParameters) {
//             const matchConditions = {};

//             if (queryParameters.statusCode) {
//                 matchConditions.statusCode = queryParameters.statusCode;
//             }
//             if (queryParameters.priorityCode) {
//                 matchConditions.priorityCode = queryParameters.priorityCode;
//             }
//             if (queryParameters.city) {
//                 matchConditions['locationDetails.city'] = queryParameters.city;
//             }
//             if (queryParameters.road) {
//                 matchConditions['locationDetails.road'] = queryParameters.road;
//             }
//             if (queryParameters.districtCode) {
//                 matchConditions['locationDetails.districtCode'] = queryParameters.districtCode;
//             }

//             if (Object.keys(matchConditions).length > 0) {
//                 aggregationPipeline.push({
//                     $match: matchConditions
//                 });
//             }
//         }

//         const res = await this.model.aggregate(aggregationPipeline).exec();
//         console.log(res);
//         return res;
//     }
// }

// export default new RequestRepository();

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
                $unwind: {
                    path: '$locationDetails',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'districts',
                    localField: 'districtCode',
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
                    district: '$districtDetails.Name'
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
            {
                $project: {
                    locationCode: 0,
                    // statusCode: 0,
                    'locationDetails._id': 0, // להסתיר את ה-_id של locationDetails אם נדרש
                    statusDetails: 0,
                    priorityDetails: 0 
                }
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
