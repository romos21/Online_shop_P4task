import React,{useState} from 'react';
import {connect} from "react-redux";
import {productsSet} from "../../actions";
import FormComponent from "../pages/FormComponent";
import {addProductForm} from "../../constants/forms";

const mapDispatchToProps={
    productsSet
}

function ProductsAddPage(props) {

    const [formProduct, setFormProduct] = useState({
        title:'',
        description:'',
        cost:0,
        count:0,
    });

    const addProduct=async (fileValue)=>{
        let formData = new FormData();
        formData.append('image', fileValue);
        formData.append('info', JSON.stringify(formProduct));

        //formData.append('products', formProduct);
        let response=await fetch('products/add',{
            method:'POST',
            body: formData,
        })
        response=await response.json();
        console.log(response);
        //props.productsSet(response);
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

export default connect(null,mapDispatchToProps)(ProductsAddPage);
