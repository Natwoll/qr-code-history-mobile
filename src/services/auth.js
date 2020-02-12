import { AsyncStorage } from 'react-native';

export const ADMIN_KEY = 'admin'
export const isAuthenticated = async () => await AsyncStorage.getItem(ADMIN_KEY);
export const getUserId = async () => await AsyncStorage.getItem(ADMIN_KEY);
export const login = async admin => {
    await AsyncStorage.setItem(ADMIN_KEY, admin);
};
export const logout = async () => {
    await AsyncStorage.removeItem(ADMIN_KEY);
};