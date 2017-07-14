import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

it('renders without crashing', () => {
  const data = [
      "KittenService: ",
      "Leetmeme: Cyberportal",
      "Cyberportal: Ice",
      "CamelCaser: KittenService",
      "Fraudstream: Leetmeme",
      "Ice: "
  ]

  const div = document.createElement('div')

  ReactDOM.render(<App data={data}/>, div)
})
