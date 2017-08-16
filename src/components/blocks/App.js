import React, { Component } from 'react';
import ReactGridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }
  render() {
    var layout = [
      {i: 'a', x: 0, y: 0, w: 4, h: 12},
      {i: 'b', x: 4, y: 0, w: 4, h: 12},
      {i: 'c', x: 0, y: 12, w: 8, h: 10}
    ];
    return (
      <div>
        <ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
          <div key={'a'}><iframe src="http://localhost:8080/#/experts-evaluations/1" width="100%" height="100%"></iframe></div>
          <div key={'b'}><iframe src="http://localhost:8080/#/experts-evaluations/1" width="100%" height="100%"></iframe></div>
          <div key={'c'}><iframe src="http://localhost:8080/#/store" width="100%" height="100%"></iframe></div>
        </ReactGridLayout>
      </div>
    );
  }
}

export default App;
