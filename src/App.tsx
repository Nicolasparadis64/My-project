import React from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './services/AuthContext'; // Importer le AuthProvider
import RegisterPage from './pages/auth/RegisterPage';
import { loginUser } from './services/UserServices';

const App: React.FC = () => {
    const [loading, setLoading] = React.useState(true);
    const [isLogged, setIsLogged] = React.useState(false); // Ajoutez un état pour la connexion

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLogged(!!token); // Mettez à jour l'état en fonction du token
        setLoading(false); // Fin de chargement
    }, []);

    const handleLogin = async (email: string, password: string) => {
        setLoading(true);
        try {
            const data = await loginUser(email, password);
            if (data.token) {
                localStorage.setItem('token', data.token);
                setIsLogged(true); // Mettez à jour l'état de connexion
            }
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Supprimez le token
        setIsLogged(false); // Mettez à jour l'état pour refléter la déconnexion
    };

    if (loading) {
        return <div>Loading...</div>; // Affiche un indicateur de chargement
    }

    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {!isLogged ? (
                        <>
                            <Route path="/" element={<Navigate to="/login" />} />
                            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                            <Route path="/register" element={<RegisterPage />} />
                        </>
                    ) : (
                        <>
                            <Route path="/" element={<HomePage onLogout={handleLogout} />} />
                            <Route path="/login" element={<Navigate to="/" />} />
                        </>
                    )}
                    <Route path="*" element={<div>Page non trouvée</div>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
