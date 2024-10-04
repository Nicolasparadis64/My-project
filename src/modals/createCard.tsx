import * as React from "react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { addArticle, Article } from '@/services/articleServices';

interface AddArticleProps {
    onArticleAdded: (article: Article) => void;
}

export function CardWithForm({ onArticleAdded }: AddArticleProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newArticle = await addArticle({ title, content });
      onArticleAdded(newArticle);
      setTitle('');
      setContent('');
      handleClose(); // Fermer la modal après l'ajout réussi
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'article:', error);
    }
  };

  return (


    <Card className="w-full ">
      <CardHeader>
        <CardTitle>Créer un article</CardTitle>
        <CardDescription>Ajoutez un nouvel article à votre blog.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                placeholder="Titre de l'article"
                className="bg-inherit"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="content">Contenu</Label>
              <textarea
                id="content"
                value={content}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                placeholder="Contenu de l'article"
                className="w-full p-2 border rounded"
              />
      <CardFooter className="flex justify-between">
        <Button variant="outline" type="button">Annuler</Button>
        <Button type="submit" onClick={handleSubmit}>Publier</Button>
      </CardFooter>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>

  )
}