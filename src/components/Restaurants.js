import React, { Component } from 'react';
import './Restaurant.css';
import partner from '../assert/partner.png';
import './restfirst.css';

class RestaurantRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            name: '',
            ownerName: '',
            phoneNumber: '',
            address: '',
            location: '',
            otp: '',
            cuisine: '',
            menuDetails: '',
            foodName: '',
            foodCost: '',
            makingTime: '',
            foodImage: null,
            panCard: null,
            fssaiLicense: null,
            bankDetails: '',
            gstNumber: '',
            errors: {}
        };
    }

    // Validate form data before proceeding
    validateForm = () => {
        const { step, name, ownerName, phoneNumber, address, otp, cuisine, menuDetails, foodName, foodCost, makingTime, gstNumber, bankDetails } = this.state;
        let errors = {};
        let isValid = true;

        if (step === 2) {
            if (!name) {
                isValid = false;
                errors.name = "Restaurant name is required";
            }
            if (!ownerName) {
                isValid = false;
                errors.ownerName = "Owner name is required";
            }
            if (!phoneNumber) {
                isValid = false;
                errors.phoneNumber = "Phone number is required";
            }
            if (!address) {
                isValid = false;
                errors.address = "Address is required";
            }
        }

        if (step === 3 && !otp) {
            isValid = false;
            errors.otp = "OTP is required";
        }

        if (step === 4) {
            if (!cuisine) {
                isValid = false;
                errors.cuisine = "Cuisine type is required";
            }
            if (!menuDetails) {
                isValid = false;
                errors.menuDetails = "Menu description is required";
            }
            if (!foodName) {
                isValid = false;
                errors.foodName = "Food name is required";
            }
            if (!foodCost) {
                isValid = false;
                errors.foodCost = "Food cost is required";
            }
            if (!makingTime) {
                isValid = false;
                errors.makingTime = "Making time is required";
            }
            if (!this.state.foodImage) {
                isValid = false;
                errors.foodImage = "Food image is required";
            }
        }

        if (step === 5) {
            if (!this.state.panCard) {
                isValid = false;
                errors.panCard = "PAN Card is required";
            }
            if (!this.state.fssaiLicense) {
                isValid = false;
                errors.fssaiLicense = "FSSAI License is required";
            }
            if (!bankDetails) {
                isValid = false;
                errors.bankDetails = "Bank account details are required";
            }
        }

        this.setState({ errors });
        return isValid;
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleFileChange = (e) => {
        const { name, files } = e.target;
        this.setState({ [name]: files[0] });
    };

    nextStep = () => {
        if (this.validateForm()) {
            const { step } = this.state;
            if (step < 5) {
                this.setState({ step: step + 1 });
            }
        }
    };

    prevStep = () => {
        const { step } = this.state;
        if (step > 1) {
            this.setState({ step: step - 1 });
        }
    };

    handleLocationSelect = () => {
        alert('Location selection feature coming soon!');
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ step: 1 });
        console.log('Submitted Data:', this.state);
        alert('Registration Submitted Successfully!');
    };

    render() {
        const {
            step,
            name,
            ownerName,
            phoneNumber,
            address,
            otp,
            cuisine,
            menuDetails,
            foodName,
            foodCost,
            makingTime,
            gstNumber,
            bankDetails,
            errors
        } = this.state;

        return (
            <>
                {step === 1 && (
                    <div className="restfirst">
                        <div className="mock">
                            <img src={partner} alt="Partner with us" />
                        </div>
                        <div className="form">
                            <h2>Register Your Restaurant & Start Growing Your Business! 🍽️</h2>
                            <p>✅ 0% Commission for 1st Month</p>
                            <p>✅ Get started in just 10 minutes</p>
                            <button type="button" onClick={this.nextStep}>Register</button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <form className="form-step">
                        <h1>Restaurant Information</h1>
                        <input
                            type="text"
                            name="name"
                            placeholder="Restaurant Name"
                            value={name}
                            onChange={this.handleChange}
                            required
                        />
                        {errors.name && <div className="error">{errors.name}</div>}

                        <input
                            type="text"
                            name="ownerName"
                            placeholder="Owner Name"
                            value={ownerName}
                            onChange={this.handleChange}
                            required
                        />
                        {errors.ownerName && <div className="error">{errors.ownerName}</div>}

                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={this.handleChange}
                            required
                        />
                        {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}

                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={address}
                            onChange={this.handleChange}
                            required
                        />
                        {errors.address && <div className="error">{errors.address}</div>}

                        <button type="button" onClick={this.handleLocationSelect}>Select Location</button>
                        <div className="button-group">
                            <button type="button" onClick={this.prevStep}>Back</button>
                            <button type="button" onClick={this.nextStep}>Next</button>
                        </div>
                    </form>
                )}

                {step === 3 && (
                    <form className="form-step">
                        <h1>OTP Verification</h1>
                        <input
                            type="text"
                            name="otp"
                            placeholder="Enter 4-digit OTP"
                            maxLength="4"
                            value={otp}
                            onChange={this.handleChange}
                            required
                        />
                        {errors.otp && <div className="error">{errors.otp}</div>}
                        <div className="button-group">
                            <button type="button" onClick={this.prevStep}>Back</button>
                            <button type="button" onClick={this.nextStep}>Next</button>
                        </div>
                    </form>
                )}

                {step === 4 && (
                    <form className="form-step">
                        <h1>Menu Details</h1>
                        <input
                            type="text"
                            name="cuisine"
                            placeholder="Cuisine Type"
                            value={cuisine}
                            onChange={this.handleChange}
                            required
                        />
                        {errors.cuisine && <div className="error">{errors.cuisine}</div>}

                        <input
                            type="text"
                            name="menuDetails"
                            placeholder="Menu Description"
                            value={menuDetails}
                            onChange={this.handleChange}
                            required
                        />
                        {errors.menuDetails && <div className="error">{errors.menuDetails}</div>}

                        <input
                            type="text"
                            name="foodName"
                            placeholder="Sample Food Name"
                            value={foodName}
                            onChange={this.handleChange}
                            required
                        />
                        {errors.foodName && <div className="error">{errors.foodName}</div>}

                        <input
                            type="text"
                            name="foodCost"
                            placeholder="Food Cost"
                            value={foodCost}
                            onChange={this.handleChange}
                            required
                        />
                        {errors.foodCost && <div className="error">{errors.foodCost}</div>}

                        <input
                            type="text"
                            name="makingTime"
                            placeholder="Making Time"
                            value={makingTime}
                            onChange={this.handleChange}
                            required
                        />
                        {errors.makingTime && <div className="error">{errors.makingTime}</div>}

                        <label>Upload Menu/Profile Food Image *</label>
                        <input
                            type="file"
                            name="foodImage"
                            onChange={this.handleFileChange}
                            required
                        />
                        {errors.foodImage && <div className="error">{errors.foodImage}</div>}

                        <div className="button-group">
                            <button type="button" onClick={this.prevStep}>Back</button>
                            <button type="button" onClick={this.nextStep}>Next</button>
                        </div>
                    </form>
                )}

                {step === 5 && (
                    <form className="form-step" onSubmit={this.handleSubmit}>
                        <h1>Upload Documents</h1>
                        <label>PAN Card *</label>
                        <input
                            type="file"
                            name="panCard"
                            onChange={this.handleFileChange}
                            required
                        />
                        {errors.panCard && <div className="error">{errors.panCard}</div>}

                        <label>GST Number (if applicable)</label>
                        <input
                            type="text"
                            name="gstNumber"
                            placeholder="GST Number"
                            value={gstNumber}
                            onChange={this.handleChange}
                        />

                        <label>FSSAI License *</label>
                        <input
                            type="file"
                            name="fssaiLicense"
                            onChange={this.handleFileChange}
                            required
                        />
                        {errors.fssaiLicense && <div className="error">{errors.fssaiLicense}</div>}

                        <label>Bank Account Details *</label>
                        <input
                            type="text"
                            name="bankDetails"
                            placeholder="Bank Account Details"
                            value={bankDetails}
                            onChange={this.handleChange}
                            required
                        />
                        {errors.bankDetails && <div className="error">{errors.bankDetails}</div>}

                        <div className="button-group">
                            <button type="button" onClick={this.prevStep}>Back</button>
                            <button type="submit">Get Started - It Only Takes 10 Minutes 🚀</button>
                        </div>
                    </form>
                )}
            </>
        );
    }
}

export default RestaurantRegistration;
