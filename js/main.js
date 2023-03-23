
import { Todo } from "./Todo.js";
import { TodoList } from "./TodoList.js";
import { Validation } from "./Validation.js";
import { Time } from "./Time.js";

//Todo: có 2 danh sách, 1 cái chưa hoàn thành và 1 cái đã hoàn thành
let todoList = new TodoList();
let completeTodoList = new TodoList();
let validation = new Validation();
let realTime = new Time();

let getEle = (id) => {
    return document.getElementById(id);
}

//! show realTime 

const showTime = () => {
    let currentTimeDate = new Date();
        //todo: Khai báo hàm hiển thị thứ, bởi vì hàm getDay sẽ trả ra giá trị từ 0-6, nên mảng sẽ hiển thị giá trị tương ứng
        let day = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

        let hours = currentTimeDate.getHours();

        let minutes = currentTimeDate.getMinutes();
        minutes = minutes < 10 ? '0' + minutes : minutes;

         let AMPM = hours >= 12 ? 'pm' : 'am';

        if(hours === 12){
            hours = 12;

        }else{
            hours = hours%12;
        }

        let seconds = currentTimeDate.getSeconds();


        let fullTime = `${hours}:${minutes}:${seconds} ${AMPM}`;

        let currentDay = day[currentTimeDate.getDay()];
        console.log(currentTimeDate.getDay());
        let currentDate  = currentTimeDate.getDate();
        let currentMonth = currentTimeDate.getMonth();
        let CurrentYear = currentTimeDate.getFullYear();

        let fullDate = `${currentDay} - ${currentDate}/${currentMonth}/${CurrentYear} - ${fullTime}`;

        setTimeout(showTime, 500);

        document.getElementById("date").innerHTML = fullDate;
}

showTime();

//! get the user data and add tags function 
const getDataUser = () => {
    //todo: create the variable to get the input value
    let newTag = getEle("newTask").value;
    let addTime = realTime.getCurrentTimeDate();

    // todo: validation check
    let valid = true;
    valid = validation.kiemTraChu(newTag);
    if (valid == false) {
        return;
    }

    //todo: biến đổi dữ liệu nhập vào thành lớp đối tượng todo
    let todo = new Todo(newTag, "todo", addTime);
    //todo: Hiển thị consol.log
    todoList.addList(todo);
    console.log(todoList.tagList);


    //! clear giá trị sau khi người dừng nhập vào và ấn add để tiếp tục nhập nội dung mới
    getEle("newTask").value = "";
}

//! HIển thị lên UI của hàm render
const showTag = (IdPositionDivTodo, classList) => {
    //todo: nơi hiển thị
    let positionDivTodo = getEle(IdPositionDivTodo);
    //todo: gọi hàm để hiển thị
    //* classList là lớp đại diện cho danh sách đối tượng
    positionDivTodo.innerHTML = classList.renderTodo();
}

//! HIển thị lên UI của hàm render
const showTagComplete = (IdPositionDivTodo, classList) => {
    //todo: nơi hiển thị
    let positionDivTodo = getEle(IdPositionDivTodo);
    //todo: gọi hàm để hiển thị
    //* classList là lớp đại diện cho danh sách đối tượng
    positionDivTodo.innerHTML = classList.renderTodoComplete();
}

//! remove tag khi ấn vô btn__trash 
const removeTag = (e) => {
    //todo: get tag được click on
    //! khi ấn vào nút btn__remove thì data-index tương ứng sẽ được gọi
    let getIndex = e.currentTarget.getAttribute("data-index");

    //todo: truyền giá trị tag được click vào hàm xóa 
    todoList.removeList(getIndex);
    //todo: HIển thị lại danh sách sau khi remove
    showTag("todo", todoList);
    console.log(todoList.tagList);
}
window.removeTag = removeTag;



//todo: Để complete list thì di chuyển các tag ở mảng todoList xuống completeTodoList. Cách làm là hiển thị tag bên completeTodoList và remove ở todoList đi
const completeTodo = (e) => {
    // console.log(e);
    //* Phải khai báo data-index để định được vị trí cần xóa và data-status để biết được đang ở danh sách nào
    let getIndex = e.currentTarget.getAttribute("data-index");
    let getStatus = e.currentTarget.getAttribute("data-status");

    if (getStatus === "todo") {
        //todo: Nếu tag được click có status là todo, thì lấy nó ra khỏi mảng tagList bằng hàm slice(indexStart,indexEnd)
        //? slice(indexStart <= getTag < indexEnd): 
        //? splice(1,3): vị trí được lấy là: 1,2 
        let getTag = todoList.tagList.slice(getIndex, getIndex + 1);

        //todo: Sau khi lấy được tag được chọn ra khỏi mảng tagList, thì khai báo nó thành thể todo mới cho phần complete
        let todoComplete = new Todo(getTag[0].textTag, "todoComplete", getTag[0].realTime);      //? getTag là 1 mảng, nếu chỉ lấy 1 giá trị thì phải getTag[0].textTag để lấy giá trị đầu tiên, chứ không được getTag.textTag 
        //todo: add vài danh sách complite và xóa ở danh sách todo, có thể viết tách thành 1 hàm riêng removeAndAddTodo
        //* completeTodoList.addList(todoComplete);
        //* todoList.removeList(getIndex);
        removeAndAddTodo(todoList, completeTodoList, todoComplete, getIndex);
        // console.log(completeTodoList.tagList);
        //todo: show list của lớp completeTodoList
        showTagComplete("completed", completeTodoList);
        showTag("todo", todoList);
    }

}
window.completeTodo = completeTodo;

//todo: xử lý nút up
const upTag = (e) => {
    let getIndex = e.currentTarget.getAttribute("data-index");
    let getStatus = e.currentTarget.getAttribute("data-status");

    if (getStatus === "todoComplete") {
        let getTag = completeTodoList.tagList.slice(getIndex, getIndex + 1);

        let todoObject = new Todo(getTag[0].textTag, "todo", getTag[0].realTime);
        removeAndAddTodo(completeTodoList, todoList, todoObject, getIndex);

        //todo: show list của lớp completeTodoList
        showTagComplete("completed", completeTodoList);
        showTag("todo", todoList);
        console.log(completeTodoList.tagList);
    }
}
window.upTag = upTag;



const removeAndAddTodo = (startingPointList, destinateionList, objectTodo, indexTodo) => {
    destinateionList.addList(objectTodo);
    startingPointList.removeList(indexTodo);
}
getEle("addItem").addEventListener("click", function () {
    getDataUser();
    showTag("todo", todoList);
});

//todo: sắp xếp thứ tự cho danh sách todoList
//todo: sắp xếp tăng dần
// const sapXepTangDanSort = () => {
//     todoList.sortTodoList("false");
//     showTag("todo",todoList);
// }
// window.sapXepTangDanSort = sapXepTangDanSort;
//todo: thay vì sử dụng hàm onclick bên html thì có thể gán sự kiện click lên id cho thẻ
getEle("two").addEventListener("click", function () {
    todoList.sortTodoList("false");
    showTag("todo", todoList);
});

//todo: sắp xếp giảm dần
getEle("three").addEventListener("click", function () {
    todoList.sortTodoList("true");
    showTag("todo", todoList);
});

//todo: sắp xếp thứ tự cho danh sách todoList
getEle("one").addEventListener("click", function () {
    completeTodoList.sortTodoList("false");
    showTagComplete("completed", completeTodoList);
});

getEle("clock").addEventListener("click", function () {
    completeTodoList.sortTimeTodoList("true");
    showTagComplete("completed", completeTodoList);
});




