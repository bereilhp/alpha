"use client";

import { useState, useEffect } from "react";
import styles from "./voiceChat.module.css";

export default function VoiceChat() {
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");

  const handleStartRecognition = () => {
    if (
      !("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    ) {
      console.error("Speech Recognition API is not supported in this browser.");
      return;
    }

    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.onresult = (event) =>
      setTranscript(event.results[0][0].transcript);
    recognition.start();
  };

  const fetchLLMResponse = async () => {
    const res = await fetch("/api/ask-llm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: transcript }),
    });
    const data = await res.json();
    setResponse(data.answer);
  };

  useEffect(() => {
    if (response) {
      const utterance = new SpeechSynthesisUtterance(response);
      speechSynthesis.speak(utterance);
    }
  }, [response]);

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleStartRecognition}>
        Speak
      </button>
      <p className={styles.transcript}>Transcript: {transcript}</p>
      <button className={styles.button} onClick={fetchLLMResponse}>
        Get Response
      </button>
      <p className={styles.response}>Response: {response}</p>
    </div>
  );
}
