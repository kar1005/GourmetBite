import React, { useState } from 'react';
import './ContactUs.css';
import ContactForm from './ContactForm';
import Layout from '../../Layout/Layout';

export default function ContactUs() {

  return (
    <>
      <Layout>
        <ContactForm/>
      </Layout>
    </>
  );
}
