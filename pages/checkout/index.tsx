
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { imageBaseURl } from '../../utilities/constants';
import styles from './checkout.module.scss'
export default function Checkout() {

    const [checkoutItems, setCheckoutItems] = useState(useSelector((state: any) => state.storeReducer.cartItems))


    useEffect(() => {
        if (!checkoutItems?.length) {
            let currentCartItems = sessionStorage.getItem('cartItems') || 'null';
            setCheckoutItems(JSON.parse(currentCartItems));
        }
    }, [])
    const handleFormSubmission = () => {
        //here on Submit I have to send the api call to node server . 
        //There it will a crud to perform operations with database
        //have toValidate here and then success call
    }

    const handleOnChangeEvent = (event: any) => {
        //here we have to validate the params and can send to server as well for validaion on submit call
        //as limitation of time i am by passing them;
    }
    return (

        <div className="card jumbotron">
            <h3 className='text-success'>Checkout Details</h3>

            <ul className="list-group mt-5">
                {checkoutItems?.map((element: any, index: any) => {
                    return (
                        <table className="table table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">checkout Item</th>
                                    <th>Item Id</th>
                                    <th>First Look</th>
                                    <th scope="col">Movie Name</th>
                                    <th scope="col">Ticket Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{element?.id}</td>
                                    <td>
                                        <i className={`material-icons ${styles.checkout_header_icon}`}><img
                                            src={`${imageBaseURl}${element?.poster_path}`}
                                            alt={element?.original_title}
                                            height={12}
                                            width={12}
                                            className={`material-icons ${styles.checkout_header_icon}`}
                                        /></i>
                                    </td>
                                    <td>{element?.original_title}</td>
                                    <td>{element?.ticket_price} AED</td>

                                </tr>


                            </tbody>
                        </table>
                    )
                })}
            </ul>
            <form>
                <h4>Payment Information</h4>
                <div className="row">
                    <div className="col">
                        <label>First name*</label>
                        <input type="text" name='firstName' onChange={(event) => handleOnChangeEvent(event)} className="form-control required" id="firstName" placeholder="First name" />
                    </div>
                    <div className="col">
                        <label>Last name*</label>
                        <input type="text" name='lastName' onChange={(event) => handleOnChangeEvent(event)} className="form-control required" id="lName" placeholder="Last name" />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Email*</label>
                        <input type="email" name='email' onChange={(event) => handleOnChangeEvent(event)} className="form-control required" id="emailId" placeholder="Email" />
                    </div>

                    <div className="form-group col-md-6">
                        <label>Email*</label>
                        <input type="text" name='nationality' onChange={(event) => handleOnChangeEvent(event)} className="form-control required" id="nationality" placeholder="Nationality" />
                    </div>
                    <div className="form-group phone col-md-6">
                        <label>Phone*</label>
                        <input type="tel" onChange={(event) => handleOnChangeEvent(event)} className="form-control required" id="phone" placeholder="Nationality" />
                    </div>
                </div>
                <button onClick={() => { handleFormSubmission() }} type="submit" className="btn btn-primary mb-2">Submit</button>

            </form>

        </div>
    );
}
