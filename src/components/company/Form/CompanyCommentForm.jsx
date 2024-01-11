import { useState } from "react";
import { Textarea } from "src/components/ui/textarea";
import { Button } from "src/components/ui/button";

export default function CompanyCommentForm({ placeholder, onSubmit }) {
  const [content, setContent] = useState("");

  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(content);
          setContent("");
        }}
        className="w-full flex flex-col items-start gap-3"
      >
        <Textarea
          placeholder={placeholder}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          value={content}
        />
        <Button>등록</Button>
      </form>
    </div>
  );
}
