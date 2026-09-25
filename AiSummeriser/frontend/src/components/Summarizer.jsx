import { useState } from "react";
import axios from "axios"

function Summarizer() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // summerier function

  const textSummerizer = async () => {
    setLoading(true);
    try {

      // const response = await axios.post("http://localhost:3000/api/ai/summerizer" ,text , {withCredentials : true});
      // const data = response.data
      // console.log("data" , data);

      const response = await fetch("http://localhost:3000/api/ai/summerizer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
        }),
      });

      const data = await response.json();
      console.log("data", data);

      setResult(data?.summmrizeRespn)

    } catch (error) {
      console.log("Error:-", error.message);

    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>AI Text Summarizer</h1>

      <textarea rows={10} cols={80}
        placeholder="Paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div>
        <button onClick={textSummerizer} disabled={loading}>
          {loading ? "Summerizing...." : "Summarize"}
        </button>
      </div>

      <h2>Summary</h2>

      <pre>{result}</pre>
    </div>
  );
}

export default Summarizer;