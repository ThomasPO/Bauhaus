import React from 'react';
import PropTypes from 'prop-types';
import D from 'js/i18n';
import { rangeType } from 'js/utils/msd/';
import DatePickerRmes from 'js/components/shared/date-picker-rmes';
import InputRmes from 'js/components/shared/input-rmes';
import EditorMarkdown from 'js/components/shared/editor-markdown';
import SelectRmes from 'js/components/shared/select-rmes';

import './sims-field.scss';

const { REPORTED_ATTRIBUTE, TEXT, DATE, CODE_LIST } = rangeType;

class Field extends React.PureComponent {
	static propTypes = {
		msd: PropTypes.object.isRequired,
		currentSection: PropTypes.object,
		codesLists: PropTypes.object.isRequired,
		handleChange: PropTypes.func,
		secondLang: PropTypes.bool,
	};

	handleTextInput = value => {
		this.props.handleChange({
			id: this.props.msd.idMas,
			override: { [this.props.secondLang ? 'labelLg2' : 'labelLg1']: value },
		});
	};

	render() {
		const {
			msd,
			currentSection = {},
			handleChange,
			codesLists,
			secondLang,
		} = this.props;
		return (
			<>
				{!msd.isPresentational && (
					<>
						{msd.rangeType === TEXT && (
							<InputRmes
								id={msd.idMas}
								value={currentSection[secondLang ? 'labelLg2' : 'labelLg1']}
								handleChange={this.handleTextInput}
								arias={{
									'aria-label': D.simsValue,
								}}
							/>
						)}

						{msd.rangeType === DATE && (
							<DatePickerRmes
								aria-label={D.simsValue}
								id={msd.idMas}
								colMd={12}
								value={currentSection.value}
								onChange={value => {
									handleChange({ id: msd.idMas, override: { value } });
								}}
							/>
						)}
						{msd.rangeType === REPORTED_ATTRIBUTE && (
							<>
								<EditorMarkdown
									aria-label={D.simsValue}
									text={currentSection[secondLang ? 'labelLg2' : 'labelLg1']}
									handleChange={this.handleTextInput}
								/>
							</>
						)}

						{msd.rangeType === CODE_LIST && codesLists[msd.codeList] && (
							<SelectRmes
								placeholder=""
								aria-label={codesLists[msd.codeList].codeListLabelLg1}
								className="form-control"
								value={currentSection.value}
								options={codesLists[msd.codeList].codes.map(c => ({
									label: c.labelLg1,
									value: c.code,
								}))}
								onChange={value =>
									handleChange({
										id: msd.idMas,
										override: { codeList: msd.codeList, value },
									})
								}
							/>
						)}
					</>
				)}
			</>
		);
	}
}

export default Field;