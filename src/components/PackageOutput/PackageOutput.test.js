import React from 'react'
import renderer from 'react-test-renderer'
import PackageOutput from './PackageOutput'

describe('<PackageOutput/>', () => {
    
    it('should render `h2` and `samp` elements', () => {
        const tree = renderer.create(
            <PackageOutput/>
        ).toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('should render a sample output of a comma seperated list of package names from a string passed in', () => {
        const tree = renderer.create(
            <PackageOutput output="KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream" />
        ).toJSON()

        expect(tree).toMatchSnapshot()
    })

})

