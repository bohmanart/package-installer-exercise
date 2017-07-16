import React, {Component} from 'react'
import PropTypes from 'prop-types'
import PackageInput from './components/PackageInput/PackageInput'
import PackageOutput from './components/PackageOutput/PackageOutput'

export default class PackageInstaller extends Component {
    static propTypes = {
        input: PropTypes.array.isRequired
    }

    static defaultProps = {
        cycleError: 'ERROR: dependency specification contains cycle and is therefore invalid'
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
        let hasCycle = false

        pkgsArr.forEach(pkgStr => {
            const packageObj = this.convertPackage(pkgStr)

            packages[packageObj.packageName] = packageObj
        })

        pkgsArr.forEach(pkgStr => {
            const pkgObj = this.convertPackage(pkgStr)
            const {packageName} = pkgObj

            if(!visited.includes(packageName)) {
                visit(pkgObj)
            }
        })

        function visit(pkgObj) {
            const {packageName, packageDependency} = pkgObj

            // !hasCycle && console.log(pkgObj)

            visited.push(packageName)

            if(packageDependency) {
                const dependencyPackageObj = packages[packageDependency]

                if(!visited.includes(packageDependency)) {
                    // console.log('RECURSE')
                    visit(dependencyPackageObj)
                }

                if(!sorted.includes(packageDependency)) {
                    hasCycle = true
                }
            }

            sorted.push(packageName)
        }

        return hasCycle ? this.props.cycleError : sorted.join(', ')
    }

    convertPackage(pkgStr) {
        const packageArray = pkgStr.split(': ')

        return {
            packageName: packageArray[0],
            packageDependency: packageArray[1]
        }
    }

    errorChecker(output) {
        if(output === this.props.cycleError) {
            throw this.props.cycleError
        }
    }

}
