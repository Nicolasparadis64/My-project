import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { updateArticle, Article } from '@/services/articleServices';

interface ModifySheetProps {
  article: Article;
  isOpen: boolean;
  onClose: () => void;
  onArticleModified: (id: string) => void;
}

export function ModifySheet({ article, isOpen, onClose, onArticleModified }: ModifySheetProps) {
  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);

  useEffect(() => {
    setTitle(article.title);
    setContent(article.content);
  }, [article]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateArticle(article._id, { title, content });
      onArticleModified(article._id);
      onClose();
    } catch (error) {
      console.error('Erreur lors de la modification de l\'article:', error);
      // Ajoutez ici une notification à l'utilisateur
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Modifier l'article</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="content">Contenu</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
            />
          </div>
          <SheetFooter>
            <Button type="submit">Enregistrer les modifications</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}