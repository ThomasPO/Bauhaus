import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import loadFamily, { saveFamily } from 'js/actions/operations/families/item';
import * as select from 'js/reducers';
import { connect } from 'react-redux';
import buildExtract from 'bauhaus-library/src/utils/build-extract';
import { Loading } from 'bauhaus-library';
import OperationsFamilyEdition from 'js/applications/operations/families/edition/edition';

const extractId = buildExtract('id');

class OperationsFamilyEditionContainer extends Component {
	componentDidMount() {
		if (!this.props.family.id && this.props.id) {
			this.props.loadFamily(this.props.id);
		}
	}
	render() {
		if (!this.props.family) return <Loading />;
		return <OperationsFamilyEdition {...this.props} />;
	}
}

const mapDispatchToProps = {
	loadFamily,
	saveFamily,
};

export const mapStateToProps = (state, ownProps) => {
	const id = extractId(ownProps);
	const family = id ? select.getFamily(state) : {};
	const langs = select.getLangs(state);
	return {
		id,
		family,
		langs,
		operationsAsyncTask: state.operationsAsyncTask,
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(OperationsFamilyEditionContainer)
);
