import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import { load_model } from "./model";
import { GraphModel } from "@tensorflow/tfjs";
import "./App.css";

function App() {
  const [inputTxt, setInputTxt] = useState("");
  const [model, setModel] = useState<GraphModel | null>(null);
  const [prediction, setPrediction] = useState<number | null>(null);
  useEffect(() => {
    load_model().then((model) => setModel(model));
  }, []);

  // Initial test
  // if (model) {
  //   const input = tf.tensor1d([1200]).reshape([-1, 1]);
  //   const output = (model.predict(input) as tf.Tensor).dataSync();
  //   const prediction = output[0];
  //   console.log({ prediction });
  // }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputTxt(e.target.value);
  }

  function handleClick(value: number) {
    if (!model) return;
    const input = tf.tensor1d([value]).reshape([-1, 1]);
    const output = (model.predict(input) as tf.Tensor).dataSync();
    setPrediction(output[0]);
  }

  const value = parseFloat(inputTxt);
  const disabled = isNaN(value);
  1200;
  return (
    <>
      <h1>House Price Prediction</h1>
      <label htmlFor="area">House Size (sq.ft)</label>
      <input type="number" id="area" value={inputTxt} onChange={handleChange} />
      <button onClick={() => handleClick(value)} disabled={disabled}>
        Predict
      </button>
      <div>Predicted Price: {prediction} USD</div>
    </>
  );
}

export default App;
