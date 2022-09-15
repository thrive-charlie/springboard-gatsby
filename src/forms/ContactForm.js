import React, {useCallback, useState} from 'react';
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";
import axios from "axios";

const ContactForm = () => {

    // Form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState(null);

    // ReCaptcha hook
    const {executeRecaptcha} = useGoogleReCaptcha();

    // Create an event handler so you can call the verification on button click event or form submit
    const handleReCaptchaVerify = useCallback(async (e) => {
        e.preventDefault();
        if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            return;
        }

        const token = await executeRecaptcha('yourAction');

        axios.post(`${process.env.GATSBY_WP_API}/form-handler`, {
            data: {
                recaptcha: token,
                fields: {
                    name: name,
                    email: email,
                    phone: phone,
                    message: message
                }
            }
        }).then(response => {
            setResponse(response);
        }).catch(error => {
            setResponse(error);
        })

    }, [executeRecaptcha]);

    return (
        <form onSubmit={handleReCaptchaVerify}>
            <pre>API URL:{process.env.GATSBY_WP_API}</pre>
            <div className="form-item">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="form-item">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="form-item">
                <label htmlFor="phone">Phone</label>
                <input type="text" id="phone" onChange={(e) => setPhone(e.target.value)}/>
            </div>
            <div className="form-item">
                <label htmlFor="message">Message</label>
                <textarea id="message" onChange={(e) => setMessage(e.target.value)}></textarea>
            </div>
            <button className="bg-emerald-700 text-white py-2 px-4 rounded-md" type="submit">Send it
            </button>
        </form>
    )
}

export default ContactForm;