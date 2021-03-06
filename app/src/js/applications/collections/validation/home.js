import React from 'react';
import Picker from 'js/applications/shared/picker-page';
import D from 'js/i18n';
import check from 'js/utils/auth';

const CollectionsToValidate = ({
	collections,
	permission,
	handleValidateCollectionList,
}) => {
	const { authType, roles, stamp } = permission;
	const authImpl = check(authType);

	const filteredCollections = authImpl.filterCollectionsToValidate(
		collections,
		roles,
		stamp
	);
	return (
		<Picker
			items={filteredCollections}
			title={D.collectionsToValidTitle}
			panelTitle={D.collectionsToValidPanelTitle}
			labelWarning={D.hasNotCollectionToValid}
			labelValidateButton={D.btnValid}
			handleAction={handleValidateCollectionList}
			context="collections"
		/>
	);
};

export default CollectionsToValidate;
