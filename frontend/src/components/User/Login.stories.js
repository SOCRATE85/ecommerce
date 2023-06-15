import React from 'react';
import { withRouter } from 'storybook-addon-react-router-v6'
import Login from './Login';

const LoginStory = {
    title: "Login",
    component: Login,
    decorators: [withRouter],
    parameters: {
        reactRouter: {
            routePath: '/login'
        }
    }
};

export default LoginStory;

export const SignIn = (args) => <Login {...args}/> 