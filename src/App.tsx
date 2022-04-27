import React, { useState } from "react";
import axios from "axios";

export default function App(): JSX.Element {
  interface entry {
    entry_id: number;
    title_text: string;
    summary_text: string;
    time: string;
  }
  const [pastes, setPastes] = useState<entry[]>([]);
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");

  function handleSubmit() {
    console.log("would send text");
    //gather detail of new entry
    const newEntry = {
      title: title,
      summary: summary,
    };
    //send an HTTP post request to our API server with new entry
    const url = "http://localhost:4000/pastes";
    axios
      .post(url, newEntry)
      .then(function (response) {
        console.log("axios got the response: ", response);
      })
      .catch(function (error) {
        console.log("axios got error:", error);
      });
  }

  function handleAllSubmits() {
    //axios.get will make a fetch to the given url + make a get http request
    axios
      .get("http://localhost:4000/pastes")
      .then((response) => {
        console.log("getting all entries: ", response.data);
        const receivedPastes = response.data;
        console.log(receivedPastes);
        setPastes(receivedPastes);
      })
      .catch((err) => console.error("error when getting entries", err));
  }

  return (
    <div className="App">
      <h1>Pastebin App</h1>
      <input
        placeholder="new paste"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <input
        placeholder="new summary"
        value={summary}
        onChange={(event) => setSummary(event.target.value)}
      />
      <hr />

      <button onClick={handleSubmit}>Submit text</button>
      <button onClick={handleAllSubmits}>View list of all submits</button>

      {pastes.map((item) => (
        <li key={item.entry_id}>
          {item.title_text}
          <br /> {item.summary_text}
          <hr />
        </li>
      ))}
    </div>
  );
}
