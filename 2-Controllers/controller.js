import autoBind from "auto-bind";

class Controller {

    constructor(service) {
        this.service = service;
        autoBind(this);
    }

    async getAll(req, res, next) {
        try {
            const result = await this.service.getAll(req.query);
            return res.status(200).json(result);
        }
        catch (e) {
            next(e);
        }
    }

    async get(req, res, next) {
        debugger
        const { id } = req.params;

        try {
            debugger
            const response = await this.service.getById(id);
            if (!response) {
                return res.status(404).json({ message: 'Not found' });
            }
            return res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    async insert(req, res, next) {
        debugger
        try {
            const response = await this.service.create(req.body);
            res.status(201).json();
        } catch (e) {
            // console.error(`Error: ${error.message}`);
            // res.status(500).json({ message: 'Server error', error: error.message });
            next(e);
        }
    }

    async update(req, res, next) {
        const { id } = req.params;
        try {
            const response = await this.service.update(id, req.body);
            return res.status(response.status).json(response);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        const { id } = req.params;
        try {
            const response = await this.service.delete(id);
            return res.status(response.statusCode).json(response);
        } catch (e) {
            next(e);
        }
    }
}

export default Controller;