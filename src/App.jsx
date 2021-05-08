import React, { Component } from 'react'
import picture from './assets/image/view.png'
import axios from 'axios'
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  color: palevioletred;
  span{
    color:blue;
  }
`;

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      count: 100
    }
  }

  componentDidMount() {
    this.getData()
  }
  async getData() {
    let res = await axios.get('https://run.mocky.io/v3/9d5f33ec-0d2f-4743-aac9-5aef32f7badf')
    console.log(res);
  }


  render() {

    return (
      <>

        <img src={picture} alt="" />
        <Title>App Content<span>span</span></Title><br />
        {this.state.count}<br />
        <h4 className="text-xl text-blue-400">tailwind</h4>
      </>
    )

  }
}