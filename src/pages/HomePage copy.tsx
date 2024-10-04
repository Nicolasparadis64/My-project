import React, { useState, useEffect } from 'react';
import ArticleList from '@/components/articleList';
import { fetchArticles, Article } from '@/services/articleServices';
import coverImage from '@/assets/cover.jpg';
import { CardWithForm } from '@/modals/createCard';
import { ModifySheet } from '@/modals/modifySheet';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import NavBar from '@/components/navBar';

interface HomePageProps {
  onLogout: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onLogout }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModifySheetOpen, setIsModifySheetOpen] = useState(false);
  const [articleToModify, setArticleToModify] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true); // État de chargement

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true); // Début du chargement
        const data = await fetchArticles();
        setArticles(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };
    loadArticles();
  }, []);

  const handleArticleAdded = (newArticle: Article) => {
    setArticles((prevArticles) => [...prevArticles, newArticle]);
    setIsDialogOpen(false); // Fermer la modal après l'ajout
  };

  const handleArticleDeleted = (id: string) => {
    setArticles((prevArticles) => prevArticles.filter((article) => article._id !== id));
  };

  const handleArticleModified = (modifiedArticle: Article) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) => (article._id === modifiedArticle._id ? modifiedArticle : article))
    );
  };

  const handleModifyClick = (article: Article) => {
    setArticleToModify(article);
    setIsModifySheetOpen(true);
  };

  return (
    <div className="w-screen h-screen">
      {/* NavBar with higher z-index */}
      <div className='z-50 relative mr-10 '>
      <NavBar onLogout={onLogout} />

      </div>
      
      {/* Background image */}
      <img
        src={coverImage}
        alt="background"
        className="absolute inset-0 object-cover w-full h-full z-0"
      />
      
      {/* Overlay */}
      <div className='absolute inset-0 w-full h-full bg-black bg-opacity-20 z-10'></div>
      
      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full min-h-screen">
        <div className='flex flex-col items-center justify-center gap-6 h-3/4 w-3/4 bg-zinc-800 p-6 rounded-xl shadow-lg'>
          <div className='w-full h-full flex justify-start flex-col'>
            <div className='flex flex-row items-start justify-between w-full h-auto mt-4'>
              <h1 className="text-4xl font-bold text-white">Gestion des Articles de Blog</h1>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setIsDialogOpen(true)}>Ajoutez un article</Button>
                </DialogTrigger>
                <DialogContent>
                  <CardWithForm onArticleAdded={handleArticleAdded} />
                </DialogContent>
              </Dialog>
            </div>

            <div className='flex flex-col justify-center'>
              {loading ? (
                <div className="text-white">Chargement des articles...</div>
              ) : (
                <div className="w-full h-full bg-opacity-80 rounded-lg shadow-lg mt-6">
                  <ArticleList
                    articles={articles}
                    onArticleDeleted={handleArticleDeleted}
                    onModifyClick={handleModifyClick}
                  />
                  {articleToModify && (
                    <ModifySheet
                      article={articleToModify}
                      isOpen={isModifySheetOpen}
                      onClose={() => setIsModifySheetOpen(false)}
                      onArticleModified={handleArticleModified}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
