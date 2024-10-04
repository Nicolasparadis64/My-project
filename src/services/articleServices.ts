const API_URL = 'http://localhost:5000/api';

// Define the type for an Article
export interface Article {
  _id: string;
  title: string;
  content: string;
}

// Function to get all articles
export const fetchArticles = async (): Promise<Article[]> => {
  const response = await fetch(`${API_URL}/articles`);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des articles');
  }
  return response.json();
};

// Function to add an article
export const addArticle = async (article: Omit<Article, '_id'>): Promise<Article> => {
  const response = await fetch(`${API_URL}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article),
  });
  if (!response.ok) {
    throw new Error('Erreur lors de l\'ajout de l\'article');
  }
  return response.json();
};

// Function to delete an article by id
export const deleteArticle = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/articles/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la suppression de l\'article');
  }
};

export const updateArticle = async (id: string, article: Omit<Article, '_id'>): Promise<Article> => {
  const response = await fetch(`${API_URL}/articles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article),
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la modification de l\'article');
  }
  return response.json();
};