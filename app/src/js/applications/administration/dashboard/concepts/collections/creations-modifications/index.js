import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TableRmes from 'js/applications/shared/table-rmes';
import DatePickerRmes from 'js/applications/shared/date-picker-rmes';
import D from 'js/i18n';
import { rowParams } from './data';
import { filterKeyDate, nbResults } from 'js/utils/array-utils';

class CollectionsCreationsModifications extends Component {
	constructor(props) {
		super();
		this.state = { dateStart: '' };
		this.changeDateCreatedStart = dateStart => this.setState({ dateStart });
		this.onRowClick = collection =>
			this.props.history.push(`/collection/${collection.id}`);
	}

	render() {
		const { dateStart } = this.state;
		const { collectionsData, type } = this.props;

		const variable = type === 'creations' ? 'created' : 'modified';
		const typeByLang =
			type === 'creations' ? D.creationsTitle : D.modificationsTitle;
		const filterCreatedDate = filterKeyDate(variable);
		const data = collectionsData
			.filter(filterCreatedDate(dateStart))
			.map(d => ({
				...d,
				isValidated:
					d.isValidated === 'true'
						? D.collectionStatusValid
						: D.collectionStatusProvisional,
			}));
		return (
			<div>
				<div className="row" style={{ marginTop: '2%' }}>
					<div className="form-group col-md-4 col-md-offset-4 centered">
						<label>{D.dashboardCollectionsListPickerTitle(typeByLang)}</label>
						<DatePickerRmes
							value={dateStart}
							onChange={this.changeDateCreatedStart}
							placement="top"
						/>
					</div>
				</div>
				<div className="row centered">
					<h4>{nbResults(data)}</h4>
				</div>
				<TableRmes
					rowParams={rowParams[type]}
					data={data}
					search={true}
					pagination={true}
					onRowClick={this.onRowClick}
				/>
			</div>
		);
	}
}

export default withRouter(CollectionsCreationsModifications);