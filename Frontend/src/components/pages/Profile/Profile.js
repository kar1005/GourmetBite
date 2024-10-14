import React from 'react';
import './Profile.css';
import Layout from '../../Layout/Layout.js';
import ProfileLayout from './ProfileLayout.js';
import {Row} from 'react-bootstrap';

function Profile() {

  return (
    <>
    <Layout>
      <Row>
      <ProfileLayout/>
      </Row>
    </Layout>
    </>
  );
}

export default Profile;
