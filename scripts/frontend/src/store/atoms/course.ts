import { atom } from "recoil";

export const courseState = atom({
    key:'courseState',
    default:{
        isLoading: false,
        course:
        {
            _id: '',
            title: '', // Set default values or empty string for properties
            description: '',
            imageLink: '',
            price: '',
            
        }
    },
});