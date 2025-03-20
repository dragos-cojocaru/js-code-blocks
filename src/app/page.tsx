"use client";

import CodeBlock from "@/components/CodeBlock";
import { useCallback, useState } from "react";

interface Block {
  code: string;
  output: string;
}

interface Blocks {
  [key: string]: Block;
}

export default function Home() {
  const [blocks, setBlocks] = useState<Blocks>({});

  const addNewBlock = () => {
    const newId = `A${Object.keys(blocks).length + 1}`;
    setBlocks((prev) => ({
      ...prev,
      [newId]: {
        code: "",
        output: "",
      },
    }));
  };

  const updateBlockCode = useCallback((id: string, code: string) => {
    setBlocks((prev: Blocks) => ({
      ...prev,
      [id]: {
        ...prev[id],
        code,
      },
    }));
  }, []);

  const updateBlockOutput = useCallback((id: string, output: string) => {
    setBlocks((prev: Blocks) => ({
      ...prev,
      [id]: {
        ...prev[id],
        output,
      },
    }));
  }, []);

  const blockIds = Object.keys(blocks);

  return (
    <div className="container mx-auto max-md:px-2">
      {blockIds.map((id) => (
        <div key={id}>
          <div>{id}</div>
          <CodeBlock
            id={id}
            code={blocks[id]?.code}
            output={blocks[id]?.output}
            onCodeChange={updateBlockCode}
            onOutputChange={updateBlockOutput}
          />
        </div>
      ))}
      <div className="mt-6">
        <button
          onClick={addNewBlock}
          className="cursor-pointer rounded-md bg-neutral-600 px-4 py-2 text-white hover:bg-neutral-700"
        >
          Add new block
        </button>
      </div>
    </div>
  );
}
