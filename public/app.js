var list;
var Note = React.createClass({
    edit() { 
        this.setState({ onEdit: true });
    },
    cancel() {
        this.setState({ onEdit: false });
    },
    save() {
        var note = this;
        //dùng ajax gủi id và nội dung cần sửa lên server nodejs
        $.post("/update", { idEdit: this.props.id, editContent: this.refs.textEdit.value }, function (data) {
            list.setState({ mang: data });
            note.setState({ onEdit: false });
        });
    },
    getInitialState() {
        //khởi tạo trạng thái ban đầu
        return { onEdit: false };
    },
    delete() {
        $.post("/delete", { idDel: this.props.id }, function (data) {
            list.setState({ mang: data });
        });
    },
    render: function () {
        //kiểm tra để thực hiện 
        //nêu là onEdit là true thì trả về form cho người dùng sửa chữa nội dung.
        if (this.state.onEdit) {
            return (
                <div className="div-note">
                    <input defaultValue={this.props.children} ref="textEdit" />
                    <button onClick={this.save}>Save</button>
                    <button onClick={this.cancel}>Cancel</button>
                </div>
            )
        } else {
            return (
                <div className="div-note">
                    <p>{this.props.children}</p>
                    {/*gọi đến phương thức delete trong class*/}
                    <button onClick={this.delete}>Delete</button>
                    {/*gọi đến phương thức save trong class*/}
                    <button onClick={this.edit}>Edit</button>
                </div>
            )
        }
    }
});

var List = React.createClass({
    getInitialState() {
        list = this;
        return { mang: [] }
    },
    render: function () {
        return (
            <div className="div-list">
                <div id="div-add" ></div>
                {/*gọi phương thức addDiv*/}
                <button onClick={addDiv}> Add node </button>
                {
                    this.state.mang.map(function (note, index) {
                        return <Note key={index} id={index}>{note}</Note>
                    })
                }
            </div>
        );
    },
    componentDidMount() {
        var that = this;
        $.post("/getnode", function (data) {
            that.setState({ mang: data });
        });
    }
});

var InputDiv = React.createClass({
    send() {
        //lấy giá trị mảng từ trên server gửi xuống
        $.post("/add", {
            note: this.refs.txte.value //lấy giá trị trong textfield txte gán cho biến node
        }, function (data) {
            list.setState({ mang: data });
        });
        //list.setState({ mang: list.state.mang.concat(this.refs.txte.value) });
        //gỡ bỏ form div-add sau khi nhập xong !
        ReactDOM.unmountComponentAtNode(document.getElementById("div-add"));

    },
    render: function () {
        return <div>
            <input type="text" ref="txte" placeholder="enter your note" />
            {/*gọi phương thưc send*/}
            <button onClick={this.send}>Add </button>
        </div>
    }
});
//phương thức thêm thẻ div này vào thẻ div có id div-add
function addDiv() {
    ReactDOM.render(<InputDiv />, document.getElementById("div-add"));
}
//hiển thị ra trang web.
ReactDOM.render(
    <div>
        <h1> List Management</h1>
        <List />
    </div>,
    document.getElementById('root')
);