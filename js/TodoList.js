export class TodoList {
    constructor(){
        this.tagList = [];
    }
    addList (tag){
        this.tagList.push(tag);
    }

    //! remove the tags out the tagList array
    removeList (index){
        this.tagList.splice(index,1);   
    }

    //! show the tags to UI function
    renderTodo(){
        let content = "";

        content = this.tagList.reduceRight((todoContent,item,index) =>{


            //! data-index để gọi giá trị khi remove
            todoContent += `
                <li class = "d-flex">
                    <span>${item.textTag}</span><span>${item.realTime}</span>
                    <div class = "btn__icon">
                        <button class = "btn__remove" data-index = "${index}" data-status = "${item.status}" onclick = "removeTag(event)"><i class="fa fa-trash-alt"></i></button>
                        <button class = "btn__complete" data-index = "${index}" data-status = "${item.status}" onclick = "completeTodo(event)"><i class="fa fa-check-circle"></i></button>
                    </div>
                </li>
            `;
            return todoContent;
        },``);
        return content;
    }

    //! show the tags when complete to UI function
    renderTodoComplete(){
        let content = "";

        content = this.tagList.reduceRight((todoContent,item,index) =>{


            //! data-index để gọi giá trị khi remove
            todoContent += `
                <li class = "d-flex">
                    <span>${item.textTag}</span><span>${item.realTime}</span>
                    <div class = "btn__icon">
                        <button class = "btn__remove" data-index = "${index}" data-status = "${item.status}" onclick = "upTag(event)"><i class="fa fa-arrow-circle-up"></i></button>
                        <button class = "btn__complete"><i class="fa fa-check-circle"></i></button>
                    </div>
                </li>
            `;
            return todoContent;
        },``);
        return content;
    }

//todo: sắp xwsp tăng dần và giảm dần
    sortTodoList(sapXepUpOrDown){
        //todo: sort(tag,nexttag): lấy phần tử tag đầu tiên so sánh với phần tử tag tiếp theo, tiếp tục quá trình so sánh đó đến khi kết thúc
        this.tagList.sort((tag,nextTag) => {
            //todo: chuyển thành chữ in thường để so sánh
            let textFirstTag = tag.textTag.toLowerCase();
            let textNextTag = nextTag.textTag.toLowerCase();
            //todo: mặc định là sắp xếp tăng dần
            //todo: localeCompare(): so sánh có dấu
            return textNextTag.localeCompare(textFirstTag);
        });
        //todo: Để làm sắp xếp giảm dần chỉ cần xét thêm biến điều kiện để đảo ngược hàm ở trên bằng đảo mảng 
        if (sapXepUpOrDown === "true"){
            this.tagList.reverse();
        }
    }

    sortTimeTodoList(sapXepUpOrDown){
        //todo: sort(tag,nexttag): lấy phần tử tag đầu tiên so sánh với phần tử tag tiếp theo, tiếp tục quá trình so sánh đó đến khi kết thúc
        this.tagList.sort((tag,nextTag) => {
            //todo: chuyển thành chữ in thường để so sánh
            let timeFirstTag = tag.realTime.toLowerCase();
            let timeNextTag = nextTag.realTime.toLowerCase();
            //todo: mặc định là sắp xếp tăng dần
            //todo: localeCompare(): so sánh có dấu
            return timeNextTag.localeCompare(timeFirstTag);
        });
        //todo: Để làm sắp xếp giảm dần chỉ cần xét thêm biến điều kiện để đảo ngược hàm ở trên bằng đảo mảng 
        if (sapXepUpOrDown === "true"){
            this.tagList.reverse();
        }
    }
}