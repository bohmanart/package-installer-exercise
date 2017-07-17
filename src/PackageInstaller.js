import React, {Component} from 'react'
import PropTypes from 'prop-types'
import PackageInput from './components/PackageInput/PackageInput'
import PackageOutput from './components/PackageOutput/PackageOutput'

import './PackageInstaller.css'

export default class PackageInstaller extends Component {
    static propTypes = {
        input: PropTypes.array.isRequired
    }

    static defaultProps = {
        dependencyCycleError: 'ERROR: dependency specification contains cycle and is therefore invalid',
        dependencyAbsentError: 'ERROR: dependency specification contains a dependency that does not exist and is therefore invalid'
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
            <div className="PackageInstaller">
                <h1>Package Installer</h1>
                <p>A package installer takes a list of packages with dependencies, and installs the packages in order such that an install won’t fail due to a missing dependency. This project represents code that will determine the order of install.</p>
                <PackageInput input={this.state.input.join('", \n  "')}/>
                <PackageOutput output={this.state.output}/>
            </div>
        )
    }
    
    getPackageInstallOrder(arr) {
        let output = this.dfsTopoSort(arr)

        this.setState({output}, () => {
            this.errorChecker(output)
        })
    }

    dfsTopoSort(pkgsArr) {
        let packages = []
        let visited = []
        let sorted = []
        let hasCycleDependency = false
        let hasAbsentDependency = false

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

            visited.push(packageName)

            if (packageDependency) {
                const dependencyPackageObj = packages[packageDependency]

                if (dependencyPackageObj && !visited.includes(packageDependency)) {
                    // console.log('RECURSE')
                    visit(dependencyPackageObj)
                }

                if (dependencyPackageObj && !sorted.includes(packageDependency)) {
                    hasCycleDependency = true
                }

                if (!dependencyPackageObj) {
                    hasAbsentDependency = true
                }

            }

            sorted.push(packageName)
        }

        if (hasCycleDependency) {
            return this.props.dependencyCycleError
        } else if (hasAbsentDependency) {
            return this.props.dependencyAbsentError
        } else {
            return sorted.join(', ')
        }
    }

    convertPackage(pkgStr) {
        const packageArray = pkgStr.split(': ')

        return {
            packageName: packageArray[0],
            packageDependency: packageArray[1]
        }
    }

    errorChecker(output) {
        if (output === this.props.dependencyCycleError) {
            throw this.props.dependencyCycleError
        }

        if (output === this.props.dependencyAbsentError) {
            throw this.props.dependencyAbsentError
        }
    }

}
