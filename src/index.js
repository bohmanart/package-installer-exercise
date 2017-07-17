import React from 'react'
import {render} from 'react-dom'
import './index.css'
import PackageInstaller from './PackageInstaller'

const packagesAndDependency = [
    'KittenService: ',
    'Leetmeme: Cyberportal',
    'Cyberportal: Ice',
    'CamelCaser: KittenService',
    'Fraudstream: Leetmeme',
    'Ice: '

    // DEPENDENCY ABSENT

    // 'KittenService: ',
    // 'Leetmeme: Cyberportal',
    // 'Cyberportal: Ice',
    // 'CamelCaser: KittenService',
    // 'Fraudstream: Leetmeme',
    // 'Ice: LoxodontaAfricana'

    // 'Cyberportal: Ice',
    // 'Ice: LoxodontaAfricana'

    // CYCLES EXIST

    // 'KittenService: ',
    // 'Leetmeme: Cyberportal',
    // 'Cyberportal: Ice',
    // 'CamelCaser: KittenService',
    // 'Fraudstream: ',
    // 'Ice: Leetmeme'

    // 'Leetmeme: Cyberportal',
    // 'Cyberportal: Ice',
    // 'Ice: Leetmeme'

    // 'KittenService: CamelCaser',
    // 'CamelCaser: KittenService'
]

render(<PackageInstaller input={packagesAndDependency}/>, document.getElementById('root'))
