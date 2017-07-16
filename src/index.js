import React from 'react'
import {render} from 'react-dom'
import './index.css'
import App from './App'

const packagesAndDependency = [
    "KittenService: ",
    "Leetmeme: Cyberportal",
    "Cyberportal: Ice",
    "CamelCaser: KittenService",
    "Fraudstream: Leetmeme",
    "Ice: "

    // CYCLES

    // "KittenService: ",
    // "Leetmeme: Cyberportal",
    // "Cyberportal: Ice",
    // "CamelCaser: KittenService",
    // "Fraudstream: ",
    // "Ice: Leetmeme"

    // "Leetmeme: Cyberportal",
    // "Cyberportal: Ice",
    // "Ice: Leetmeme"

    // "KittenService: CamelCaser",
    // "CamelCaser: KittenService"
]

render(<App input={packagesAndDependency} />, document.getElementById('root'))
