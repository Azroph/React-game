import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Signup = () => {
  const navigate = useNavigate();

  // Schéma de validation avec Yup
  const validationSchema = Yup.object({
    firstName: Yup.string().required('Le prénom est requis'),
    lastName: Yup.string().required('Le nom est requis'),
    email: Yup.string().email('Email invalide').required('L\'email est requis'),
    username: Yup.string().required('Le nom d\'utilisateur est requis'),
    password: Yup.string().required('Le mot de passe est requis'),
  });

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Effectuer la requête d'inscription à l'API /register
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

      // Récupérer la réponse de l'API
      const data = await response.json();

      if (response.ok) {
        // Rediriger vers la page de connexion en cas de succès
        navigate('/login');
      } else {
        // Afficher les erreurs retournées par le serveur (ex: email déjà utilisé)
        alert(data.error || 'Une erreur est survenue lors de l\'inscription');
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
      alert('Erreur lors de l\'inscription. Veuillez réessayer.');
    } finally {
      setSubmitting(false); // Fin du chargement
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-lg">
        <Formik
          initialValues={{ firstName: '', lastName: '', email: '', username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <h2 className="text-3xl font-bold mb-6 text-center">Inscription</h2>
              <div className="mb-4">
                <Field
                  type="text"
                  name="firstName"
                  placeholder="Prénom"
                  className="input input-bordered w-full"
                />
                <ErrorMessage name="firstName" component="div" className="text-red-600" />
              </div>
              <div className="mb-4">
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Nom"
                  className="input input-bordered w-full"
                />
                <ErrorMessage name="lastName" component="div" className="text-red-600" />
              </div>
              <div className="mb-4">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
                />
                <ErrorMessage name="email" component="div" className="text-red-600" />
              </div>
              <div className="mb-4">
                <Field
                  type="text"
                  name="username"
                  placeholder="Nom d'utilisateur"
                  className="input input-bordered w-full"
                />
                <ErrorMessage name="username" component="div" className="text-red-600" />
              </div>
              <div className="mb-4">
                <Field
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  className="input input-bordered w-full"
                />
                <ErrorMessage name="password" component="div" className="text-red-600" />
              </div>
              <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Inscription en cours...' : 'S\'inscrire'}
              </button>
            </Form>
          )}
        </Formik>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-500 hover:underline">Connexion</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;