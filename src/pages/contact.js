import React from 'react';
import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3';
import Layout from "../components/Layout";
import ContactForm from "../forms/ContactForm";

const Contact = () => {
    return (
        <GoogleReCaptchaProvider reCaptchaKey={process.env.GATSBY_RECAPTCHA_KEY}>
            <Layout>
                <div className="container mx-auto">
                    <h1 className="text-4xl mb-8">Contact Page</h1>
                    <ContactForm/>
                </div>
            </Layout>
        </GoogleReCaptchaProvider>
    );
}

export default Contact;