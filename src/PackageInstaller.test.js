import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme'
import PackageInstaller from './PackageInstaller'
import PackageInput from './components/PackageInput/PackageInput'

describe('<PackageInstaller/>', () => {
    
    it('renders without crashing', () => {
      const input = [
          'KittenService: ',
          'Leetmeme: Cyberportal',
          'Cyberportal: Ice',
          'CamelCaser: KittenService',
          'Fraudstream: Leetmeme',
          'Ice: '
      ]

      const div = document.createElement('div')
      ReactDOM.render(<PackageInstaller input={input}/>, div)
    })

    it('should accept an array of strings', () => {
        const input = ['a: b', 'b: ']
        expect(new PackageInstaller({input}).props.input).toBe(input)
    })

    it('should expect each string to have a name followed by a colon and space', () => {

    })

    it('should reject if a dependency does not exist', () => {

    })

})
