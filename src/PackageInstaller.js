import React, {Component} from 'react'
import PropTypes from 'prop-types'
import PackageInput from './components/PackageInput/PackageInput'
import PackageOutput from './components/PackageOutput/PackageOutput'

export default class PackageInstaller extends Component {
    static propTypes = {
        input: PropTypes.array.isRequired
    }
    
    state = {
        input: this.props.input,
        output: []
    }

    componentDidMount() {
        this.getPackageInstallOrder(this.state.input)
    }
    
    render() {
        return (
            <div style={{margin: '2rem'}}>
                <h1>Package Installer</h1>
                <p>A package installer takes a list of packages with dependencies, and installs the packages in order such that an install won’t fail due to a missing dependency. This project represents code that will determine the order of install.</p>
                <PackageInput input={this.state.input.join('", \n  "')}/>
                <PackageOutput output={this.state.output.join(', ')}/>
            </div>
        )
    }
    
    getPackageInstallOrder(arr) {
        let output = this.dfsTopoSort(arr)

        this.setState({output})
    }

    dfsTopoSort(pkgsArr) {
        let packages = []
        let visited = []
        let sorted = []
        let hasCycle = false
        const error = 'Error: dependency specification contains cycle and is therefore invalid'

        pkgsArr.forEach(pkgStr => {
            const packageObj = this.convertPackage(pkgStr)
            
            packages[packageObj.packageName] = packageObj
        })

        pkgsArr.forEach(pkgStr => {
            const pkgObj = this.convertPackage(pkgStr)
            const {packageName} = pkgObj

            if (!visited.includes(packageName)) {
                visit(pkgObj)
            }
        })

        function visit(pkgObj) {
            const {packageName, packageDependency} = pkgObj

            !hasCycle && console.log(pkgObj)

            visited.push(packageName)

            if (packageDependency) {
                const dependencyPackageObj = packages[packageDependency]

                if (!visited.includes(packageDependency)) {
                    console.log('recurse')
                    visit(dependencyPackageObj)
                }

                if (!sorted.includes(packageDependency)) {
                    console.error(error)
                    hasCycle = true
                }
            }

            sorted.push(packageName)
        }

        return hasCycle ? [error] : sorted
    }

    convertPackage(pkgStr) {
        const packageArray = pkgStr.split(': ')

        return {
            packageName: packageArray[0],
            packageDependency: packageArray[1]
        }
    }

}
