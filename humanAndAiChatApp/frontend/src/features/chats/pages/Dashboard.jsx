import React from 'react'
import { useEffect } from 'react'
import { useState } from "react";
import {
    Plus,
    Search,
    MessageSquare,
    PanelLeftClose,
    PanelLeftOpen,
    Send,
    Paperclip,
    Sparkles,
    MoreHorizontal,
    ArrowDown,
    Menu,
} from "lucide-react";
import { useSelector } from 'react-redux';

const initialChats = [
    { id: 1, title: "Understanding React Hooks" },
    { id: 2, title: "Node.js Authentication" },
    { id: 3, title: "How does MongoDB work?" },
    { id: 4, title: "Building an AI chatbot" },
];

const Dashboard = () => {
    // const chat  = useChat();
    // const {auth} = useSelector(state => state.auth);
    // console.log("dashboard user",auth);


    // useEffect(() =>{
    // Chat.initialSocketConnection()
    // },[])


    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [message, setMessage] = useState("");
    const [activeChat, setActiveChat] = useState(null);
    const [chats, setChats] = useState(initialChats);
    const [messages, setMessages] = useState([]);

    const createNewChat = () => {
        setActiveChat(null);
        setMessages([]);
        setMessage("");
    };

    const selectChat = (chat) => {
        setActiveChat(chat.id);
        setMessages([
            {
                role: "user",
                content: chat.title,
            },
            {
                role: "assistant",
                content: "Hello! I'm here to help. What would you like to explore?",
            },
        ]);
    };

    const sendMessage = (e) => {
        e.preventDefault();

        if (!message.trim()) return;

        const currentMessage = message.trim();

        if (!activeChat) {
            const newChat = {
                id: Date.now(),
                title: currentMessage.slice(0, 35),
            };

            setChats((prev) => [newChat, ...prev]);
            setActiveChat(newChat.id);
        }

        setMessages((prev) => [
            ...prev,
            { role: "user", content: currentMessage },
        ]);

        setMessage("");

        // Connect your backend API here later.
    };

    return (
        <div className="flex h-screen bg-white text-neutral-900 overflow-hidden">

            {/* Sidebar */}
            <aside
                className={`${sidebarOpen ? "w-[270px]" : "w-0"
                    } hidden sm:flex flex-col border-r border-neutral-200 bg-[#fafafa] transition-all duration-300 overflow-hidden shrink-0`}
            >
                <div className="flex items-center justify-between px-5 h-[72px]">
                    <div className="flex items-center gap-2.5 font-semibold text-lg">
                        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                            <Sparkles size={18} className="text-white" />
                        </div>
                        <span>Inquire</span>
                    </div>

                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-2 rounded-lg hover:bg-neutral-200 text-neutral-500"
                    >
                        <PanelLeftClose size={18} />
                    </button>
                </div>

                <div className="px-4 space-y-2 mt-3">
                    <button
                        onClick={createNewChat}
                        className="w-full flex items-center gap-3 px-4 py-3 bg-black text-white rounded-xl text-sm font-medium hover:bg-neutral-800 transition"
                    >
                        <Plus size={18} />
                        New Thread
                    </button>

                    <button className="w-full flex items-center gap-3 px-4 py-3 text-neutral-600 hover:bg-neutral-200 rounded-xl text-sm transition">
                        <Search size={18} />
                        Search threads
                    </button>
                </div>

                <div className="px-5 mt-9 mb-3">
                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                        Your Library
                    </p>
                </div>

                <div className="flex-1 overflow-y-auto px-3 space-y-1">
                    {chats.map((chat) => (
                        <button
                            key={chat.id}
                            onClick={() => selectChat(chat)}
                            className={`w-full flex items-center gap-3 px-3 py-3 text-left rounded-lg text-sm transition ${activeChat === chat.id
                                ? "bg-neutral-200 text-black"
                                : "text-neutral-600 hover:bg-neutral-100"
                                }`}
                        >
                            <MessageSquare size={16} className="shrink-0" />
                            <span className="truncate">{chat.title}</span>
                        </button>
                    ))}
                </div>

                <div className="border-t border-neutral-200 p-4">
                    <button className="w-full flex items-center gap-3 p-2 hover:bg-neutral-200 rounded-xl text-sm">
                        <div className="w-9 h-9 bg-neutral-300 rounded-full flex items-center justify-center font-semibold">
                            S
                        </div>
                        <div className="text-left flex-1">
                            <p className="font-medium">My Account</p>
                            <p className="text-xs text-neutral-500">Free Plan</p>
                        </div>
                        <MoreHorizontal size={18} />
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0 flex flex-col relative">

                {/* Header */}
                <header className="h-[72px] border-b border-neutral-100 flex items-center justify-between px-5 sm:px-8 shrink-0">
                    <div className="flex items-center gap-3">
                        {!sidebarOpen && (
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="hidden sm:block p-2 hover:bg-neutral-100 rounded-lg"
                            >
                                <PanelLeftOpen size={19} />
                            </button>
                        )}

                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="sm:hidden p-2 hover:bg-neutral-100 rounded-lg"
                        >
                            <Menu size={20} />
                        </button>

                        <span className="font-medium text-sm">
                            {activeChat ? "Conversation" : "New Thread"}
                        </span>
                    </div>

                    <button className="text-sm px-4 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-100 transition">
                        Share
                    </button>
                </header>

                {/* Conversation */}
                <section className="flex-1 overflow-y-auto">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center px-5 pb-20">
                            <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center mb-6">
                                <Sparkles size={28} className="text-white" />
                            </div>

                            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center">
                                What are we exploring today?
                            </h1>

                            <p className="text-neutral-500 text-sm mt-4 text-center max-w-md">
                                Ask anything. Discover ideas, understand concepts,
                                and explore new possibilities.
                            </p>
                        </div>
                    ) : (
                        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10 space-y-10">
                            {messages.map((item, index) => (
                                <div
                                    key={index}
                                    className={`flex gap-4 ${item.role === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                        }`}
                                >
                                    {item.role === "assistant" && (
                                        <div className="w-9 h-9 shrink-0 rounded-xl bg-black flex items-center justify-center">
                                            <Sparkles size={17} className="text-white" />
                                        </div>
                                    )}

                                    <div
                                        className={`max-w-[85%] text-sm leading-7 ${item.role === "user"
                                            ? "bg-neutral-100 px-5 py-3 rounded-2xl"
                                            : "text-neutral-800 pt-1"
                                            }`}
                                    >
                                        {item.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Message Input */}
                <div className="w-full px-4 sm:px-8 pb-6 pt-3">
                    <form
                        onSubmit={sendMessage}
                        className="max-w-3xl mx-auto border border-neutral-300 rounded-2xl p-3 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] focus-within:border-neutral-500 transition"
                    >
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    sendMessage(e);
                                }
                            }}
                            placeholder="Ask anything..."
                            rows={2}
                            className="w-full resize-none outline-none text-sm px-2 py-2 placeholder:text-neutral-400"
                        />

                        <div className="flex items-center justify-between mt-2">
                            <button
                                type="button"
                                className="p-2 text-neutral-500 hover:bg-neutral-100 rounded-lg"
                            >
                                <Paperclip size={19} />
                            </button>

                            <button
                                type="submit"
                                disabled={!message.trim()}
                                className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
                            >
                                <Send size={17} />
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-[11px] text-neutral-400 mt-3">
                        AI can make mistakes. Verify important information.
                    </p>
                </div>
            </main>
        </div>
    );
}

export default Dashboard