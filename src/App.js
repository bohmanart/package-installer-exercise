import React, {Component} from 'react'
import PackageInput from './components/PackageInput/PackageInput'
import PackageOutput from './components/PackageOutput/PackageOutput'

const packages = [
    "KittenService: ",
    "Leetmeme: Cyberportal",
    "Cyberportal: Ice",
    "CamelCaser: KittenService",
    "Fraudstream: Leetmeme",
    "Ice: "
]

export default class App extends Component {
    state = {
        packages
    }
    render() {
        return (
            <div>
                <PackageInput packages={this.state.packages}/>
                <PackageOutput/>
            </div>
        )
    }
}
