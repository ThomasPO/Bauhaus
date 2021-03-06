import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as select from 'js/reducers';
import { EXPORT_VARBOOK } from 'js/actions/constants';
import { Loading, ErrorBloc, Button, CheckSecondLang } from 'bauhaus-library';
import OperationsOperationVisualization from './home';
import buildExtract from 'bauhaus-library/src/utils/build-extract';
import exportVariableBook from 'js/actions/operations/export-varBook';
import { saveSecondLang } from 'js/actions/app';
import loadOperation, {
	publishOperation,
} from 'js/actions/operations/operations/item';
import D from 'js/i18n';
import { goBack } from 'bauhaus-library/src/utils/redirection';
import { getSecondLang } from 'js/reducers/app';
import Auth from 'js/utils/auth/components/auth';
import {
	INDICATOR_CREATOR,
	ADMIN,
	SERIES_CREATOR,
	CNIS,
} from 'js/utils/auth/roles';
import PageTitleBlock from 'js/applications/shared/page-title-block';
import ValidationButton from 'js/applications/operations/shared/validationButton';
import VisualizationContainer from 'js/applications/operations/shared/vizualisation-container';

const extractId = buildExtract('id');

class OperationVisualizationContainer extends VisualizationContainer {
	static propTypes = {
		object: PropTypes.object.isRequired,
		id: PropTypes.string.isRequired,
		exportVariableBook: PropTypes.func,
		exportStatus: PropTypes.string,
		langs: PropTypes.object,
		secondLang: PropTypes.bool,
		saveSecondLang: PropTypes.func,
	};

	render() {
		const {
			id,
			object: { ...operation },
			langs,
			secondLang,
			saveSecondLang,
		} = this.props;
		const { serverSideError } = this.state;

		if (!operation.id) return <Loading />;

		return (
			<div className="container">
				<PageTitleBlock
					titleLg1={operation.prefLabelLg1}
					titleLg2={operation.prefLabelLg2}
					secondLang={secondLang}
				/>
				<div className="row btn-line action-toolbar">
					<Button
						action={goBack(this.props, '/operations/operations')}
						label={D.btnReturn}
					/>

					{operation.idSims && (
						<Button
							action={`/operations/sims/${operation.idSims}`}
							label={D.btnSimsVisu}
						/>
					)}
					{!operation.idSims && (
						<Auth roles={[ADMIN, SERIES_CREATOR, INDICATOR_CREATOR]}>
							<div className="col-md-6 centered" />
							<Button
								action={`/operations/operation/${operation.id}/sims/create`}
								label={D.btnSimsCreate}
							/>
						</Auth>
					)}
					<Auth roles={[ADMIN, SERIES_CREATOR, CNIS]}>
						<ValidationButton
							object={operation}
							callback={object =>
								this.publish(object, this.props.publishOperation)
							}
						/>
					</Auth>
					<Auth roles={[ADMIN, SERIES_CREATOR, CNIS]}>
						<Button
							action={`/operations/operation/${operation.id}/modify`}
							label={D.btnUpdate}
						/>
					</Auth>
				</div>

				<ErrorBloc error={serverSideError} />

				<CheckSecondLang secondLang={secondLang} onChange={saveSecondLang} />

				<OperationsOperationVisualization
					id={id}
					attr={operation}
					langs={langs}
					secondLang={secondLang}
					saveSecondLang={saveSecondLang}
				/>
			</div>
		);
	}
}

export const mapStateToProps = (state, ownProps) => {
	const id = extractId(ownProps);
	const operation = select.getOperation(state);
	return {
		id,
		object: id === operation.id ? operation : {},
		exportStatus: select.getStatus(state, EXPORT_VARBOOK),
		langs: select.getLangs(state),
		secondLang: getSecondLang(state),
	};
};

const mapDispatchToProps = {
	exportVariableBook,
	saveSecondLang,
	load: loadOperation,
	publishOperation,
};

OperationVisualizationContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(OperationVisualizationContainer);

export default withRouter(OperationVisualizationContainer);
