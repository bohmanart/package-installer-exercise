import React from 'react'
import PackageInput from './PackageInput'
import renderer from 'react-test-renderer'

it(`PackageInput component renders correctly`, () => {
    const input = [
        "KittenService: ",
        "Leetmeme: Cyberportal",
        "Cyberportal: Ice",
        "CamelCaser: KittenService",
        "Fraudstream: Leetmeme",
        "Ice: "
    ]

    const tree = renderer.create(
        <PackageInput input={input} />
    ).toJSON()

    expect(tree).toMatchSnapshot()
})
