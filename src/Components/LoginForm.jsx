import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Schéma de validation avec Yup
  const validationSchema = Yup.object({
    email: Yup.string().email('Email invalide').required('Email requis'),
    password: Yup.string().required('Mot de passe requis')
  });

  // Gestion de la soumission du formulaire
  const handleSubmit = (values) => {
    login();  // Appelle la fonction login
    navigate('/dashboard');
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
              {() => (
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
                    <Field
                      type="password"
                      name="password"
                      placeholder="mot de passe"
                      className="input input-bordered"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                    <label className="label">
                      <Link to="/register" className="label-text-alt link link-hover">Pas de compte ? S'inscrire</Link>
                    </label>
                  </div>
                  <div className="form-control mt-6">
                    <button className="btn btn-primary" type="submit">Connexion</button>
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
