import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';

import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spiner/Spiner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZipCode'
                },
                value: ''
                ,
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched:false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'chepest', displayValue: 'Chepest' }
                    ]
                },
                value: 'fastest',
                valid:true
            }
        },
        formIsValid:false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props);
        alert('You continue!');
        this.setState({ loading: true });
        const formData ={};
        for(let fromElementIdentifier in this.state.orderForm){
            formData[fromElementIdentifier] = this.state.orderForm[fromElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData:formData
        }
        axios.post('/orders.json', order).then(response => {
            this.setState({ loading: false });
            this.props.history.push('/');
        }).catch(err => {
            this.setState({ loading: false });
        });
    }

    checkValidity(value,rules){

        let isValid =true;
        if(rules==null){return true;}
        if(rules.required){
            isValid=value.trim() !=='' && isValid;
        }
        if(rules.minLength){
            isValid= value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid= value.length <= rules.minLength && isValid;
        }

        return isValid;
    }

    imputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid= this.checkValidity(updatedFormElement.value, updatedFormElement.validation); //adding validation
        updatedFormElement.touched=true;
        updatedOrderForm[inputIdentifier] = updatedFormElement; 

        let formIsValid =true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid= updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        
        this.setState({orderForm:updatedOrderForm, formIsValid: formIsValid});
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (<form onSubmit={this.orderHandler}>
            {formElementArray.map(formElement => (
                <Input key={formElement.id} elementType={formElement.config.elementType}
                 elementConfig={formElement.config.elementConfig} 
                 change={(event) => this.imputChangeHandler(event, formElement.id)} 
                 invalid={!formElement.config.valid}
                 shouldValidate={formElement.config.validation}
                 touched={formElement.config.touched}
                 value={formElement.config.value} />
            ))}
            <Button disabled={!this.state.formIsValid} btnType="Success">ORDER</Button>
        </form>);

        if (this.state.loading) {
            form = <Spinner />;
        }


        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }

}


export default ContactData;