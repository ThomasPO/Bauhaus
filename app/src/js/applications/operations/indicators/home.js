import React from 'react';
import PropTypes from 'prop-types';
import { PageTitle, SearchRmes, NewButton } from 'bauhaus-library';
import D from 'js/i18n';
import check from 'js/utils/auth';
import Auth from 'js/utils/auth/components/auth';
import { INDICATOR_CREATOR, ADMIN } from 'js/utils/auth/roles';

function IndicatorsHome({ indicators, permission: { authType, roles } }) {
	const authImpl = check(authType);
	const adminOrContributor = authImpl.isAdminOrContributor(roles);
	return (
		<>
			<div className="container">
				<div className="row">
					<Auth roles={[ADMIN, INDICATOR_CREATOR]}>
						<div className="col-md-3 btn-group-vertical">
							{adminOrContributor && (
								<div className="row">
									<div className="col-md-12">
										<NewButton
											action="/operations/indicator/create"
											wrapper={false}
										/>
									</div>
								</div>
							)}
						</div>
					</Auth>
					<div className="col-md-8 centered pull-right operations-list">
						<PageTitle title={D.indicatorsSearchTitle} col={12} offset={0} />
						<SearchRmes
							items={indicators}
							childPath="operations/indicator"
							label="label"
							advancedSearch
							searchUrl="/operations/indicators/search"
						/>
					</div>
				</div>
			</div>
		</>
	);
}

IndicatorsHome.propTypes = {
	indicators: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		}).isRequired
	),
};

export default IndicatorsHome;
