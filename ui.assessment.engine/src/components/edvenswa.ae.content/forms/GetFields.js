import { contentFields } from "./Fields";

 export const getContentFields = (keys = []) => {
    let fields = [];    
    keys.forEach((key) => {
        const field = contentFields[key];
        // avoid adding duplicate fields.
        if(!fields.includes(field)) {
            fields.push(field);
        }        
    });
    return fields;
}