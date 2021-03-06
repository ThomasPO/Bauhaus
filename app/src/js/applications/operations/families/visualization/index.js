import D from 'js/i18n';
import PropTypes from 'prop-types';
import * as select from 'js/reducers';
import { connect } from 'react-redux';
import { goBack } from 'bauhaus-library/src/utils/redirection';
import { withRouter } from 'react-router-dom';
import { getSecondLang } from 'js/reducers/app';
import { saveSecondLang } from 'js/actions/app';
import Auth from 'js/utils/auth/components/auth';
import { Button, Loading, ErrorBloc, CheckSecondLang } from 'bauhaus-library';
import buildExtract from 'bauhaus-library/src/utils/build-extract';
import { ADMIN, CNIS } from 'js/utils/auth/roles';
import React from 'react';
import PageTitleBlock from 'js/applications/shared/page-title-block';
import loadFamily, { publishFamily } from 'js/actions/operations/families/item';
import OperationsFamilyVisualization from 'js/applications/operations/families/visualization/visualization';
import ValidationButton from 'js/applications/operations/shared/validationButton';
import { containUnsupportedStyles } from 'js/utils/html';
import VisualizationContainer from 'js/applications/operations/shared/vizualisation-container';

const extractId = buildExtract('id');

class FamilyVisualizationContainer extends VisualizationContainer {
	static propTypes = {
		object: PropTypes.object,
		secondLang: PropTypes.bool,
		langs: PropTypes.object,
		saveSecondLang: PropTypes.func,
		load: PropTypes.func,
		publishFamily: PropTypes.func,
	};

	render() {
		const {
			secondLang,
			langs,
			object: { ...attr },
			saveSecondLang,
		} = this.props;
		const { serverSideError } = this.state;
		if (!attr.id) return <Loading />;

		/*
		 * The publication button should be enabled only if RICH_TEXT value do not
		 * have unsupported styles like STRIKETHROUGH, color or background color
		 */
		const publicationDisabled = containUnsupportedStyles(attr);
		return (
			<div className="container">
				<PageTitleBlock
					titleLg1={attr.prefLabelLg1}
					titleLg2={attr.prefLabelLg2}
					secondLang={secondLang}
				/>

				<div className="row btn-line action-toolbar">
					<Button
						action={goBack(this.props, '/operations/families')}
						label={D.btnReturn}
					/>

					<Auth roles={[ADMIN]}>
						<ValidationButton
							object={attr}
							callback={object =>
								this.publish(object, this.props.publishFamily)
							}
							disabled={publicationDisabled}
						/>
					</Auth>
					<Auth roles={[ADMIN, CNIS]}>
						<Button
							action={`/operations/family/${attr.id}/modify`}
							label={D.btnUpdate}
						/>
					</Auth>
				</div>

				<ErrorBloc error={serverSideError} />

				<CheckSecondLang secondLang={secondLang} onChange={saveSecondLang} />

				<OperationsFamilyVisualization
					secondLang={secondLang}
					attr={attr}
					langs={langs}
				/>
			</div>
		);
	}
}

export const mapStateToProps = (state, ownProps) => {
	const id = extractId(ownProps);
	const family = select.getFamily(state);
	return {
		id,
		object: family.id === id ? family : {},
		langs: select.getLangs(state),
		secondLang: getSecondLang(state),
	};
};
const mapDispatchToProps = {
	saveSecondLang,
	load: loadFamily,
	publishFamily,
};
export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(FamilyVisualizationContainer)
);
