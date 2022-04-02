export enum StorageItem {
  // user related
  connected_user_id = 'connected_user_id',
  token = 'token',
  refresh_token = 'refresh_token',
  // officer related
  THEME = 'THEME',
}

export const getItem = (itemName: StorageItem): string | null => {
  const item = localStorage.getItem(itemName);
  return item ? item : null;
};

export const setItem = (itemName: StorageItem, value: string): void => {
  localStorage.setItem(itemName, value);
};

export const removeItem = (itemName: StorageItem): void => {
  localStorage.removeItem(itemName);
};
