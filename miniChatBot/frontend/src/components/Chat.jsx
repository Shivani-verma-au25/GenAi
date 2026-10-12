import { useState } from "react";

function Chatbot() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error ,setError] = useState("");

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        setError(""); // Clear previous error   
        const userMessage = {
            role: "user",
            content: input,
        };

        const updatedMessages = [...messages, userMessage];

        setMessages(updatedMessages);
        setInput("");

        try {
            setLoading(true);

            const response = await fetch("http://localhost:3000/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: updatedMessages,
                }),
            });

            const data = await response.json();

            if (!response) {
                throw new Error(data.message || "Failed to get AI response");
            }

            console.log("AI Response:", data.result);

            const aiMessage = {
                role: "assistant",
                content: data.result,
            };

            setMessages([...updatedMessages, aiMessage]);
        } catch (error) {
            console.error("Chat error:", error);
            setError(error.message || "An error occurred while sending the message.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Mini AI Chatbot</h1>

            <div>
                {messages.map((message, index) => (
                    <p key={index}>
                        <strong>{message.role === "user" ? "You" : "AI"}:</strong>{" "}
                        {message.content}
                         
                    </p>
                   
                ))}
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>

            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown ={(e) =>{
                    if(e.key === "Enter"){
                        sendMessage();
                    }
                }}
                placeholder="Type your message..."
            />

            <button disabled={loading} onClick={sendMessage}>
                {loading ? "Thinking..." : "Send"}
            </button>
        </div>
    );
}

export default Chatbot;