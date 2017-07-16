import React from 'react'
import renderer from 'react-test-renderer'
import PackageInput from './PackageInput'

describe('<PackageInput/>', () => {
    
    it('should render `h2`, `pre` and `code` elements', () => {
        const tree = renderer.create(
            <PackageInput/>
        ).toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('should render a code example of an array with package names and dependencies from an array passed in', () => {
        const input = [
            "KittenService: ",
            "Leetmeme: Cyberportal",
            "Cyberportal: Ice",
            "CamelCaser: KittenService",
            "Fraudstream: Leetmeme",
            "Ice: "
        ]

        const tree = renderer.create(
            <PackageInput input={input}/>
        ).toJSON()

        expect(tree).toMatchSnapshot()
    })

})
