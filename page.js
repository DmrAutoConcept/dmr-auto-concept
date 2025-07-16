'use client';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ budget: "", type: "", marque: "", usage: "" });
  const [submitted, setSubmitted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  const questions = [
    { key: "budget", text: "Quel est votre budget maximum ?" },
    { key: "type", text: "Quel type de véhicule cherchez-vous ?" },
    { key: "marque", text: "Avez-vous une ou plusieurs marques préférées ?" },
    { key: "usage", text: "Vous roulez principalement en ville, sur autoroute ou en mixte ?" },
  ];

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    speechSynthesis.speak(utterance);
  };

  const listen = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Assistant vocal non supporté sur ce navigateur.");
    const recognition = new SpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.start();

    recognition.onresult = (event) => {
      const response = event.results[0][0].transcript;
      const key = questions[questionIndex].key;
      setForm((prev) => ({ ...prev, [key]: response }));
      const nextIndex = questionIndex + 1;
      if (nextIndex < questions.length) {
        setQuestionIndex(nextIndex);
        setTimeout(() => {
          speak(questions[nextIndex].text);
          listen();
        }, 1000);
      } else {
        setStep(1);
      }
    };
  };

  const handleVoiceAssistant = () => {
    setStep(0);
    setQuestionIndex(0);
    speak(questions[0].text);
    listen();
  };

  const handleSubmit = () => {
    setSubmitted(true);
    console.log("Formulaire envoyé :", form);
    fetch("https://formsubmit.co/dmrautoconcept57@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="w-full flex justify-between items-center px-6 py-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="Logo DMR Auto Concept" width={60} height={60} />
          <span className="text-2xl font-bold">DMR Auto Concept</span>
        </div>
        <nav className="space-x-6 text-sm">
          <a href="#" className="hover:text-gray-300">Accueil</a>
          <a href="#" className="hover:text-gray-300">Véhicules</a>
          <a href="#" className="hover:text-gray-300">Assistant</a>
          <a href="#" className="hover:text-gray-300">Contact</a>
        </nav>
      </header>

      <main className="flex flex-col items-center p-6">
        <h1 className="text-4xl font-bold mt-8 mb-4">Trouvez votre véhicule idéal</h1>
        <p className="text-lg mb-6 text-center max-w-xl">Notre assistant intelligent vous aide à définir vos besoins pour que nous puissions vous proposer le véhicule parfait.</p>

        {!submitted && (
          <Button onClick={handleVoiceAssistant}>🎤 Lancer l'assistant vocal</Button>
        )}

        {step === 1 && !submitted && (
          <Card>
            <CardContent>
              {questions.map((q) => (
                <div key={q.key}>
                  <label className="block font-medium">{q.text}</label>
                  <input type="text" className="w-full p-2 border rounded bg-black text-white" value={form[q.key]} onChange={(e) => setForm({ ...form, [q.key]: e.target.value })} />
                </div>
              ))}
              <Button onClick={handleSubmit}>Envoyer</Button>
            </CardContent>
          </Card>
        )}

        {submitted && (
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-semibold">Merci ! 🙏</h2>
            <p>Nous vous recontacterons rapidement avec une proposition personnalisée.</p>
          </div>
        )}
      </main>

      <footer className="mt-12 p-6 bg-gray-900 w-full text-center text-sm text-gray-400">
        <p>📍 Valais, Suisse | 📞 078 962 39 35 | 📧 dmrautoconcept57@gmail.com</p>
        <p className="mt-2">© {new Date().getFullYear()} DMR Auto Concept. Tous droits réservés.</p>
      </footer>
    </div>
  );
}