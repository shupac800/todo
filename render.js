"use strict";

console.log("running");

// var ProperListRender = React.createClass(
//   { displayName: "ProperListRender",
//     render: function() {
//       return (
//         React.createElement("ul", null,
//           this.props.list.map(function(listValue){
//             return React.createElement("li", null, listValue);
//           })
//         )
//       )
//     }
//   }
// );

// var ProperListRender = React.createClass({
//   render: function() {
//     return (React.createElement('div',null,'Wazzup'));
//   }
// });

// ReactDOM.render(
//   React.createElement(ProperListRender, {list: [1,2,3,4,5]}),
//                       document.getElementById('content')
// );

// define a component
var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    return  (
      <div className="commentList">
        <Comment author="Pete Hunt">This is one comment</Comment>
        <Comment author="Jordan Walke">This is another comment</Comment>
      </div>
    );
  }
});

var ToDo = React.createClass({
  render: function() {
    return (
      <div className="todo">
        <h2 className="todoText">
          {this.props.text}
        </h2>
        {this.props.children}
      </div>
    );
  }
});

var foo = function() {
  return (<ToDo text = "have a wank">false</ToDo>);
};

var bar = function(arr) {
  let list = [];
  let baz = ["abc", "def", "ghi"];
  for (let i = 0; i < baz.length; i++) {
    list.push(<ToDo key={i} text={baz[i]}>false</ToDo>);
  }
  return list;
}

var ToDoList = React.createClass({
  render: function() {
    return (
      <div className="todoList">
        <ToDo text="call your mother">true</ToDo>
        <ToDo text="feed the iguana">false</ToDo>
        <ToDo text={this.props.x}>true</ToDo>
        {foo()}
        {bar()}
      </div>
    );
  }
})

ReactDOM.render(React.createElement(CommentList),document.getElementById('content'));
ReactDOM.render(React.createElement(ToDoList,{x: "walk the kangaroo"}),document.getElementById('content'));

$.get("http://localhost:8080/api")
  .done((res) => {
    console.log(res);

  })
  .fail((err) => {
    console.log("AJAX error");
  });
