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

            if (responseData.token) {
                localStorage.setItem('token', responseData.token);
                localStorage.setItem('userId', responseData.userId);
                login();
                navigate('/game');
            }
        } catch (error) {
            console.error('Erreur de connexion détaillée:', error);
            setLoginError(error.message || 'Erreur lors de la connexion. Veuillez réessayer.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200 py-8">
            <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                                Connexion
                            </h2>

                            {loginError && (
                                <div className="p-3 mb-4 text-sm text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20 rounded-md">
                                    {loginError}
                                </div>
                            )}

                            <div>
                                <label htmlFor="email" className="text-left block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Email
                                </label>
                                <Field
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 
                                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                                             focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                                    placeholder="Entrez votre email"
                                />
                                <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600 dark:text-red-400" />
                            </div>

                            <div>
                                <label htmlFor="password" className="text-left block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Mot de passe
                                </label>
                                <Field
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 
                                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                                             focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                                    placeholder="Entrez votre mot de passe"
                                />
                                <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600 dark:text-red-400" />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
                                         text-white font-semibold rounded-md shadow-sm transition-colors duration-200
                                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                         disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
                            </button>
                        </Form>
                    )}
                </Formik>

                <div className="mt-6 text-center">
                    <Link 
                        to="/register" 
                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                        Pas encore de compte ? Inscrivez-vous
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;