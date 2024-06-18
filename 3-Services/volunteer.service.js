import Service from "./service.js";
import repo from "../4-Repositories/volunteers.repo.js";

class VolunteerService extends Service {
    constructor() {
        super(repo);
    }
    async create(data) {
        // בדיקת תקינות של השדות
        if (!data._id || !data.firstName) {
            throw new Error("Missing required fields _id or firstName");
        }
       debugger
       const idLength = data._id.length;

       // חישוב הספרות הראשונה, האחרונה והאמצעית של תעודת הזהות
       const firstDigit = data._id[0];
       const lastDigit = data._id[idLength - 1];
       const middleDigit = data._id[Math.floor(idLength / 2)];

       const firstCharAscii = data.firstName.charCodeAt(0);

       // חישוב הקוד האסכי של האות האחרונה של שם המשפחה
       const lastCharAscii = data.lastName.charCodeAt(data.lastName.length - 1);

       // יצירת השדה code
       const code = `${firstDigit}${middleDigit}${lastDigit}${lastCharAscii}${firstCharAscii}`;

        // יצירת עותק חדש של האובייקט והוספת השדה 'code'
        const newData = { ...data, codeVolunteer: code };

        // הוספת לוג כדי לבדוק את newData
        console.log('newData with added code:', newData);

        // יצירת הרשומה במסד הנתונים עם הנתונים המעודכנים
        const result = await this.repo.create(newData);

        // הוספת לוג כדי לבדוק את התוצאה מהמסד נתונים
        console.log('Result from database:', result);

        return result

    }
    
}

export default new VolunteerService();
