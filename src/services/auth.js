import { AsyncStorage } from 'react-native';

export const USER_KEY = 'user'
export const isAuthenticated = async () => await AsyncStorage.getItem(USER_KEY);
export const getUserId = async () => await AsyncStorage.getItem(USER_KEY);
export const login = async user => {
    await AsyncStorage.setItem(USER_KEY, user);
};
export const logout = async () => {
    await AsyncStorage.removeItem(USER_KEY);
};