export class Time{
    getCurrentTimeDate(){
        //todo: khai báo lớp đối tượng Date() mặc định
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
    
        // setTimeout(this.getCurrentTimeDate(), 500);
        
        return fullDate;
    }
}