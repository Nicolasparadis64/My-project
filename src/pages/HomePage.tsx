import React, { useState, useEffect } from 'react';
import ArticleList from '@/components/articleList';
import { fetchArticles, Article } from '@/services/articleServices';
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
  const [loading, setLoading] = useState(true);

  // Charger les articles au montage du composant
  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const data = await fetchArticles();
        console.log(data); // Vérifie les données récupérées
        setArticles(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error);
      } finally {
        setLoading(false);
      }
    };
    loadArticles();
  }, []);

  // Ajouter un nouvel article
  const handleArticleAdded = (newArticle: Article) => {
    setArticles((prevArticles) => [...prevArticles, newArticle]);
    setIsDialogOpen(false); // Fermer le modal après ajout
  };

  // Supprimer un article
  const handleArticleDeleted = (id: string) => {
    setArticles((prevArticles) => prevArticles.filter((article) => article._id !== id));
  };

  // Modifier un article existant
  const handleArticleModified = (modifiedArticle: Article) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) => (article._id === modifiedArticle._id ? modifiedArticle : article))
    );
  };

  // Gérer la modification de l'article (ouverture du modal)
  const handleModifyClick = (article: Article) => {
    setArticleToModify(article);
    setIsModifySheetOpen(true);
  };

  return (
    <div className="w-full h-full bg-zinc-800">
      <div className="z-50 mr-10 flex justify-center items-center">
        <NavBar onLogout={onLogout} />
      </div>

      <div className="w-full h-full">
        <div className="flex flex-col items-center justify-center gap-6 h-full w-full bg-zinc-800 p-6 rounded-xl shadow-lg">
          <div className="w-full h-full flex justify-start flex-col">
            <div className="flex flex-row items-start justify-between w-full h-auto mt-4">
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

            <div className="flex flex-col justify-center">
              {loading ? (
                <div className="text-white">Chargement des articles...</div>
              ) : (
                <div className="w-full h-full bg-opacity-80 rounded-lg shadow-lg mt-6">
                  <ArticleList
                    articles={articles}
                    onArticleDeleted={handleArticleDeleted}
                    onArticleModified={handleArticleModified}
                    onModifyClick={handleModifyClick}  // On passe la fonction handleModifyClick ici
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
