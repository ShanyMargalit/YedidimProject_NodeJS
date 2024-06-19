import connect from './db.js';

class Repository {
    constructor(model) {
        this.model = model;
        connect();
    }

    async getAll(queryParameters) {
        let query = {};
        if (queryParameters) {
            // להוסיף תנאים לחיפוש אם נדרש
            // לדוגמה: אם יש שדות לחיפוש ב-queryParameters, להוסיף אותם לתנאים
            // query = { field1: queryParameters.field1, field2: queryParameters.field2, ... };
        }
        const res = await this.model.find({});
        console.log(res);
        return res;
    }

    async getById(id) {
        try {
            // Assuming this.repo.getAll(queryParameters) returns an array of documents
            const helpRequests = await this.getAll();
            console.log(helpRequests, id);

            const result = helpRequests.find(help => help._id == id);
            return result;

        } catch (error) {
            throw new Error(`Error fetching help request: ${error.message}`);
        }
    }

    async create(data) {
       
        return await this.model.create(data);
    }

    async update(id, data) {
        return await this.model.findByIdAndUpdate(id, data);
    }

    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }
}

export default Repository;