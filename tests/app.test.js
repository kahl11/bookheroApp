import React from 'react';
import TestRenderer from 'react-test-renderer';

import {TouchableButton} from '../constants/Components';

describe('<App />', () => { //this is the name of the set of tests
  it('has 1 child', () => { //this is the name of the test, we pass it a function
    const tree = TestRenderer.create(<TouchableButton />).toJSON(); //we use TestRenderer.create to turn our components into an object
    expect(tree.children.length).toBe(1); //expect is the same as assert in other languages
  });

  //we could put more it() statements here
});
