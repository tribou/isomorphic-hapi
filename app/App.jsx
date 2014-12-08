var React = require('react');

var App = React.createClass({
  componentDidMount: function () {
      this.refs.myInput.getDOMNode().focus();  
  },
  getInitialState: function(){
    return {
      greeting:"Hello!",
      inputText:""
    };
  },
  handleClick: function(){
    this.setState({
      greeting:!this.state.clicked?'World!':'Hello!',
      clicked:!this.state.clicked
    });
  },
  handleInput: function(e){
    this.setState({
      inputText:e.target.value
    });
  },

  render: function(){
      inlineCss={
        background:'white',
        opacity:'0.9'
      }
      return(
          <div style={inlineCss}>
              <h1>My App!</h1>
              <p><strong>State:</strong>  {this.state.greeting} </p>
              <p><strong>Input:</strong>  {this.state.inputText} </p>
              <p>
                  <ul>
                      <strong>Props:</strong> {this.props.data.map(function(data, idx){
                        return <li key={idx}>{data}</li>
                      })}
                  </ul>
              </p>
              <p><input type="button" value="Click me" onClick={this.handleClick} /></p>
              <p><input type="text" ref="myInput" onChange={this.handleInput} /></p>
          </div>
      )
  }

});
module.exports=App;