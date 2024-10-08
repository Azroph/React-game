import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RegisterForm = () => {
  const navigate = useNavigate();

  // Schéma de validation avec Yup
  const validationSchema = Yup.object({
    firstName: Yup.string().required('Prénom requis'),
    lastName: Yup.string().required('Nom requis'),
    username: Yup.string().required('Nom d\'utilisateur requis'),
    email: Yup.string().email('Email invalide').required('Email requis'),
    password: Yup.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').required('Mot de passe requis'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
      .required('Confirmation du mot de passe requise'),
  });

  // Gestion de la soumission du formulaire
  const handleSubmit = (values) => {
    console.log('Utilisateur enregistré avec succès', values);
    navigate('/login');
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Inscription</h1>
          <p className="py-6">Créez votre compte pour commencer à utiliser notre application.</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Prénom</span>
                    </label>
                    <Field
                      type="text"
                      name="firstName"
                      placeholder="Prénom"
                      className="input input-bordered"
                    />
                    <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Nom</span>
                    </label>
                    <Field
                      type="text"
                      name="lastName"
                      placeholder="Nom"
                      className="input input-bordered"
                    />
                    <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Nom d'utilisateur</span>
                    </label>
                    <Field
                      type="text"
                      name="username"
                      placeholder="Nom d'utilisateur"
                      className="input input-bordered"
                    />
                    <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

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
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Confirmer le mot de passe</span>
                    </label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      placeholder="confirmer le mot de passe"
                      className="input input-bordered"
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                    <label className="label">
                      <Link to="/login" className="label-text-alt link link-hover">Déjà un compte ? Se connecter</Link>
                    </label>
                  </div>

                  <div className="form-control mt-6">
                    <button className="btn btn-primary" type="submit">S'inscrire</button>
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

export default RegisterForm;
