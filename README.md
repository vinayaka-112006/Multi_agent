# 🔎 Multi-Agent AI Research System

An AI-powered **Deep Research System** that uses multiple specialized AI agents to automatically research a topic, search the web, extract relevant information, generate a structured report, and review the final output.

The system is built using **LangChain, Large Language Models (LLMs), Tavily Search, and FastAPI + React**. Instead of relying on a single AI prompt, the application uses a **multi-agent pipeline** where each agent is responsible for a specific stage of the research process.

---

## 🚀 Overview

Researching a topic manually usually requires:

- Searching multiple websites
- Opening and reading articles
- Collecting relevant information
- Organizing the information
- Writing a report
- Reviewing the report for missing or incorrect information

This project automates that workflow using a **Multi-Agent AI architecture**.

### Research Pipeline

```text
                    User Research Topic
                            │
                            ▼
                  ┌───────────────────┐
                  │   Research Agent  │
                  │   Topic Analysis  │
                  └─────────┬─────────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │   Search Agent    │
                  │   Tavily Search   │
                  └─────────┬─────────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │   Reader Agent    │
                  │ Web Content       │
                  │ Extraction        │
                  └─────────┬─────────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │   Writer Agent    │
                  │ Report Generation │
                  └─────────┬─────────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │   Critic Agent    │
                  │ Review & Improve  │
                  └─────────┬─────────┘
                            │
                            ▼
                    Final Research Report
