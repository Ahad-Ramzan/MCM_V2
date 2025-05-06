import axios from "../../node_modules/axios/index";

const API_URL ="http://127.0.0.1:8000/api/user/";

// export const registerUser = async (email,password,fullname,role )=>{
//     try{
//         const response = await axios.post(`${API_URL}create/`,{email,password,fullname,role },
//             {
//                 withCredentials:true
//             }
//         ) 
//         return response.data

//     }catch(e){
//         throw new Error("Register Failed")

//     }
// }


export const registerUser = async ({ email, password, full_name, role }) => {
    try {
      const response = await axios.post(
        `${API_URL}create/`,
        { email, password, full_name, role },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (e) {
      throw new Error("Register Failed");
    }
  };

export const loginUser = async (email,password) =>{

    try{
        const response = await axios.post(`${API_URL}token/`,{email,password },
            {
                withCredentials:true
            }
        ) 
        return response.data

    }catch (e){
        throw new Error("Login Failed")


    }
}