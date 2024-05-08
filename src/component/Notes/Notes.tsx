import React from "react";
import s from "./Notes.module.scss";
import { EditorTiptap } from "../shared/ui/EditorTiptap/EditorTiptap";
import { Card } from "antd";

type NotesProps = {};

export const Notes: React.FC<NotesProps> = (props: NotesProps) => {
  return (
    <div className={s.editorDescription}>
      <Card
        style={{
          maxHeight: "calc(100vh - 170px)",
          overflow: "auto",
        }}
        title="Hотатки"
      >
        <EditorTiptap onDataSave={(data: any) => {}} />
      </Card>
    </div>
  );
};
