import React from 'react'
import './PackageOutput.css'

const PackageOutput = ({output}) => (
    <div>
        <h2>Output</h2>
        <pre className="PackageOutput">
            <samp>"{output}"</samp>
        </pre>
    </div>
)

export default PackageOutput
