import {useState} from 'react'
import { omit } from 'lodash'

function useValidation() {

    const [errors, setErrors] = useState({});
    const [password, setPassword] = useState('');

    //err printing logic
    const errPrint = (props,msg) => {
        setErrors({ ...errors, [props]: msg})
    }

    // validation function
    const validate = ( name, value) => {
        // console.log('name = ', name + ", value =" + value)
        switch (name) {
            case "name":
                if (value.length === 0) {
                    errPrint(name, "Name field must be filled")
                } else if (value.length < 3) {
                    errPrint(name, "Name atleast have 3 letters")
                } else if (!new RegExp(/^[a-z A-Z\s]+$/).test(value)) {
                    errPrint(name, "Invalid Name")
                } else {
                    let newOb = omit(errors, name)
                    setErrors(newOb)
                }                
                break
            case "email":
                if (value.length === 0) {
                    errPrint(name, "Email field must be filled")
                } else if (!new RegExp(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/).test(value)) {
                    errPrint(name, "Invalid Email Format")
                } else {
                    let newOb = omit(errors, name)
                    setErrors(newOb)
                }
                break
            case "phone":
                if (value.length === 0) {
                    errPrint(name, "Mobile field must be filled")
                } else if (!new RegExp(/^[6-9]\d{9}$/).test(value)) {
                    errPrint(name, "Invalid Mobile Number")
                } else {
                    let newOb = omit(errors, name)
                    setErrors(newOb)
                }
                break
            case "password":
                setPassword(value);
                if (value.length === 0) {
                    errPrint(name, "Password field must be filled")
                } else if (value.length < 6) {
                    errPrint(name, "password should contain min 6 characters")
                } else if (!new RegExp(/^[a-z A-Z 0-9\s+&@*#]+$/).test(value)) {
                    errPrint(name, "password should contain only a-z, 0-9, & * $ - character")
                } else {
                    let newOb = omit(errors, name)
                    setErrors(newOb)
                }
                break
                case "CPassword":
                    if (value.length === 0) {
                        errPrint(name, "Confirm Password field must be filled");
                    } else if (value !== password) {
                        errPrint(name, "Confirm Password does not match Password");
                    } else {
                        let newOb = omit(errors, name);
                        setErrors(newOb);
                    }
                    break;           
            default:
                break
        }
    }
                
    return {
        errors,
        validate
    }

}
export default useValidation
