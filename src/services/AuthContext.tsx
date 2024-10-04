import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token); // Met à jour l'état en fonction du token
        setLoading(false); // Fin de chargement
    }, []);

    const login = (username: string) => {
        setIsAuthenticated(true);
        // Enregistrez le token ou les données d'utilisateur si nécessaire
    };

    const logout = () => {
        localStorage.removeItem('token'); // Supprimez le token du stockage local
        setIsAuthenticated(false); // Mettez à jour l'état
    };

    if (loading) {
        return <div>Loading...</div>; // Affiche un indicateur de chargement
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
