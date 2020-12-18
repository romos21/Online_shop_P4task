import React,{useState} from 'react';
import {connect} from "react-redux";
import {useHistory} from "react-router";
import {productsSet} from "../../actions";
import FormComponent from "../pages/FormComponent";
import {addProductForm} from "../../constants/forms";

const mapStateToProps=state=>({
    user: state.userReducer,
})

const mapDispatchToProps={
    productsSet
}

function ProductsAddPage(props) {

    const {user}=props;

    const history=useHistory();

    const [formProduct, setFormProduct] = useState({
        title:'',
        description:'',
        cost:0,
        count:0,
    });

    const addProduct=async (fileValue)=>{
        let formData = new FormData();
        for(let key in formProduct){
            formData.append(key,formProduct[key]);
        }
        formData.append('image', fileValue);

        let response=await fetch(`admin/addProduct?token=${user.token}`,{
            method:'POST',
            body: formData,
        })
        response=await response.json();
        productsSet(response);
        history.push('/');
    }

    return (
        <FormComponent
            headTextContent='Add Product'
            onChangeInputState={setFormProduct}
            inputState={formProduct}
            formInputs={addProductForm}
            onClickListener={addProduct}
            isMultipart={true}
        />
    );
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductsAddPage);
