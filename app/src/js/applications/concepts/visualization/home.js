import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { CheckSecondLang, PageTitle, PageSubtitle } from 'bauhaus-library';
import ConceptVisualizationControls from './controls';
import ConceptGeneral from './general';
import ConceptLinks from './links';
import ConceptNotes from './notes';
import ModalRmes from 'js/applications/shared/modal-rmes/modal-rmes';
import D from 'js/i18n';
import { propTypes as generalPropTypes } from 'js/utils/concepts/general';
import { propTypes as notePropTypes } from 'js/utils/concepts/notes';
import { propTypesBilingual as linksPropTypes } from 'js/utils/concepts/links';
import { propTypes as permissionOverviewPropTypes } from 'js/utils/auth/permission-overview';
import { isOutOfDate } from 'js/utils/moment';
import { getModalMessage } from 'js/utils/concepts/build-validation-message';

class ConceptVisualization extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalValid: false,
		};
		this.handleClickValidation = () => {
			const {
				id,
				general: { valid },
			} = this.props;
			if (valid) this.setState({ modalValid: true });
			else this.props.validateConcept(id);
		};
		this.handleCancelValidation = () => this.setState({ modalValid: false });

		this.handleConfirmValidation = () => {
			this.handleCancelValidation();
			this.props.validateConcept(this.props.id);
		};

		this.handleClickDeletion = () => this.props.deleteConcept(this.props.id);

		this.handleCancelDeletion = () => {
			this.setState({ modalDelete: false });
			this.props.validateConcept(this.props.id);
		};

		this.handleConfirmDeletion = () => {
			this.handleCancelDeletion();
			this.props.deleteConcept(this.props.id);
		};
	}

	render() {
		const {
			id,
			permission,
			general,
			links,
			notes,
			secondLang,
			langs,
		} = this.props;
		const { modalValid } = this.state;
		const {
			conceptVersion,
			creator,
			isValidated,
			prefLabelLg1,
			prefLabelLg2,
			valid,
		} = general;

		const modalButtons = [
			{
				label: D.btnCancel,
				action: this.handleCancelValidation,
				style: 'primary',
			},
			{
				label: D.btnValid,
				action: this.handleConfirmValidation,
				style: 'primary',
			},
		];

		return (
			<div>
				<div className="container">
					<PageTitle title={prefLabelLg1} />
					{secondLang && prefLabelLg2 && (
						<PageSubtitle subTitle={prefLabelLg2} />
					)}
					<ConceptVisualizationControls
						id={id}
						permission={permission}
						creator={creator}
						isValidated={isValidated === 'true'}
						isValidOutOfDate={isOutOfDate(valid)}
						conceptVersion={conceptVersion}
						handleValidation={this.handleClickValidation}
						handleDeletion={this.handleClickDeletion}
					/>

					<CheckSecondLang
						secondLang={secondLang}
						onChange={this.props.saveSecondLang}
					/>

					<ConceptGeneral
						secondLang={secondLang}
						attr={general}
						langs={langs}
					/>
					<ConceptLinks secondLang={secondLang} links={links} />
					<ConceptNotes secondLang={secondLang} notes={notes} langs={langs} />
				</div>
				<ModalRmes
					id="validation-concept-modal"
					isOpen={modalValid}
					title="Confirmation de la validation"
					body={getModalMessage([{ prefLabelLg1, valid }])}
					modalButtons={modalButtons}
					closeCancel={this.handleCancelValidation}
				/>
			</div>
		);
	}
}

ConceptVisualization.propTypes = {
	id: PropTypes.string, // not available for creation
	permission: permissionOverviewPropTypes.isRequired,
	general: generalPropTypes.isRequired,
	notes: notePropTypes.isRequired,
	links: linksPropTypes.isRequired,
	validateConcept: PropTypes.func.isRequired,
	langs: PropTypes.object.isRequired,
};

export default ConceptVisualization;
