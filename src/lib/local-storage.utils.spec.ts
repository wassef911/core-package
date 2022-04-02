import { getItem, setItem, StorageItem } from './local-storage.utils';

describe('Localcache', () => {

  beforeEach(() => {
    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };

    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });


  fdescribe('setAccessToken', () => {
    it('should store the token in localStorage',
      () => {
        const value = 'QWETQWTEWQRTEWQRQWER';
        setItem(StorageItem.token, value);
        expect(getItem(StorageItem.token)).toEqual(value);
      });

    it('should have same name enum/key',
      () => {
        const keys = Object.keys(StorageItem);
        const values = Object.values(StorageItem);
        keys.forEach((key, i) => {
          setItem(StorageItem[i], values[i]);
          expect(getItem(StorageItem[i])).toEqual(values[i]);
        });
      });
  });
});
