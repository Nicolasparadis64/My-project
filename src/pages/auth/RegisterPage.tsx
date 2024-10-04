// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// export default function registerPage() {
//   const [username, setUsername] =useState('')
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   // export default RegisterPage;
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:5000/api/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, email, password }),
//       });
//       const data = await response.json();
//       console.log(data);
//     } catch (error) {
//       console.error('Register error:', error);
//     }
//   }
//   return (
//     <form onSubmit={handleSubmit} className='w-full h-screen'>
//       <div className='flex items-center justify-center py-12'>
//         <div className='w-[350px]'>
//           <h1 className='text-3xl font-bold text-center mb-4'>Sign Up</h1>
//         </div>
//       </div>
//     </form>
//   );
// }

// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom'; // Correction de l'importation
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';


// interface RegisterPageProps {
//   onRegister: (username: string, email: string, password: string) => Promise<void>;
// }

// const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister }) => {

//   const navigate = useNavigate(); // Utilisation de useNavigate pour rediriger après l'inscription

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await onRegister(username, email, password);
//       navigate('/login'); // Redirection vers la page de connexion après l'inscription réussie
//     } catch (error) {
//       setError('Erreur lors de la création du compte');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="w-full h-screen">
//       <div className="flex items-center justify-center py-12">
//         <div className="w-[350px]">
//           <h1 className="text-3xl font-bold text-center mb-4">Sign Up</h1>
//           <p className="text-muted-foreground text-center mb-6">
//             Enter your information to create an account
//           </p>
//           {error && <p className="text-red-500 text-center">{error}</p>} {/* Affichage des erreurs */}
//           <div className="grid gap-4">
//             <div className="grid gap-2">
//               <Label htmlFor="username">Username</Label>
//               <Input
//                 id="username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder="Enter your username"
//                 required
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 required
//               />
//             </div>
//             <Button type="submit" className="w-full">
//               Create an account
//             </Button>
//             <Button variant="outline" className="w-full">
//               Sign up with GitHub
//             </Button>
//           </div>
//           <div className="mt-4 text-center text-sm">
//             Already have an account?{" "}
//             <Link to="/login" className="underline"> {/* Correction de href vers to */}
//               Sign in
//             </Link>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

import React, { useState } from 'react';
import {  Link, useNavigate } from 'react-router-dom'; // Utilisation de useNavigate pour redirection
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Gestion d'erreur
  const navigate = useNavigate(); // Utilisation de useNavigate pour redirection après inscription

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'inscription');
      }

      const data = await response.json();
      console.log(data);
      // Redirection après succès
      navigate('/login');
    } catch (error) {
      setError('Erreur lors de la création du compte');
      console.error('Register error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-full h-screen flex items-center justify-center'>
      <div className='w-[350px]'>
        <h1 className='text-3xl font-bold text-center mb-4'>Sign Up</h1>
        <p className='text-muted-foreground text-center mb-6'>
          Enter your information to create an account
        </p>
        {error && <p className="text-red-500 mb-4">{error}</p>} {/* Affichage des erreurs */}

        <div className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor="username">Username</Label>
            <Input required value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor="email">Email</Label>
            <Input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor="password">Password</Label>
            <Input
              required
              autoComplete="new-password" // AutoComplete pour les nouveaux mots de passe
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </div>
          <Button type="submit" className='w-full'>Register</Button>
        </div>
        
        <div className='mt-4 text-center text-sm'>
          <p>Already have an account? <Link to="/login" className='underline'>Sign in</Link></p>
        </div>
      </div>
    </form>
  );
}

{/* 
    <div>
      <form onSubmit={handleSubmit}>
        <input required value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" />
        <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
        <input required autoComplete='' value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </div> */}