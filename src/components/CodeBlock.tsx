import React, { memo, useEffect, useRef } from "react";

interface CodeBlockProps {
  id: string;
  code: string;
  output: string;
  onCodeChange: (id: string, code: string) => void;
  onOutputChange: (id: string, output: string) => void;
}

interface Window {
  [key: string]: string | HTMLElement | boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  id,
  code,
  output,
  onCodeChange,
  onOutputChange,
}) => {
  const outputRef = useRef<HTMLDivElement | null>(null);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onCodeChange(id, e.target.value);
  };

  const isUrl = (str: string): boolean => {
    if (
      /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(
        str
      )
    ) {
      return true;
    }

    return false;
  };

  const handleRunClick = async () => {
    try {
      if (!code.trim()) {
        onOutputChange(id, "No code to run");
        return;
      }

      if (isUrl(code)) {
        onOutputChange(id, code);
        (window as unknown as Window)[id] = code;
        return;
      }

      let result;
      try {
        result = await eval(`(${code})`);
      } catch {
        try {
          result = await eval(code);
        } catch (e) {
          throw e;
        }
      }

      if (result instanceof HTMLElement) {
        const htmlContainer = document.createElement("div");
        htmlContainer.appendChild(result);

        (window as unknown as Window)[`is-${id}-reactive`] =
          htmlContainer.querySelector("button") !== null;
      }

      (window as unknown as Window)[id] = result;

      onOutputChange(id, result);
    } catch (e) {
      onOutputChange(id, (e as Error).message);
    }
  };

  useEffect(() => {
    if (outputRef.current && output && !isUrl(output)) {
      try {
        const storedElement = (window as unknown as Window)[id];
        const isStoredElementReactive = (window as unknown as Window)[
          `is-${id}-reactive`
        ];

        if (storedElement instanceof HTMLElement) {
          if (isStoredElementReactive) {
            // Use the stored DOM element with event listeners intact
            outputRef.current.innerHTML = "";
            outputRef.current.appendChild(storedElement);
            return;
          } else {
            outputRef.current.innerHTML = "";
            outputRef.current.appendChild(storedElement.cloneNode(true));
            return;
          }
        }
      } catch {}
    }
  }, [output, id]);

  return (
    <div className="flex w-full items-start gap-2">
      <div className="flex-1">
        <textarea
          className="h-32 w-full rounded border p-2 font-mono text-sm"
          value={code}
          onChange={handleTextareaChange}
        ></textarea>
        {String(output) && (
          <div className="rounded-md bg-neutral-200 p-4 whitespace-pre">
            {isUrl(output) ? (
              <a
                href={output}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                {output}
              </a>
            ) : (
              <div ref={outputRef}>
                {typeof output === "object" &&
                !Array.isArray(output) &&
                output !== null
                  ? JSON.stringify(output)
                  : Array.isArray(output)
                  ? `[${output}]`
                  : String(output)}
              </div>
            )}
          </div>
        )}
      </div>
      <button
        className="cursor-pointer rounded-md bg-neutral-600 px-4 py-2 text-white hover:bg-neutral-700"
        onClick={handleRunClick}
      >
        Run
      </button>
    </div>
  );
};

export default memo(CodeBlock);
