import React from 'react';

import Card from '../../shared/Card';
import Button from '../../shared/Button';

function Login() {
    return (
        <Card title="login">
            <div>email</div>
            <div>password</div>
            <Button buttonText="login"/>
        </Card>
    );
}

export default Login;