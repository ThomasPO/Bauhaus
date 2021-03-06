import { buildNotes } from './notes';
import D from 'js/i18n';
import { stringToDate } from 'js/utils/moment';

describe('classification-notes-utils', () => {
	it('should return an array', () => {
		const notes = { scopeNoteLg1: 'scopeNoteLg1' };
		const result = [
			{
				lg1: undefined,
				lg2: undefined,
				title: D.classificationsDefinition,
			},
			{
				lg1: 'scopeNoteLg1',
				lg2: undefined,
				title: D.classificationsScopeNote,
			},
			{
				lg1: undefined,
				lg2: undefined,
				title: D.classificationsCoreContentNote,
			},
			{
				lg1: undefined,
				lg2: undefined,
				title: D.classificationsAdditionalContentNote,
			},
			{
				lg1: undefined,
				lg2: undefined,
				title: D.classificationsExclusionNote,
			},
			{
				lg1: undefined,
				lg2: undefined,
				title: D.classificationsChangeNote(stringToDate(new Date())),
			},
		];
		expect(buildNotes(notes)).toEqual(result);
	});
});
