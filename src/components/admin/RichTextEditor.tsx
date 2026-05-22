"use client";

import { useEffect, useRef, useState } from "react";
import { sanitizeRichText } from "@/lib/rich-text";

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  minHeight?: number;
};

const toolbarGroups = [
  [
    { label: "B", command: "bold" },
    { label: "I", command: "italic" },
    { label: "U", command: "underline" },
  ],
  [
    { label: "H2", command: "formatBlock", value: "h2" },
    { label: "H3", command: "formatBlock", value: "h3" },
    { label: "P", command: "formatBlock", value: "p" },
  ],
  [
    { label: "• List", command: "insertUnorderedList" },
    { label: "1. List", command: "insertOrderedList" },
  ],
  [
    { label: "Left", command: "justifyLeft" },
    { label: "Center", command: "justifyCenter" },
    { label: "Right", command: "justifyRight" },
  ],
  [
    { label: "Undo", command: "undo" },
    { label: "Redo", command: "redo" },
  ],
];

export default function RichTextEditor({ value, onChange, minHeight = 220 }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const safeValue = sanitizeRichText(value);
    if (editor.innerHTML !== safeValue) {
      editor.innerHTML = safeValue;
    }
  }, [value]);

  const emitChange = () => {
    const editor = editorRef.current;
    if (!editor) return;
    onChange(sanitizeRichText(editor.innerHTML));
  };

  const runCommand = (command: string, commandValue?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, commandValue);
    emitChange();
  };

  const addLink = () => {
    const url = window.prompt("Paste URL");
    if (!url) return;
    runCommand("createLink", url);
  };

  return (
    <div className={`overflow-hidden rounded-[18px] border bg-white transition-colors ${focused ? "border-[#FD853A]" : "border-[#E4E7EC]"}`}>
      <div className="flex flex-wrap gap-1 border-b border-[#E4E7EC] bg-[#F9FAFB] p-2">
        {toolbarGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mr-1 flex flex-wrap gap-1 border-r border-[#E4E7EC] pr-2 last:border-r-0">
            {group.map((item) => (
              <button
                key={`${item.command}-${item.label}`}
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => runCommand(item.command, "value" in item ? item.value : undefined)}
                className="rounded-full px-3 py-1.5 text-xs font-bold text-[#344054] transition-colors hover:bg-[#FD853A] hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </div>
        ))}
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={addLink}
          className="rounded-full px-3 py-1.5 text-xs font-bold text-[#344054] transition-colors hover:bg-[#FD853A] hover:text-white"
        >
          Link
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="rich-text-content w-full overflow-y-auto px-4 py-3 text-base leading-relaxed text-[#171717] outline-none"
        style={{ minHeight }}
        onInput={emitChange}
        onBlur={() => {
          setFocused(false);
          emitChange();
        }}
        onFocus={() => setFocused(true)}
      />
    </div>
  );
}
