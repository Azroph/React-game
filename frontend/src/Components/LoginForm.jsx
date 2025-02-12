import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginForm = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');

    const validationSchema = Yup.object({
        email: Yup.string().email('Email invalide').required('Email requis'),
        password: Yup.string().required('Mot de passe requis'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                }),
            });

            const responseData = await response.json();

            if (responseData.error) {
                throw new Error(responseData.error);
            }

            localStorage.setItem('token', responseData.token);
            if (responseData.userId) {
                localStorage.setItem('userId', responseData.userId);
            }

            login();
            navigate('/game');
        } catch (error) {
            console.error('Erreur de connexion détaillée:', error);
            setLoginError(error.message || 'Erreur lors de la connexion. Veuillez réessayer.');
        } finally {
            setSubmitting(false);
        }
        if (responseData.token) {
  localStorage.setItem('token', responseData.token);
  // Stocke aussi l'ID de l'utilisateur pour le WebSocket
  localStorage.setItem('userId', responseData.userId);
  login();
  navigate('/game'); // Redirige vers le lobby au lieu du dashboard
}
    };

    return (
        <div className="hero min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold dark:text-white">Connexion</h1>
                    <p className="py-6 dark:text-gray-300">Connectez-vous pour accéder à votre espace personnel.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-white dark:bg-gray-800">
                    <div className="card-body">
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text dark:text-gray-200">Email</span>
                                        </label>
                                        <Field
                                            type="email"
                                            name="email"
                                            placeholder="email"
                                            className="input input-bordered bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                        />
                                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text dark:text-gray-200">Mot de passe</span>
                                        </label>
                                        <Field
                                            type="password"
                                            name="password"
                                            placeholder="mot de passe"
                                            className="input input-bordered bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                        />
                                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    {loginError && <div className="text-red-500 text-sm mb-4">{loginError}</div>}
                                    <div className="form-control mt-6">
                                        <button 
                                            className="btn btn-primary dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white" 
                                            type="submit" 
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Connexion...' : 'Connexion'}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        <div className="mt-4 text-center">
                            <Link to="/register" className="text-blue-500 hover:underline dark:text-blue-400">
                                Pas encore de compte ? Inscrivez-vous
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;