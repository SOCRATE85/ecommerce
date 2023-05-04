import React, { useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import ReactDOM from "react-dom/client";

const App = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [run, setRun] = useState(true);

  const startService = async () => {
    ref.current = await (esbuild as any).startService({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
  };

  useEffect(() => {
    const abc  = async () => {
      await startService();
    }
    if (run) {
      abc();
    }
    return () => setRun(false);
  }, [run]);

  const onClick = async () => {
    if (!ref.current) {
      return;
    }
    console.log(ref.current, input)
    const result = await ref.current.transform(input, {
      loader: "jsx",
      target: "es2015",
    });
    console.log('result: ', result);
    setCode(result.code);

    /**
     const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin()],
    });
    setCode(result.outputFiles[0].text);
     */
  };

  return (
    <div>
      <textarea
        cols={50}
        rows={10}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
