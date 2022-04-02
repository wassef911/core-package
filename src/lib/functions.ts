import Backend from '..';
import { features } from '../config';
import { Municipality } from '../models/class/municipality';
import { UpdateTypes } from '../models/types';
import { ArabicTimeAgoPipe } from '../pipes/arabic-time-ago.pipe';

export const getStates = (municipalities: Array<Municipality>, key: string = 'city'): Set<string> => {
  // @ts-ignore
  return new Set(municipalities.map((value) => value[key]));
};

export const formatMunicipalityName = (mun: string): string => (mun ? mun.split(' ').join('-') : '');

/**
 *
 * @param input string to check if valid
 * @param length the required length of that string
 * @returns boolean
 */
const isValidStringOfNumbers = (input: string, length: number) => {
  const output = input.toString();
  const validStringOfNumbers = new RegExp('^[0-9]+$');
  return validStringOfNumbers.test(output) && output.length === length;
};

export const isValidPhoneNumber = (phone_number: string | number) => {
  return isValidStringOfNumbers(phone_number.toString(), 8);
};
/**
 *
 * @param id a unique identifier for a permit request ...
 * @returns boolean
 */
export const isValidIdentifier = (input: string, minLength: number = 3) => {
  const output = input;
  return (typeof input === 'string') && output?.length >= minLength;
};

/**
 *
 * @param id a tunisian citizen id
 * @returns boolean
 */
export const isValidCitizenId = (id: string | number) => {
  return isValidStringOfNumbers(id.toString(), 10);
};

const timePipe = new ArabicTimeAgoPipe();

export const timeAgo = (date: string | number): string => {
  return timePipe.transform(date.toString());
};

export const openLink = (link: string) => {
  if (typeof link === 'string') window.open(Backend.baseUrl + '/' + link, '_blank');
};

export const getPageTitle = (pathParam: string = ''): string => {
  return features.filter(f => f.route === pathParam)[0]?.documentName ?? features[features.length - 1].documentName;
};

export const ItemIsOpenForProcessing = (item: any) => item.status === UpdateTypes.RECEIVED || item.status === UpdateTypes.PROCESSING;

export const toArabicDate = (date: string) => {
  return new Date(Date.parse(date)).toLocaleDateString('ar-tn', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
