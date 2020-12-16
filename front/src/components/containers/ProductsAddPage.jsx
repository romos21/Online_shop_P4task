import React,{useState} from 'react';
import {connect} from "react-redux";
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

    const [formProduct, setFormProduct] = useState({
        title:'',
        description:'',
        cost:0,
        count:0,
    });

    const addProduct=async (fileValue)=>{
        let formData = new FormData();
        formData.append('image', fileValue);
        formData.append('info', JSON.stringify({...formProduct, token: user.token}));

        let response=await fetch('products/add',{
            method:'POST',
            body: formData,
        })
        response=await response.json();
        console.log(response);
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
