'use strict';

var React = require('react');
var Select = require('rc-select');
var Option = Select.Option;
require('rc-select/assets/index.css');
var jsonp = require('jsonp');
var querystring = require('querystring');

var Search = React.createClass({
  getInitialState() {
    return {
      data: []
    }
  },

  fetchData(value) {
    jsonp('http://suggest.taobao.com/sug?' + querystring.encode({
      code: 'utf-8',
      q: value
    }), (err, d) => {
      var result = d.result;
      var data = [];
      result.forEach((r)=> {
        data.push({
          value: r[0],
          text: <b>{r[0]}</b>
        });
      });
      this.setState({
        data: data
      });
    });
  },

  handleSelect(value) {
    console.log('select ', value);
  },

  render() {
    var data = this.state.data;
    var options = data.map((d) => {
      return <Option key={d.value}>{d.text}</Option>;
    });
    return <div>
      <h2>suggest</h2>
      <div>
        <Select
          style={{width: 500}}
          combobox
          renderDropdownToBody={location.href.indexOf('renderDropdownToBody') !== -1}
          showArrow={false}
          notFoundContent=""
          onChange={this.fetchData} onSelect={this.handleSelect} filterOption={false}>
        {options}
        </Select>
      </div>
    </div>;
  }
});

React.render(<Search />, document.getElementById('__react-content'));