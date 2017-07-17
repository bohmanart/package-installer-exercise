import React from 'react'
import './PackageInput.css'

const PackageInput = ({input}) => (
    <div>
        <h2>Input</h2>
        <pre className="PackageInput">
            <code>[<br/>
            &nbsp;&nbsp;"{input}"
            <br/>]</code>
        </pre>
    </div>
)

export default PackageInput
