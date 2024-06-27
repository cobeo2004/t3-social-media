export const updateAreaTextSize = (textArea?: HTMLTextAreaElement | null) => {
  if (textArea === null || textArea === undefined) return;
  else {
    textArea.style.height = "0";
    textArea.style.height = `${textArea.scrollHeight}px`;
  }
};
