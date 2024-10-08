import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const validationSchema = Yup.object({
    email: Yup.string().email('Email invalide').required('Email requis'),
    password: Yup.string().required('Mot de passe requis')
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log('Tentative de connexion avec:', values);
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password
        }),
      });

      console.log('Statut de la réponse:', response.status);
      const responseData = await response.json();
      console.log('Données de réponse:', responseData);

      if (responseData.error) {
        // Le serveur a renvoyé une erreur
        throw new Error(responseData.error);
      }

      if (!responseData.token) {
        throw new Error('Pas de token reçu du serveur');
      }

      localStorage.setItem('token', responseData.token);
      login();  // Met à jour le contexte d'authentification
      navigate('/dashboard');
    } catch (error) {
      console.error('Erreur de connexion', error);
      setLoginError(error.message || 'Erreur lors de la connexion. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Connexion</h1>
          <p className="py-6">Connectez-vous pour accéder à votre espace personnel.</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
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
                      <span className="label-text">Email</span>
                    </label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="email"
                      className="input input-bordered"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Mot de passe</span>
                    </label>
                    <div className="relative">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="mot de passe"
                        className="input input-bordered w-full pr-12"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 px-3 flex items-center"
                      >
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                      </button>
                    </div>
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                    <label className="label">
                      <Link to="/register" className="label-text-alt link link-hover">Pas de compte ? S'inscrire</Link>
                    </label>
                  </div>
                  {loginError && <div className="text-red-500 text-sm mb-4">{loginError}</div>}
                  <div className="form-control mt-6">
                    <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Connexion...' : 'Connexion'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;