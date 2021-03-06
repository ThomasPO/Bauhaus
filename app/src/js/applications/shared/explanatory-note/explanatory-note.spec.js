import React from 'react';
import { shallow } from 'enzyme';
import { ExplanatoryNote } from './';

describe('explanatory-note', () => {
	it('renders without crashing', () => {
		shallow(<ExplanatoryNote />);
	});

	it('renders null component', () => {
		const wrapper = shallow(<ExplanatoryNote />);
		const result = shallow(<div className="col-md-6" />);
		expect(wrapper.html()).toEqual(result.html());
	});

	it('renders not null component', () => {
		const wrapper = shallow(<ExplanatoryNote text="text" />);
		expect(wrapper.html()).not.toBeNull();
	});
});
