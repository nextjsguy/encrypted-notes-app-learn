import { Content } from "@tiptap/react";

export type NoteProps = {
    id: string;
    title: string;
    content: Content;
    updatedAt: Date;
};