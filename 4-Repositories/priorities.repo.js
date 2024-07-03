import Repository from "./repository.js";
import priorities from "../5-Models/priority.model.js";

class prioritiesepository extends Repository {
    constructor() {
        super(priorities);
    }
    async  getById(id) {
        try {
            // בדיקת id והדפסה לצורך דיבוג
            console.log(`Searching for document with id: ${id}`);
    
            // חיפוש המסמך לפי id שהוא מחרוזת
            const document = await this.model.findOne({ _id: id });
            if (!document) {
                console.log(`Document with id ${id} not found.`);
                return null;
            }
            console.log('Document found:', document); // הדפסת המסמך שנמצא
            return document;
        } catch (error) {
            console.error('Error retrieving document by id:', error);
            return null;
        }
    }
    async getAll(queryParameters) {
        let query = {};
        if (queryParameters) {
            // להוסיף תנאים לחיפוש אם נדרש
            // לדוגמה: אם יש שדות לחיפוש ב-queryParameters, להוסיף אותם לתנאים
            // query = { field1: queryParameters.field1, field2: queryParameters.field2, ... };
        }
        const res = await this.model.find(query, { priority: 1, _id: 0 });
        console.log(res);
        return res;
    }
  
}

export default new prioritiesepository();