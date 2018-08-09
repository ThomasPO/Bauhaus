import React from 'react';

import { Note } from 'js/components/shared/note';
import D from 'js/i18n';
import { getSeeAlsoByType } from 'js/components/operations/shared/links/utils';
import DisplayLinks from 'js/components/operations/shared/links/';
import SeeAlso from 'js/components/operations/shared/seeAlso';

function DisplayMultiLangNote({
	value1,
	value2,
	title,
	langs: { lg1, lg2 },
	secondLang,
}) {
	return (
		<div className="row">
			<Note
				text={value1}
				title={title}
				lang={lg1}
				alone={!secondLang}
				allowEmpty={true}
			/>
			{secondLang && (
				<Note
					text={value2}
					title={title}
					lang={lg2}
					alone={false}
					allowEmpty={true}
				/>
			)}
		</div>
	);
}

function IndicatorInformation(props) {
	const { attr, langs, secondLang, frequency = {} } = props;
	const seeAlso = getSeeAlsoByType(attr.seeAlso);
	const { replaces, replacedBy, wasGeneratedBy, stakeHolder } = attr;

	return (
		<div>
			<DisplayMultiLangNote
				value1={attr.altLabelLg1}
				value2={attr.altLabelLg2}
				title={D.altLabel}
				langs={langs}
				secondLang={secondLang}
			/>
			<DisplayMultiLangNote
				value1={attr.abstractLg1}
				value2={attr.abstractLg2}
				title={D.summary}
				langs={langs}
				secondLang={secondLang}
			/>
			<DisplayMultiLangNote
				value1={attr.historyNoteLg1}
				value2={attr.historyNoteLg2}
				title={D.history}
				langs={langs}
				secondLang={secondLang}
			/>
			<DisplayMultiLangNote
				value1={frequency.labelLg1}
				value2={frequency.labelLg2}
				title={D.dataCollectFrequency}
				langs={langs}
				secondLang={secondLang}
			/>
			<div className="row">
				<Note
					text={attr.creator}
					title={D.organisation}
					lang={langs.lg1}
					alone={true}
					allowEmpty={true}
				/>
			</div>

			<DisplayLinks
				links={stakeHolder}
				title={D.stakeholders}
				langs={langs}
				secondLang={secondLang}
				displayLink={false}
			/>
			<DisplayLinks
				links={replaces}
				path={'/operations/indicator/'}
				title={D.replaces}
				langs={langs}
				secondLang={secondLang}
			/>
			<DisplayLinks
				links={replacedBy}
				path={'/operations/indicator/'}
				title={D.replacedBy}
				langs={langs}
				secondLang={secondLang}
			/>
			<DisplayLinks
				links={wasGeneratedBy}
				path={'/operations/series/'}
				title={D.generatedBy}
				langs={langs}
				secondLang={secondLang}
			/>

			<SeeAlso links={seeAlso} langs={langs} secondLang={secondLang} />
		</div>
	);
}

export default IndicatorInformation;
