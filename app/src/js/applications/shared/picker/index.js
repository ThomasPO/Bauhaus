import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import D from 'js/i18n';
import { Panel, Pagination } from 'bauhaus-library';
import Item from 'js/applications/shared/picker-item';
import { filterDeburr } from 'js/utils/array-utils';
import addLogo from 'js/applications/shared/logo/logo-add';
import delLogo from 'js/applications/shared/logo/logo-del';

class Picker extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchLabel: '',
			items: props.items,
		};

		this.handleChange = searchLabel => {
			this.setState({ searchLabel });
		};

		this.addItem = id => {
			const itemsToAdd = this.state.items.map(item => {
				//mutation, but not harmful here
				if (item.id === id) item.isAdded = true;
				return item;
			});
			this.setState({
				itemsToAdd,
			});
			this.props.onChange(this.state.items);
		};

		this.removeItem = id => {
			const itemsToAdd = this.state.items.map(item => {
				//mutation, but not harmful here
				if (item.id === id) item.isAdded = false;
				return item;
			});
			this.setState({
				itemsToAdd,
			});
			this.props.onChange(this.state.items);
		};

		this.getItemsByStatus = () => {
			const { items } = this.state;
			const check = filterDeburr(this.state.searchLabel);
			return items.reduce(
				(byStatus, { id, label, isAdded }) => {
					if (isAdded) byStatus.added.push({ id, label });
					else check(label) && byStatus.toAdd.push({ id, label });
					return byStatus;
				},
				{ toAdd: [], added: [] }
			);
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.items !== this.props.items)
			this.setState({
				items: nextProps.items,
			});
	}

	render() {
		const { searchLabel } = this.state;
		const { panelTitle } = this.props;

		//validation has not been asked yet
		const { toAdd, added } = this.getItemsByStatus();

		const toAddEls = toAdd.map(({ id, label }) => (
			<Item
				key={id}
				id={id}
				label={label}
				logo={addLogo}
				handleClick={this.addItem}
			/>
		));

		const addedEls = added.map(({ id, label }) => (
			<Item
				key={id}
				id={id}
				label={label}
				logo={delLogo}
				handleClick={this.removeItem}
			/>
		));

		return (
			<div>
				<div className="row">
					<div className="col-md-6">
						<Panel title={panelTitle}>{addedEls}</Panel>
					</div>
					<div className="col-md-6 centered">
						<input
							value={searchLabel}
							onChange={e => this.handleChange(e.target.value)}
							type="text"
							placeholder={D.searchLabelPlaceholder}
							className="form-control"
						/>
						<Pagination itemEls={toAddEls} itemsPerPage="10" />
					</div>
				</div>
			</div>
		);
	}
}

Picker.propTypes = {
	panelTitle: PropTypes.string.isRequired,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		})
	),
};

export default Picker;
