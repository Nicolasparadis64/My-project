import ArticleCard from '@/components/card/ArticleCard';
import { Article, deleteArticle } from '@/services/articleServices';
import { ModifySheet } from '@/modals/modifySheet';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useState } from "react";

interface ArticleListProps {
  articles: Article[];
  onArticleDeleted: (id: string) => void;
  onArticleModified: (modifiedArticle: Article) => void;
  onModifyClick: (article: Article) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, onArticleDeleted, onModifyClick }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteArticle(id);
      onArticleDeleted(id);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const handleModifyComplete = (modifiedArticle: Article) => {
    setIsDialogOpen(false);
    onModifyClick(modifiedArticle);
  };

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {articles.map((article) => (
        <ArticleCard
          key={article._id}
          article={article}
          onModifyClick={() => onModifyClick(article)}  // Gestion de la modification d'article
          onDelete={() => handleDelete(article._id)}   // Gestion de la suppression d'article
        />
      ))}

      {selectedArticle && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <ModifySheet
              article={selectedArticle}
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              onArticleModified={handleModifyComplete}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ArticleList;
