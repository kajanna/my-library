import React from 'react';

import Card from '../../shared/Card';
import Button from '../../shared/Button';
import InputElement from '../../shared/Form/InputElement';

function Login() {
    return (
        <Card title="login">
            <InputElement label="email"/>
            <InputElement label="password" errorInput="sfafsfs"/>
            <Button buttonText="login"/>
        </Card>
    );
}

export default Login;