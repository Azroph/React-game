import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const validationSchema = Yup.object({
        firstName: Yup.string().required('Le prénom est requis'),
        lastName: Yup.string().required('Le nom est requis'),
        email: Yup.string().email('Email invalide').required('L\'email est requis'),
        username: Yup.string().required('Le nom d\'utilisateur est requis'),
        password: Yup.string().required('Le mot de passe est requis'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstname: values.firstName,
                    lastname: values.lastName,
                    email: values.email,
                    username: values.username,
                    password: values.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/login');
            } else {
                setError(data.error || 'Une erreur est survenue lors de l\'inscription');
            }
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
            setError('Erreur lors de l\'inscription. Veuillez réessayer.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200 py-8">
            <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <Formik
                    initialValues={{ firstName: '', lastName: '', email: '', username: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                                Inscription
                            </h2>
                            
                            <div>
                                <label htmlFor="firstName" className="text-left block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Prénom
                                </label>
                                <Field
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 
                                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                                             focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                                    placeholder="Entrez votre prénom"
                                />
                                <ErrorMessage name="firstName" component="div" className="mt-1 text-sm text-red-600 dark:text-red-400" />
                            </div>

                            <div>
                                <label htmlFor="lastName" className="text-left block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Nom
                                </label>
                                <Field
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 
                                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                                             focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                                    placeholder="Entrez votre nom"
                                />
                                <ErrorMessage name="lastName" component="div" className="mt-1 text-sm text-red-600 dark:text-red-400" />
                            </div>

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
                                <label htmlFor="username" className="text-left block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Nom d'utilisateur
                                </label>
                                <Field
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 
                                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                                             focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                                    placeholder="Choisissez un nom d'utilisateur"
                                />
                                <ErrorMessage name="username" component="div" className="mt-1 text-sm text-red-600 dark:text-red-400" />
                            </div>

                            <div>
                                <label htmlFor="password" className=" text-left block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Mot de passe
                                </label>
                                <Field
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 
                                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                                             focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                                    placeholder="Créez un mot de passe"
                                />
                                <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600 dark:text-red-400" />
                            </div>

                            {error && (
                                <div className="text-red-600 dark:text-red-400 text-sm text-center">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
                                         text-white font-semibold rounded-md shadow-sm transition-colors duration-200
                                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                         disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Inscription en cours...' : 'S\'inscrire'}
                            </button>
                        </Form>
                    )}
                </Formik>

                <div className="mt-6 text-center">
                    <Link 
                        to="/login" 
                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                        Déjà inscrit ? Connectez-vous
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;