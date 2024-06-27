"use client";

import { useSession } from "next-auth/react";
import Form from "./Form";

const NewTweetForm = () => {
  const sess = useSession();

  if (sess.status !== "authenticated") return null;

  return <Form />;
};

export default NewTweetForm;
