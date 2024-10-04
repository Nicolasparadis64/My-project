import React from 'react';
import { Article } from '@/services/articleServices';
import { Button } from '@/components/ui/button';
interface ArticleCardProps {
  article: Article;
  onModifyClick: (article: Article) => void;
  onDelete: (id: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onModifyClick, onDelete }) => {
  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden mb-4 p-4 max-w-sm mx-auto">
      <img className="w-full h-32 object-cover rounded-md mb-2" src={article.coverImage || 'https://via.placeholder.com/150'} alt={article.title} />
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-2">{article.title}</h2>
          <p className="text-gray-600 text-sm mb-4">{article.summary || 'Aperçu de l’article.'}</p>
          <p className="text-gray-800 text-sm">{article.content}</p> {/* Ajout du contenu ici */}

        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-400 text-xs">{new Date(article.createdAt).toLocaleDateString()}</p>
          <div className="flex gap-2">
            <Button
            variant={'outline'}
              onClick={() => onModifyClick(article)}
            >
              Modifier
            </Button>
            <Button
              onClick={() => onDelete(article._id)}
            >
              Supprimer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
