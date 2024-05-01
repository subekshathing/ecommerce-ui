import { Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, FormHelperText, InputLabel, LinearProgress, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Formik } from 'formik'
import React from 'react'
import addProductValidationSchema from  '../validationSchema/add.product.validation'
import { productCategories } from '../constants/general.constants'
import { useMutation } from '@tanstack/react-query'
import $axios from '../lib/axios/axios.instance'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
    const navigate=useNavigate()
    const {isPending,mutate}=useMutation({
        mutationKey:["add-product"],
        mutationFn:async(values)=>{
            return await $axios.post("/product/add",values)
        },
        onSuccess:()=>{
navigate("/products")
        }
    })
if(isPending){
  return <CircularProgress/>
}
  return (
   <>
  
    <Box>
<Formik initialValues={
     {
        name:"",
        brand:"",
        price:0,
        availableQuantity:1,
        freeShipping:false,
        category:"",
        description:"",
        image:null
     }
} validationSchema={addProductValidationSchema} onSubmit={(values)=>{mutate(values)}}>
    {
        (formik)=> <form onSubmit={formik.handleSubmit} style={{display:"flex",flexDirection:"column", justifyContent:"space-around" ,padding:"1rem", gap:"1rem", width:"400px",boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
            <Typography variant='h6'>Add product</Typography>
           <FormControl>
            <TextField label="Name" {...formik.getFieldProps("name")} required/>
            {formik.touched.name && formik.errors.name ?<FormHelperText error>{formik.errors.name}</FormHelperText> :null}
           </FormControl>
           <FormControl>
            <TextField label="Brand" {...formik.getFieldProps("brand")} required/>
            {formik.touched.brand && formik.errors.brand ?<FormHelperText error>{formik.errors.brand}</FormHelperText> :null}
           </FormControl>
           <FormControl>
            <TextField label="Price" {...formik.getFieldProps("price")} type='number' required/>
            {formik.touched.price && formik.errors.price ?<FormHelperText error>{formik.errors.price}</FormHelperText> :null}
           </FormControl>
           <FormControl>
            <TextField label="Quantity" {...formik.getFieldProps("availableQuantity")} required/>
            {formik.touched.availableQuantity && formik.errors.availableQuantity ?<FormHelperText error>{formik.errors.availableQuantity}</FormHelperText> :null}
           </FormControl>
           <FormControl>
           <FormControlLabel control={<Checkbox defaultChecked />} label="Free shipping" {...formik.getFieldProps("freeShipping")} />
           </FormControl>
           <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select label="Category" {...formik.getFieldProps("category")}>
                  {productCategories.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>

                {formik.touched.category && formik.errors.category ? (
                  <FormHelperText error>
                    {formik.errors.category}
                  </FormHelperText>
                ) : null}
              </FormControl>
<FormControl>
<TextField label="Description" multiline rows={4}
         {...formik.getFieldProps("description")}
/>
        {formik.touched.description && formik.errors.description ?<FormHelperText error>{formik.errors.description}</FormHelperText> :null}
</FormControl>
<Button variant='contained' type='submit' color='success'>Submit</Button>
        </form>
        
    }
     
</Formik>
    </Box>
   </>
  )
}

export default AddProduct