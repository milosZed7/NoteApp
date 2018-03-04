const USER_UID = 'userUid';
export const saveUserUid = value => {
    localStorage.setItem(USER_UID, value);
};

export const getUserUid = () => {
    return localStorage.getItem(USER_UID);
};

export const removeUserUid = () => {
    localStorage.removeItem(USER_UID);
};