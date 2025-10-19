import React from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

export default function App(){
  return (
    <div className="container">
      <header className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">Gerenciador de Tarefas</h1>
          <p className="text-sm text-slate-500 mt-1">Organize suas tarefas de forma simples e eficiente</p>
        </div>
      </header>

      <main className="space-y-6">
        <section className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Nova Tarefa</h2>
          <TaskForm />
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-4">Suas Tarefas</h3>
          <TaskList />
        </section>
      </main>
    </div>
  )
}
