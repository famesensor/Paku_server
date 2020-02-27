import React, { Component } from 'react';
import PostFormStep1 from '../forms/postforms/PostFormStep1';
import PostFormStep2 from '../forms/postforms/PostFormStep2';
import PostFormStep3 from '../forms/postforms/PostFormStep3';
import PostConfirm from '../forms/postforms/PostConfirm';
import PostSuccess from '../forms/postforms/PostSuccess';

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            name: '',
            parkingtype: '',
            slot: '',
            cartype: '',
            open: '',
            close: '',
            detail: '',
            rule: [],
            nearby: [],
            facility: '',
            price: '',
            picture: '',
            currentlocation: {
                lat: 13.7563,
                lng: 100.5018,
            },
            zoom: 16,
            show: false
        }
    };

    componentDidMount = () => {
        document.title = "Paku - Posting"
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.setState(prevState => ({
                        currentlocation: {
                            ...prevState.currentLatLng,
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        },
                        zoom: 16,
                        show: true
                    }))
                }
            )
        }
    };

    handleMarker = ({ lat, lng }) => {
        console.log(lat, lng)
        this.setState({
            currentlocation: {
                lat: lat,
                lng: lng
            }
        })
        this.setState({ show: true })
    }

    // Proceed to next step
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    };

    // Go back to prev step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    };

    // Handle fields change
    // handleChange = input => (e) => {
    //     this.setState({ [input]: e.target.value });
    //     console.log(e.target.value)
    // };

    handleChange = input => (e, {value}) => {
        this.setState({ [input]: value });
        console.log(value);
    }

    render() {
        const { step } = this.state;
        const { name,
            currentlocation,
            zoom,
            show,
            parkingtype,
            slot,
            cartype,
            open,
            close,
            detail,
            rule,
            nearby,
            facility,
            price,
            picture } = this.state;
        const values =
        {
            name,
            currentlocation,
            zoom,
            show,
            parkingtype,
            slot,
            cartype,
            open,
            close,
            detail,
            rule,
            nearby,
            facility,
            price,
            picture
        };

        // eslint-disable-next-line default-case
        switch (step) {
            case 1:
                return (
                    <PostFormStep1
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        handleMarker={this.handleMarker}
                        values={values}
                    />
                );
            case 2:
                return (
                    <PostFormStep2
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                );
            case 3:
                return (
                    <PostFormStep3
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                );
            case 4:
                return (
                    <PostConfirm
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        values={values}
                    />
                );
            case 5:
                return <PostSuccess />;
        }

    }
}

export default Post;