import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, ErrorBloc } from 'bauhaus-library';
import { goBack } from 'bauhaus-library/src/utils/redirection';
import D from 'js/i18n';

class SendControls extends Component {
	render() {
		const { isRecipientValid, subject, message, sendMessage } = this.props;

		const hasSubject = Boolean(subject);
		const hasMessage = Boolean(message);
		let warning;
		let disabled;
		if (!isRecipientValid) {
			warning = D.invalidMailAdress;
			disabled = true;
		} else if (!hasSubject) {
			warning = D.emptyMailObject;
			disabled = true;
		} else if (!hasMessage) {
			warning = D.emptyMailBody;
		}
		const location = this.props.history.location.pathname;
		const nextLocation = location.replace('/send', '');

		return (
			<>
				<div className="row btn-line action-toolbar">
					<Button
						label={D.btnReturn}
						action={goBack(this.props, nextLocation)}
					/>

					<Button label={D.btnSend} action={sendMessage} disabled={disabled} />
				</div>
				<ErrorBloc error={warning} />
			</>
		);
	}
}

SendControls.propTypes = {
	isRecipientValid: PropTypes.bool.isRequired,
	subject: PropTypes.string,
	message: PropTypes.string,
	sendMessage: PropTypes.func.isRequired,
};

export default withRouter(SendControls);
