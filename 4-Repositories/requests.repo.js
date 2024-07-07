import Repository from "./repository.js";
import Request from "../5-Models/request.model.js";

class RequestRepository extends Repository {
    constructor() {
        super(Request);
    }

    async update(id, data) {
        try {
            const codeVolunteer = id;
            const idReq = data._id;

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
        const baseMatch = {
            statusCode: "001"
        };

        const aggregationPipeline = [
            {
                $match: baseMatch
            },
            {
                $lookup: {
                    from: 'locations',
                    localField: 'locationCode',
                    foreignField: '_id',
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
                    localField: 'locationDetails.districtCode',
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
                    road: '$locationDetails.road',
                    city: '$locationDetails.city',
                    district: '$districtDetails.name'
                }
            },
            {
                $lookup: {
                    from: 'priorities',
                    localField: 'priorityCode',
                    foreignField: '_id',
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
                    from: 'statuses',
                    localField: 'statusCode',
                    foreignField: '_id',
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
                    status: '$statusDetails.statusName'
                }
            },
            {
                $project: {
                    _id: 1,
                    description: 1,
                    phone: 1,
                    stuckPeople: 1,
                    status: 1,
                    priority: 1,
                    city: 1,
                    road: 1,
                    district: 1
                }
            }
        ];

        if (queryParameters) {
            const matchConditions = {};

            if (queryParameters.statusCode) {
                matchConditions.statusCode = queryParameters.statusCode;
            }
            if (queryParameters.priorityCode) {
                matchConditions.priorityCode = queryParameters.priorityCode;
            }
            if (queryParameters.city) {
                matchConditions.city = queryParameters.city;
            }
            if (queryParameters.road) {
                matchConditions.road = queryParameters.road;
            }
            if (queryParameters.district) {
                matchConditions.district = queryParameters.district;
            }

            if (Object.keys(matchConditions).length > 0) {
                console.log('Applying match conditions:', matchConditions);
                aggregationPipeline.push({
                    $match: matchConditions
                });
            }
        }

        const res = await this.model.aggregate(aggregationPipeline).exec();
        console.log('Aggregation result:', JSON.stringify(res, null, 2));
        return res;
    }
}

export default new RequestRepository();
