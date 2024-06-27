import { useSession } from "next-auth/react";
import Button from "../Button";
import ProfileImage from "../ProfileImage";
import {
  type FormEvent,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { updateAreaTextSize } from "../functions/updateTextArea.function";
import { api } from "~/trpc/react";

const Form = () => {
  const sess = useSession();
  const [input, setInput] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    if (textArea) updateAreaTextSize(textArea);
    textAreaRef.current = textArea;
  }, []);
  useLayoutEffect(() => {
    updateAreaTextSize(textAreaRef.current);
  }, [input]);

  const createTweetApi = api.post.create.useMutation({
    onSuccess: (newTweet) => {
      console.log(newTweet);
      setInput("");
    },
  });

  const handleSumbit = async (e: FormEvent) => {
    e.preventDefault();
    await createTweetApi.mutateAsync({ content: input });
  };

  if (sess.status !== "authenticated") return;

  return (
    <form
      onSubmit={handleSumbit}
      className="flex flex-col gap-2 border-b px-4 py-2"
    >
      <div className="flex gap-4">
        <ProfileImage src={sess.data.user.image!} />
        <textarea
          ref={inputRef}
          style={{ height: 0 }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Hôm nay của em thế nào ?"
          className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none"
        />
      </div>
      <Button className="self-end">Swift</Button>
    </form>
  );
};

export default Form;
