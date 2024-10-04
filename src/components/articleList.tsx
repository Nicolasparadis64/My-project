import * as React from 'react';
import { useState } from 'react';
import { Article, deleteArticle } from '@/services/articleServices';
import { Button } from '@/components/ui';
import { DataTable } from './table/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { ModifySheet } from '@/modals/modifySheet';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ArticleListProps {
  articles: Article[];
  onArticleDeleted: (id: string) => void;
  onArticleModified: (id: string) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, onArticleDeleted, onArticleModified }) => {
  const handleDelete = async (id: string) => {
    try {
      await deleteArticle(id);
      onArticleDeleted(id);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const handleModify = async (id: string) => {
    onArticleModified(id);
  };

  const handleModifyComplete = (id: string) => {
    setIsDialogOpen(false);
    onArticleModified(id);
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const columns: ColumnDef<Article>[] = [
    {
      accessorKey: 'title',
      header: 'Titre',
    },
    {
      accessorKey: 'content',
      header: 'Contenu',
      cell: ({ row }) => <div>{row.original.content.substring(0, 50)}...</div>,
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div>
          <Button onClick={() => handleDelete(row.original._id)}>Supprimer</Button>
          <Button onClick={() => {
            setSelectedArticle(row.original);
            setIsDialogOpen(true);
          }}>Modifier</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <DataTable columns={columns} data={articles}/>
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
