import {Payload, Jose, makeJwt,validateJwt,setExpiration} from '../deps.ts';
import {config} from '../utils/config.ts';
import { moment } from "https://deno.land/x/moment/moment.ts";

export const getToken = async({req,res} : {req: any, res: any}) =>{
   

       const jwt_payload: Payload = {
                iss: config.iss,
                exp: setExpiration(moment().add(24, 'hours').toDate()),

            }
            const jwt_header: Jose = {
                alg: "HS256",
                typ: "JWT"
            };
            
    const token = makeJwt({header: jwt_header, payload: jwt_payload, key: config.JWT});

    return {
        token: token,
        message: "success"
    }


}

export const validateToken = async({req,res} : {req: any, res: any}) =>{
   
    const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrZXZpbiIsImV4cCI6MTU5MTIwNDcxODE0NH0.-qykyF_4OrvHsRmismC8r48v22JrFwPQl2jxO21UG5g";

           
       const validate =  await validateJwt(key, config.JWT , { isThrowing: true })
        return {
            validate,
            message: "success"
        }


}