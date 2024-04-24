import { Box, Button, FormControl, FormHelperText, LinearProgress, TextField, Typography } from '@mui/material'
import { Formik } from 'formik'
import React from 'react'
import { loginValidationSchema } from '../validationSchema/login.validation.schema'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import $axios from '../lib/axios/axios.instance'

const Login = () => {
    const navigate=useNavigate()

    const {isPending, mutate}=useMutation({
        mutationKey:["get-login"],
        mutationFn:async(values)=>{
            return await $axios.post("/user/login",values)
        },
        onSuccess:(res)=>{
            console.log(res)
            navigate("/products")

            //extract token,role and firstName from login response
            const accessToken=res?.data?.token
            const firstName=res?.data?.userDetail?.firstName
            const role=res?.data?.userDetail?.role

            //set these values to local storage
            localStorage.setItem("accessToken", accessToken)
            localStorage.setItem("firstName", firstName)
            localStorage.setItem("role", role)


        },
        onError:(error)=>{
            console.log(error.response.data.message)
        }
 
    })
    
  return (
    <>
    {isPending && <LinearProgress color="secondary" />}
    <Box>
        <Typography variant='h4'>Sign In</Typography>
        <Formik initialValues={{
            email:"",
            password:""
        }} validationSchema={loginValidationSchema} onSubmit={(values)=>{console.log(mutate(values))}}>
            {
                (formik)=>{
                    return <form onSubmit={formik.handleSubmit} style={{display:"flex",flexDirection:"column", justifyContent:"space-around" ,padding:"1rem", gap:"1rem",height:"250px", width:"400px",boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                        <FormControl>
                            <TextField label="email" {...formik.getFieldProps("email")} />
                            {formik.touched.email && formik.errors.email?<FormHelperText error>{formik.errors.email}</FormHelperText> :null}
                        </FormControl>
                        <FormControl>
                            <TextField label="password" {...formik.getFieldProps("password")} />
                            {formik.touched.password && formik.errors.password?<FormHelperText error>{formik.errors.password}</FormHelperText> :null}
                        </FormControl>
                        <Button type='submit' variant='contained' color='secondary'>Login</Button>
                        <Link to="/register" >New User?Register here</Link>
                    </form>
                }
            }
        </Formik>
    </Box>
    </>
  )
}

export default Login