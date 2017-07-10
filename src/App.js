import React, {Component} from 'react'
import PackageInput from './components/PackageInput/PackageInput'
import PackageOutput from './components/PackageOutput/PackageOutput'

const packagesAndDependency = [
    "KittenService: ",
    "Leetmeme: Cyberportal",
    "Cyberportal: Ice",
    "CamelCaser: KittenService",
    "Fraudstream: Leetmeme",
    "Ice: "
]

export default class App extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         packagesAndDependency,
    //         packagesToInstall: ''
    //     }
    // }
    
    state = {
        packagesAndDependency,
        packagesToInstall: ''
    }

    componentDidMount() {
        this.getPackageInstallOrder(this.state.packagesAndDependency)
    }
    
    render() {
        return (
            <div>
                <PackageInput input={this.state.packagesAndDependency}/>
                <PackageOutput output={this.state.packagesToInstall}/>
            </div>
        )
    }
    
    getPackageInstallOrder(arr) {
        const outputArray = []
        
        function getOutputArray(arr, fn) {
            const tempArray = []
            arr.forEach((val, ind) => {
                if (fn(val).packageDependency.length) {
                    // check if dep exists in output array
                    // if it does then add package name to output array
                    // if it does not then add val to tempArray
                } else {
                    // no dep so add package name to output array
                }
            })
        }

        getOutputArray(arr, this.checkDependency)
    }

    checkDependency(str) {
        const packageArray = str.split(': ')

        return {
            packageName: packageArray[0],
            packageDependency: packageArray[1]
        }
    }

}
