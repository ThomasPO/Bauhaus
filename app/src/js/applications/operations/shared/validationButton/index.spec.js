import React from 'react';
import { shallow } from 'enzyme';
import ValidationButton from './';
import { PublishButton } from 'bauhaus-library';

describe('<ValidationButton', () => {
	it('should contain a disabled button if the object is already validated', () => {
		const component = shallow(
			<ValidationButton
				object={{ validationState: 'Validated' }}
				callback={jest.fn()}
				disabled={false}
			/>
		);
		expect(component.find(PublishButton).props().disabled).toBeTruthy();
	});

	it('should contain a enabled button if the validationStateis not defined', () => {
		const component = shallow(
			<ValidationButton callback={jest.fn()} disabled={false} />
		);
		expect(component.find(PublishButton).props().disabled).toBeFalsy();
	});

	it('should contain a enabled button if the object is already validated', () => {
		const component = shallow(
			<ValidationButton
				object={{ validationState: 'updated' }}
				callback={jest.fn()}
				disabled={false}
			/>
		);
		expect(component.find(PublishButton).props().disabled).toBeFalsy();
	});

	it('should call the callback if we click on the button', () => {
		const callback = jest.fn();
		const object = { validationState: 'updated' };
		const component = shallow(
			<ValidationButton object={object} callback={callback} disabled={false} />
		);
		component
			.find(PublishButton)
			.props()
			.action();
		expect(callback).toHaveBeenCalledWith(object);
	});

	it('should be disabled if the property disabled is set to true', () => {
		const callback = jest.fn();
		const object = { validationState: 'updated' };
		const component = shallow(
			<ValidationButton object={object} callback={callback} disabled={true} />
		);
		expect(component.find(PublishButton).props().disabled).toBeTruthy();
	});
});
