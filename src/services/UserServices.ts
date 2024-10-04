const API_URL = 'http://localhost:5000/api';

// Interface pour un utilisateur
export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    token: string;
}

// Fonction pour enregistrer un nouvel utilisateur
// export const registerUser = async ({userData: User}): Promise<User> => {
//     try {
//         const response = await fetch(`${API_URL}/register`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({userData}), // Convertir les données en JSON
//         });

//         // Vérifier si la réponse est correcte
//         if (!response.ok) {
//             const errorData = await response.json(); // Récupérer le corps de la réponse si l'appel échoue
//             throw new Error(errorData.message || 'Erreur lors de l\'enregistrement');
//         }

//         return await response.json(); // Retourner les données de la réponse
//     } catch (error) {
//         // Gérer les erreurs
//         console.error('Erreur lors de l\'enregistrement:', error);
//         throw error instanceof Error ? error.message : 'Erreur inconnue'; 
//     }
// }

// Fonction pour connecter un utilisateur
export const loginUser = async (email: string, password: string): Promise<{ token: string; }> => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        // Vérifier si la réponse est correcte
        if (!response.ok) {
            const errorData = await response.json(); // Récupérer le corps de la réponse si l'appel échoue
            throw new Error(errorData.message || 'Erreur lors de la connexion de l\'utilisateur');
        }

        const data = await response.json(); // Convertir la réponse en JSON

        // Vérifier si le token est présent dans la réponse
        if (data.token) {
            localStorage.setItem('token', data.token); // Stocker le token
            return data; // Retourner les données (vous pouvez inclure d'autres infos si nécessaire)
        } else {
            throw new Error('Erreur lors de la connexion de l\'utilisateur');
        }
    } catch (error) {
        // Gérer les erreurs
        console.error('Erreur lors de la connexion:', error);
        throw error instanceof Error ? error.message : 'Erreur inconnue'; 
    }
}

export const fetchUsers = async () => {
    try {
        const response = await fetch(`${API_URL}/users`);
        return response.json();
    } catch (error) {
        throw error instanceof Error ? error.message : 'Erreur inconnue';
    }
}