import {  profileFields } from "./profileFields";

export const getFormFields = (keys = []) => {
    let fields = [];    
    keys.forEach((key) => {
        const field = profileFields[key];
        // avoid adding duplicate fields.
        if(!fields.includes(field)) {
            fields.push(field);
        }        
    });
    return fields;
}