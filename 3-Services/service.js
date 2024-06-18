class Service {
    constructor(repo) {
        this.repo = repo;
    }

    async getAll(queryParameters) {
        if (queryParameters) {
            //add coditions to find
        }
        return await this.repo.getAll(queryParameters);
    }

    async getById(id) {
        try {
            debugger
            //const response = await this.service.getAll(req.query);
            const response = await this.repo.getById(id);
            return response;
        } 
        catch (e) {
            console.log(e);
        }
        
        
    }

    async create(data) {
        return await this.repo.create(data);
    }

    async update(id, data) {
        return await this.repo.update(id, data);
    }

    async delete(id) {
        return await this.repo.delete(id);
    }
}

export default Service;