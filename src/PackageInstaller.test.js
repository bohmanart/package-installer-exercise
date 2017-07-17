import React from 'react'
import ReactDOM from 'react-dom'
import {shallow, mount} from 'enzyme'
import toJSON from 'enzyme-to-json'
import PackageInstaller from './PackageInstaller'

describe('<PackageInstaller/>', () => {
    
    it('should accept an array of strings', () => {
        const input = ['a: b', 'b: ']

        expect(new PackageInstaller({input}).props.input).toBe(input)
    })

    describe('should render', () => {
        let input

        beforeEach(() => {
            input = [
                'KittenService: ',
                'Leetmeme: Cyberportal',
                'Cyberportal: Ice',
                'CamelCaser: KittenService',
                'Fraudstream: Leetmeme',
                'Ice: '
            ]
        })

        test('shallow as expected', () => {
            const component = shallow(<PackageInstaller input={input}/>)
            const tree = toJSON(component)

            expect(tree).toMatchSnapshot()
        })

        test('mount as expected', () => {
            const component = mount(<PackageInstaller input={input}/>)
            const tree = toJSON(component)

            expect(tree).toMatchSnapshot()
        })

    })

    describe('should reject', () => {

        test('if a dependency does not exist', () => {
            const input = [
                'KittenService: ',
                'Leetmeme: Cyberportal',
                'Cyberportal: Ice',
                'CamelCaser: KittenService',
                'Fraudstream: Leetmeme',
                'Ice: LoxodontaAfricana'
            ]

            const component = shallow(<PackageInstaller input={input}/>)
            const dfsTopoSort = component.instance().dfsTopoSort(input)
            const actual = () => component.instance().errorChecker(dfsTopoSort)
            const expected = 'ERROR: dependency specification contains a dependency that does not exist and is therefore invalid'

            expect(actual).toThrowError(expected)
        })

        test('if a cycle exists', () => {
            const input = [
                'KittenService: ',
                'Leetmeme: Cyberportal',
                'Cyberportal: Ice',
                'CamelCaser: KittenService',
                'Fraudstream: ',
                'Ice: Leetmeme'
            ]

            const component = shallow(<PackageInstaller input={input}/>)
            const dfsTopoSort = component.instance().dfsTopoSort(input)
            const actual = () => component.instance().errorChecker(dfsTopoSort)
            const expected = 'ERROR: dependency specification contains cycle and is therefore invalid'

            expect(actual).toThrowError(expected)
        })

    })


    it('should output a comma seperated string of package names', () => {
        const input = [
            'KittenService: ',
            'Leetmeme: Cyberportal',
            'Cyberportal: Ice',
            'CamelCaser: KittenService',
            'Fraudstream: Leetmeme',
            'Ice: '
        ]

        const component = shallow(<PackageInstaller input={input}/>)
        const actual = component.instance().dfsTopoSort(input)
        const expected = 'KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream'

        expect(actual).toEqual(expected)
    })

})
