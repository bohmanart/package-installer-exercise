import React from 'react'
import PackageOutput from './PackageOutput'
import renderer from 'react-test-renderer'

it(`PackageOutput component renders correctly`, () => {
    const tree = renderer.create(
        <PackageOutput output="KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream" />
    ).toJSON()

    expect(tree).toMatchSnapshot()
})
