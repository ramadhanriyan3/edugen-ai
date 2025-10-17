# 🧠 EduGen AI - Smart Exam Generator

> **AI-powered collaborative exam generator** built with Next.js, MongoDB, and Meta Llama 3.3 — designed to help teachers effortlessly create, edit, and collaborate on exam materials in real-time.

---

## ✨ Key Features

- 🔥 **AI-Powered Generation** — Create high-quality exam questions aligned with _Bloom’s Taxonomy_ using `meta-llama/llama-3.3-70b-instruct`.
- 🧑‍🤝‍🧑 **Real-time Collaboration** — Multiple users can edit the same document simultaneously.
- 🔐 **Seamless Authentication** — Magic Link & Google Login powered by Auth.js.
- 💬 **Smart Suggestions** — AI can rewrite, summarize, or expand text directly inside the editor.
- 📄 **Export to Word** — Easily export generated questions to `.docx` format.
- 📡 **Live Notifications** — Receive real-time updates via **Server-Sent Events (SSE)**.
- ⚡ **Optimized for Performance** — Built with Edge Runtime for low latency.

---

## 🧩 Tech Stack

| Category             | Technology / Library                   |
| -------------------- | -------------------------------------- |
| **Framework**        | Next.js 14 (App Router, Edge Runtime)  |
| **Styling**          | Tailwind CSS, shadcn/ui                |
| **State Management** | Zustand                                |
| **Forms**            | React Hook Form + Zod                  |
| **Data Fetching**    | React Query                            |
| **Database**         | MongoDB Atlas + Prisma ORM             |
| **Auth**             | Auth.js (Magic Link + Google Provider) |
| **AI Engine**        | Meta Llama 3.3 70B (via Replicate API) |
| **Realtime**         | Server-Sent Events (SSE)               |
| **Deployment**       | Vercel (Frontend + Edge Functions)     |

---

## 🚀 Live Demo

🧠 Try EduGen AI now:  
👉 **[https://edugen-ai.vercel.app](https://edugen-ai.vercel.app)**

---

## 🛠️ Getting Started

### 1. Prerequisites

Ensure you have the following installed:

- Node.js **v18+**
- npm or yarn
- MongoDB Atlas account
- Google OAuth credentials
- Replicate API key (for Llama 3)

---

### 2. Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/edugen-ai.git
cd edugen-ai

# Install dependencies
npm install


```
