import { useRef, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Checklist from "@editorjs/checklist";

export const EditorTiptap = ({ onDataSave }: any) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        placeholder: "Введіть текст вашої нотатки тут...",
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
          },
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: "unordered",
            },
          },
          checklist: {
            class: Checklist,
            inlineToolbar: true,
          },
          // Додайте інші інструменти за потреби
        },
        data: {},
        onChange: () => {
          editor
            .save()
            .then((outputData) => {
              if (onDataSave) {
                onDataSave(outputData);
              }
            })
            .catch((error) => {
              console.log("Saving failed: ", error);
            });
        },
      });

      editorRef.current = editor;
    }

    return () => {
      editorRef.current?.destroy();
      editorRef.current = null;
    };
  }, []);

  return <div id="editorjs"></div>;
};
