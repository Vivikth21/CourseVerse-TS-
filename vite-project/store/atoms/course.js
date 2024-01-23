import { atom } from "recoil";

export const courseState = atom({
    key:'courseState',
    default:{
        isLoading: false,
        course:
        {
            title: '', // Set default values or empty string for properties
            description: '',
            imageLink: '',
            price: '',
            
        }
    },
});