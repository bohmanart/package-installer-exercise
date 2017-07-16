import React, {Component} from 'react'
import PropTypes from 'prop-types'
import PackageInput from './components/PackageInput/PackageInput'
import PackageOutput from './components/PackageOutput/PackageOutput'

export default class App extends Component {
    static propTypes = {
        input: PropTypes.array.isRequired
    }

    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         packagesAndDependency,
    //         packagesToInstall: []
    //     }
    // }
    
    state = {
        packagesAndDependency: this.props.input,
        packagesToInstall: []
    }

    componentDidMount() {
        this.getPackageInstallOrder(this.state.packagesAndDependency)
    }
    
    render() {
        return (
            <div style={{margin: '2rem'}}>
                <PackageInput input={this.state.packagesAndDependency.join('", \n  "')}/>
                <PackageOutput output={this.state.packagesToInstall.join(', ')}/>
            </div>
        )
    }
    
    getPackageInstallOrder(arr) {
        let outputArray = this.dfsTopoSort(arr)

        this.setState({packagesToInstall: outputArray})
    }

    dfsTopoSort(pkgsArr) {
        let packages = []
        let visited = []
        let sorted = []
        let hasCycle = false
        const error = 'Error: invalid dependency specification contains cycle'

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
