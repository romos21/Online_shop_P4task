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

    const addProduct=async (event)=>{
        event.preventDefault();
        console.log(formProduct);
        let response=await fetch('products/add',{
            method:'POST',
            headers:{
                'Content-type':'application/json',
            },
            body: JSON.stringify(formProduct),
        })
        response=await response.json();
        console.log(response);
        props.productsSet(response);
    }

    return (
        <FormComponent
            headTextContent='Add Product'
            onChangeInputState={setFormProduct}
            inputState={formProduct}
            formInputs={addProductForm}
            onClickListener={addProduct}
        />
    );
}

export default connect(null,mapDispatchToProps)(ProductsAddPage);
