import React, { Component } from 'react';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
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
    var layouts = [
      {"lg":[{"w":2,"h":3,"x":0,"y":0,"i":"1","moved":false,"static":false},{"w":2,"h":3,"x":2,"y":0,"i":"2","moved":false,"static":false},{"w":2,"h":3,"x":4,"y":0,"i":"3","moved":false,"static":false},{"w":2,"h":3,"x":6,"y":0,"i":"4","moved":false,"static":false},{"w":2,"h":3,"x":8,"y":0,"i":"5","moved":false,"static":false}],"md":[{"w":2,"h":3,"x":0,"y":0,"i":"1","moved":false,"static":false},{"w":2,"h":3,"x":2,"y":0,"i":"2","moved":false,"static":false},{"w":2,"h":3,"x":4,"y":0,"i":"3","moved":false,"static":false},{"w":2,"h":3,"x":6,"y":0,"i":"4","moved":false,"static":false},{"w":2,"h":3,"x":8,"y":0,"i":"5","moved":false,"static":false}],"sm":[{"w":2,"h":3,"x":0,"y":0,"i":"1","moved":false,"static":false},{"w":2,"h":3,"x":2,"y":0,"i":"2","moved":false,"static":false},{"w":2,"h":3,"x":4,"y":0,"i":"3","moved":false,"static":false},{"w":2,"h":3,"x":4,"y":3,"i":"4","moved":false,"static":false},{"w":2,"h":3,"x":4,"y":6,"i":"5","moved":false,"static":false}],"xs":[{"w":2,"h":3,"x":0,"y":0,"i":"1","moved":false,"static":false},{"w":2,"h":3,"x":2,"y":0,"i":"2","moved":false,"static":false},{"w":2,"h":3,"x":2,"y":3,"i":"3","moved":false,"static":false},{"w":2,"h":3,"x":2,"y":6,"i":"4","moved":false,"static":false},{"w":2,"h":3,"x":2,"y":9,"i":"5","moved":false,"static":false}],"xxs":[{"w":2,"h":3,"x":0,"y":0,"i":"1","moved":false,"static":false},{"w":2,"h":3,"x":0,"y":3,"i":"2","moved":false,"static":false},{"w":2,"h":3,"x":0,"y":6,"i":"3","moved":false,"static":false},{"w":2,"h":3,"x":0,"y":9,"i":"4","moved":false,"static":false},{"w":2,"h":3,"x":0,"y":12,"i":"5","moved":false,"static":false}]}
    ]
    var layout = [
      {i: 'a', x: 0, y: 0, w: 4, h: 12},
      {i: 'b', x: 4, y: 0, w: 4, h: 12},
      {i: 'c', x: 0, y: 12, w: 8, h: 10}
    ];
    return (
      <div>
        <ResponsiveReactGridLayout className="layout" layouts={layouts} breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}} cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
          <div key={'1'} style={reactGridItem}>1</div>
          <div key={'2'} style={reactGridItem}>2</div>
          <div key={'3'} style={reactGridItem}>3</div>
          <div key={'4'} style={reactGridItem}>4</div>
          <div key={'5'} style={reactGridItem}>5</div>
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

const reactGridItem = {
  background: '#ccc'
};

export default App;
