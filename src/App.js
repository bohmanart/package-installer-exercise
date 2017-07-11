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
    //         packagesToInstall: []
    //     }
    // }
    
    state = {
        packagesAndDependency,
        packagesToInstall: []
    }

    componentDidMount() {
        this.getPackageInstallOrder(this.state.packagesAndDependency)
    }
    
    render() {
        return (
            <div>
                <PackageInput input={this.state.packagesAndDependency.join('", \n  "')}/>
                <PackageOutput output={this.state.packagesToInstall.join(', ')}/>
            </div>
        )
    }
    
    getPackageInstallOrder(arr) {
        let outputArray = []
        
        function getOutputArray(arr, fn) {
            let tempArray = []

            arr.forEach(val => {
                const {packageName, packageDependency} = fn(val)
                if (packageDependency.length > 0) {
                    outputArray.includes(packageDependency)
                        ? outputArray.push(packageName)
                        : tempArray.push(val)
                } else {
                    outputArray.push(packageName)
                }
            });

            (tempArray.length > 0) && getOutputArray(tempArray, fn)
        }

        getOutputArray(arr, this.splitPackage)

        this.setState({packagesToInstall: outputArray})
    }

    splitPackage(str) {
        const packageArray = str.split(': ')

        return {
            packageName: packageArray[0],
            packageDependency: packageArray[1]
        }
    }

}
