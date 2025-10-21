# 🖼️ Tasks Frontend — React + TypeScript + Tailwind CSS

Uma interface de usuário moderna e responsiva para gerenciamento de tarefas, construída com **React**, **TypeScript** e **Tailwind CSS**, consumindo a API de backend Tasks API. Projetada com foco em usabilidade, performance e boas práticas de desenvolvimento frontend.

> 🚀 Interface intuitiva, com design limpo.  
> Totalmente integrada com a API backend para criar, listar, atualizar e deletar tarefas.

---

## ⚙️ Tech Stack

- **Framework:** React (com Vite)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Requisições HTTP:** Axios
- **Roteamento:** React Router
- **Testes:** Jest + React Testing Library
- **Containerização:** Docker + Docker Compose
- **Gerenciamento de ambiente:** dotenv
---

## 🧩 Arquitetura e Organização

```bash
src/
 ├── main.tsx                # Ponto de entrada do React
 ├── App.tsx                 # Configuração de rotas e layout principal
 ├── components/             # Componentes reutilizáveis
 │    ├── TaskItem.tsx 
 │    ├── TaskCard.tsx
 │    ├── TaskForm.tsx
 │    └── ErrorBoundary.tsx
 ├── hooks/                  # Hooks personalizados
 │    └── useTasks.ts
 ├── services/               # Integração com API
 │    └── api.ts
 ├── styles/                 # Configurações Tailwind e estilos globais
 ├── tests/                  # Testes unitários e de integração
 └── types/                  # Definições de tipos TypeScript
```

---

## 🧱 Funcionalidades

| Funcionalidade | Descrição |
|----------------|------------|
| **Listagem de Tarefas** | Exibe tarefas` |
| **Criação de Tarefas** | Formulário para criar tarefas com título e descrição(mínimo 5 caracteres) |
| **Edição de Tarefas** | Atualiza status de conclusão |
| **Exclusão de Tarefas** | Soft delete via API |
| **Responsividade** | Interface adaptável para mobile e desktop |

---

## 🧰 Como Rodar (via Docker)

1. Copie `.env.example` → `.env`  
2. Suba os containers:
   ```bash
   docker compose up --build
   ```
3. Acesse a aplicação em  
   👉 http://localhost:3000  

---

## ⚙️ Ambiente Local (sem Docker)

```bash
npm install
cp .env.example .env
npm run dev
```

Acesse em:  
👉 http://localhost:3000

---

## 🧪 Testes Automatizados

Rodar testes:
```bash
npx jest
```

### Estrutura de Testes
- **Unitários:** Testam componentes e hooks com React Testing Library.
- **Integração:** Testam fluxos de UI e chamadas à API com mocks.
- **Cobertura:** `npx jest --coverage`

---

## 🔒 Boas Práticas e Segurança

| Recurso | Descrição |
|----------|------------|
| **Tipagem Forte** | TypeScript para garantir tipos seguros em props e estados |
| **Validação de Inputs** | Validações no frontend complementam as do backend |
| **Código Limpo** | ESLint + Prettier para consistência de estilo |

---

## 🧩 Scripts Disponíveis

| Comando | Ação |
|----------|------|
| `npm run dev` | Modo desenvolvimento com hot reload |
| `npm run build` | Compila para produção (pasta `/dist`) |
| `npm start` | Executa build em produção |
| `npx jest` | Roda testes Jest |
| `npm run lint` | Lint do projeto (ESLint + Prettier) |
| `npm run storybook` | Inicia Storybook (opcional) |

---

## 🧩 Estrutura de Dados (TypeScript Types)

```typescript
interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
```

---

## 🌐 Storybook (opcional)

Visualização de componentes isolados:  
👉 **`/storybook`**

Gerado com **Storybook** para desenvolvimento e documentação de componentes.

---

## 📚 Referências

- [React Docs](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs/)
- [React Query Docs](https://tanstack.com/query/)
- [React Router Docs](https://reactrouter.com/)
- [Vite Docs](https://vitejs.dev/)
- [Storybook Docs](https://storybook.js.org/)

---