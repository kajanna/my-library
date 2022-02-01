import React from 'react';

import Card from '../../shared/Card';
import Button from '../../shared/Button';
import InputElement from '../../shared/Form/InputElement';

function Register() {
    return (
        <Card title="register">
            <InputElement label="name"/>
            <InputElement label="email"/>
            <InputElement label="password" errorInput="sfafsfs"/>
            <Button buttonText="login"/>
        </Card>
    );
}

export default Register;