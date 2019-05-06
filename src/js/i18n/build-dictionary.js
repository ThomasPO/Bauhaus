import appD from './dictionary/app';
import conceptsD from './dictionary/concepts';
import classificationsD from './dictionary/classifications';
import operationsD from './dictionary/operations/index.js';

import 'moment/locale/en-gb';
import 'moment/locale/fr';

const dictionary = {
	...appD,
	...conceptsD,
	...classificationsD,
	...operationsD,
};

/**
 * Based on the locale passed as a paremeter, this function will return
 * the corresponding dictionary.
 *
 * @param {string} lang the lang of the user
 */
export const createDictionary = lang =>
	Object.keys(dictionary).reduce((_, k) => {
		_[k] = dictionary[k][lang];
		return _;
	}, {});

/**
 * This function will return only the lang part of a locale
 * For example, with fr-FR, will return fr
 * If the lang is not fr, will return en
 * @param {string} lang the lang of the user
 */

const firstLang = 'fr';
const secondLang = 'en';

// TODO add types
export const getLang = defaultLang =>
	(defaultLang || navigator.language || navigator.browserLanguage).split(
		'-'
	)[0] === firstLang
		? firstLang
		: secondLang;

// TODO add types
// TODO rename method
export const isLg2 = () => getLang() === secondLang;

// TODO add types
// TODO remove hard coded locales
export const getMessageForSecondLang = message => {
	const secondLang = ['en', 'fr'].find(l => l !== getLang());
	return dictionary[message][secondLang];
};

export default createDictionary(getLang());
