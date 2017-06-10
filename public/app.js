var Note = React.createClass({
    render: function () {
        return <div >
            {this.props.children}
        </div>
    }
});

ReactDOM.render(
    <div>
        <h1> List Management</h1>
        <Note> Android </Note>
    </div>,
    document.getElementById('root')
);