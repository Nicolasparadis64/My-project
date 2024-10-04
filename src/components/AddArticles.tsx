import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { addArticle, Article } from '@/services/articleServices';

interface AddArticleProps {
  onArticleAdded: (article: Article) => void;
}

const AddArticle: React.FC<AddArticleProps> = ({ onArticleAdded }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newArticle = await addArticle({ title, content });
      onArticleAdded(newArticle);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'article:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        placeholder="Titre de l'article"
        className="bg-white"
      />
      <textarea
        value={content}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
        placeholder="Contenu de l'article"
        className="w-full p-2 border rounded"
      />
      <Button type="submit">Ajouter l'article</Button>
    </form>
  );
};

export default AddArticle;