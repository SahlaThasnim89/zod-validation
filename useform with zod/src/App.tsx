// "use client";

// import React, { useState } from "react";

// function App() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [isSubmit, setIsSubmit] = useState<boolean>(false)
//   const [errors, setErrors] = useState<string[]>([])

//   const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
//       e.preventDefault();
//       setIsSubmit(true)

//       if(password!==confirmPassword){
//         setErrors(["password and confirm passwor do not match"])
//         setIsSubmit(false)
//         return;
//       }
//       await new Promise((resolve)=>setTimeout(resolve,1000))

//       setEmail('')
//       setPassword('')
//       setConfirmPassword('')
//       setIsSubmit(false)

      
//   }
//   return (
//     <>
//       <form onSubmit={handleSubmit}>

//         {
//           errors.length>0 && (
//             <ul>
//               {errors.map((error)=>(
//                 <li key={error} className="text-red-500">{error}</li>
//               ))}
//             </ul>
//           )
//         }
//       <div className="grid gap-2">
//         <input
//           id="email"
//           type="email"
//           value={email}
//           placeholder="m@example.com"
//           maxLength={50}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </div>
//       <label htmlFor="">password</label>
//       <div className="grid gap-2">
//         <input
//           id="password"
//           type="password"
//           value={password}
//           minLength={8}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
//       <label htmlFor="">Confirm</label>
//       <div className="grid gap-2">
//         <input
//           id="password"
//           type="password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         />
//       </div>
//       <button type="submit" className="disabled:bg-blue-500" disabled={isSubmit}>submit</button>
//       </form>
//     </>
//   );
// }

// export default App;







// with hook form


"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {useForm } from "react-hook-form";
import { signUpSchema, TsignUpSchema } from "./lib/types";



function App() {
const {register,
  handleSubmit,
  formState:{errors,isSubmitting},
  reset,
  setError,
}=useForm<TsignUpSchema>({
  resolver:zodResolver(signUpSchema),
})


const onSubmit=async(data:TsignUpSchema)=>{
  try {
    const response=await fetch('/api/signUp',{
      method:"POST",
      body:JSON.stringify(data),
      headers:{
        "Content-Type":'application/json'
      },
    });
      const responseData=await response.json()
      if(!response.ok){
        alert('submitting form failed!')
        return;
      }
    
      if(responseData.errors){
        const errors=responseData.errors;
        
        if(errors.email){
            setError("email",{
              type:"server",
              message:errors.email,
            })
        }else if(errors.password){
          setError("password",{
            type:"server",
            message:errors.password,
          })
      }else if(errors.confirmPassword){
        setError("confirmPassword",{
          type:"server",
          message:errors.confirmPassword,
        })
    
      }else{
        alert("something went wrong!")
      }
      }
            //  await new Promise((resolve)=>setTimeout(resolve,1000))
            //  reset()    
  } catch (error) {
    console.error('Error submitting form:', error);
    alert("Something went wrong while submitting!");

  }
  
}

      
  
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>


      <div className="grid gap-2">
        <input
        {...register('email')}
          id="email"
          type="email"
          placeholder="m@example.com"
          maxLength={50}
        />
        {errors.email&&(
          <p className="text-red-500">{`${errors.email.message}`}</p>
        )}
      </div>
      <label htmlFor="">password</label>
      <div className="grid gap-2">
        <input
        {...register('password')}
          id="password"
          type="password"
          placeholder="password"
        />
                {errors.password&&(
          <p className="text-red-500">{`${errors.password.message}`}</p>
        )}
      </div>
      <label htmlFor="">Confirm</label>
      <div className="grid gap-2">
        <input
        {...register('confirmPassword')}
          id="password"
          type="password"
          placeholder="Confirm Password"
        />
                        {errors.confirmPassword&&(
          <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
        )}
      </div>
      <button type="submit" className="disabled:bg-blue-500" disabled={isSubmitting}>submit</button>
      </form>
    </>
  );
}

export default App;
