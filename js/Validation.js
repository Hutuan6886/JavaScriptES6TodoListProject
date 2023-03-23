export class Validation {
    kiemTraChu(input){
        let letter = /^[\u0041-\u1ef5\s]+$/;
        if (input.match(letter)){
            return true;
        }
        else{
            return false;
        }
    }
}