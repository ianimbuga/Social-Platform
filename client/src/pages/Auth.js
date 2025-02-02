import React from 'react';
import AuthForm from '../components/AuthForm';

const Login = () => <AuthForm type="login" />;
const Signup = () => <AuthForm type="signup" />;

export { Login, Signup };
