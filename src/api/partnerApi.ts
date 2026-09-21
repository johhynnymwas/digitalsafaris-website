import { api } from './axios';

export const registerTransport = async (data: any) => {
    const res = await api.post('/transport/auth/register', data);
    return res.data;
};

export const registerRestaurant = async (data: any) => {
    const res = await api.post('/restaurant/auth/register', data);
    return res.data;
};

export const registerAccommodation = async (data: any) => {
    const res = await api.post('/accommodation/auth/register', data);
    return res.data;
};

export const registerPartnerByType = async (type: string, data: any) => {
    if (type === 'transport') return registerTransport(data);
    if (type === 'restaurant') return registerRestaurant(data);
    if (type === 'accommodation') return registerAccommodation(data);
    throw new Error('Invalid partner type');
};