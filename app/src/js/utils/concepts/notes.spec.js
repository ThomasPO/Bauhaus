import { buildNotes, capitalizeFirst } from './notes';
import D from 'js/i18n';

describe('concepts-notes-utils', () => {
	it('should return an array', () => {
		const notes = { scopeNoteLg1: 'scopeNoteLg1' };
		const result = [
			{ lg1: 'scopeNoteLg1', lg2: undefined, title: D.conceptsScopeNote },
			{ lg1: undefined, lg2: undefined, title: D.conceptsDefinition },
			{
				lg1: undefined,
				lg2: undefined,
				title: D.conceptsEditorialNote,
			},
			{ lg1: undefined, lg2: undefined, title: D.conceptsChangeNote },
		];
		expect(buildNotes(notes)).toEqual(result);
	});
	describe('capitalizeFirst', () => {
		it('should return empty string', () => {
			expect(capitalizeFirst('')).toEqual('');
		});
		it('should return the same string', () => {
			expect(capitalizeFirst('String')).toEqual('String');
		});
		it('should return capitalize string', () => {
			expect(capitalizeFirst('string')).toEqual('String');
		});
	});
});
