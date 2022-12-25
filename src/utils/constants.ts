export const BASE_URL = 'https://norma.nomoreparties.space/api';
export const BASE_WS = 'wss://norma.nomoreparties.space';

export interface IIngredient {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    index?: number;
};

export interface orderFeed {
    orders: orderFeedData[],
    total: number,
    totalToday: number
};

export interface orderFeedData {
    name: string;
    ingredients: string[],
    _id: string,
    status: string,
    number: number,
    createdAt: Date,
    updatedAt: Date
};

export enum orderStatus {
    "done" = "done",
    "pending" = "pending",
    "created" = "created"
};

export const orderStatusCategoryRu: {[key: string]: string} = {
    done : "Готово",
    pending: "В работе",
    created: "В работе",
    canceled: "Отменен"
};

export const orderStatusRu: {[key: string]: string} = {
    done : "Выполнен",
    pending: "В работе",
    created: "В работе",
    canceled: "Отменен"
};