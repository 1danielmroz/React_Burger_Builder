
import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavItem/NavigationItem';


configure({adapter: new Adapter()});
//https://jestjs.io/docs/en/expect <-more
describe('<NavigationItems/>', ()=>{

    let wrapper;
    beforeEach(()=>{
        wrapper =shallow(<NavigationItems/>);
    });

    it('should render two <NavigationItems> Element if not authenticated',()=>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItems> Element if authenticated',()=>{ 
        wrapper.setProps({isAuthenticated:true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render  <NavigationItems> Element Contains Logout',()=>{ 
        wrapper.setProps({isAuthenticated:true}); 
        expect(wrapper.contains(<NavigationItem  link="/logout">Logout</NavigationItem>)).toEqual(true);
    });

});