"use strict";

const ToDo = React.createClass({
  getInitialState: function() {
    return {value: this.props.isDone};
  },
  render: function() {
    return (
      <label className="todo">
        <input type="checkbox" defaultChecked={this.state.value} onClick={this.handleClick}/>
        {this.props.text}
        <br/>
      </label>
    );
  },
  handleClick: function(event) {
    // toggle checkbox
    this.state.value = !this.state.value;
    console.log(this.state.value);
  }
});

const generateDisplayList = function(arr) {
  // Object.keys(data).forEach((key) => {
  //   list.push(<ToDo key={key} text={data[key].text} isDone={data[key].isDone}></ToDo>);
  // });
  console.log("generating list from:",arr);
  let list = arr.map(function(o) {
    return <ToDo key={o.id} text={o.data.text} isDone={o.data.isDone}></ToDo>
  });
  return list;
}

const ToDoList = React.createClass({
  getInitialState: function() {
    return {list: []}
  },
  loadToDoListFromServer: function() {
    $.get("http://localhost:8080/api")
      .done((res) => {
        let foo = [];
        console.log("res.data",res.data);
        Object.keys(res.data).forEach((key) => {
          console.log("x");
          foo.push({id: key, data: res.data[key]})
        });
        if (foo.length > 0) this.setState({list: foo});
      }.bind(this))
      .fail((err) => {
        console.log("AJAX error")
      }.bind(this));
  },
  componentDidMount: function()  {
    $("#addTask").on("click", this.addTask);
    this.loadToDoListFromServer();
  },
  render: function() {
    // conditional render:
    // don't want to return HTML before AJAX is finished
    if (this.state.list.length > 0) {
      return (
        <div className="todoList">
          {generateDisplayList(this.state.list)}
        </div>
      );
    } else { return null }
  },
  addTask: function(e) {
    console.log("click!");
    $.post("http://localhost:8080/api", {text: $("#newTaskName").val(), isDone: false})
      .done((res) => {
        console.log("posted", res);
      })
      // .fail((err) => {
      //   console.log("AJAX error");
      // });
  }
})

// $.get("http://localhost:8080/api")
//   .done((res) => {
//     ReactDOM.render(React.createElement(ToDoList,{list: res.data}),document.getElementById("content"));
//   })
//   .fail((err) => {
//     console.log("AJAX error");
//   });

ReactDOM.render(
  React.createElement(ToDoList,null),
                      document.getElementById("content")
);
