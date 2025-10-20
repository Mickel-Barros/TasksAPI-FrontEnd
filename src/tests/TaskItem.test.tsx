import React from 'react'  // Adicionando importação explícita do React
import { render, screen, fireEvent } from '@testing-library/react'
import TaskItem from '../components/TaskItem'
import { TaskDTO } from '../types/task'

const baseTask: TaskDTO = {
  id: 1,
  title: 'Estudar React',
  description: 'Estudar os hooks e o contexto.',
  completed: false,
  createdAt: '2021-10-01T12:00:00Z'
}

const completedTask: TaskDTO = {
  id: 2,
  title: 'Estudar Jest',
  description: 'Testar componentes em React.',
  completed: true,
  createdAt: '2021-10-02T12:00:00Z'
}

describe('<TaskItem />', () => {
  it('deve renderizar o título, descrição e data corretamente', () => {
    render(
      <TaskItem task={baseTask} onDelete={jest.fn()} onToggle={jest.fn()} />
    )
    expect(screen.getByText('Estudar React')).toBeInTheDocument()
    expect(screen.getByText('Estudar os hooks e o contexto.')).toBeInTheDocument()
    expect(screen.getByText(/Criada em:/)).toBeInTheDocument()
  })

  it('deve aplicar estilo de tarefa concluída quando completed=true', () => {
    render(
      <TaskItem task={completedTask} onDelete={jest.fn()} onToggle={jest.fn()} />
    )

    expect(screen.getByText('Estudar Jest')).toHaveClass('line-through text-gray-400')
  })


  it('deve chamar onDelete ao clicar no botão de excluir', () => {
    const handleDelete = jest.fn()

    render(
      <TaskItem task={baseTask} onDelete={handleDelete} onToggle={jest.fn()} />
    )

    const deleteButton = screen.getByRole('button', { name: /Excluir tarefa/i })

    fireEvent.click(deleteButton)

    expect(handleDelete).toHaveBeenCalledWith(1)
  })

  it('deve renderizar corretamente o drag handle', () => {
    render(
      <TaskItem task={baseTask} onDelete={jest.fn()} onToggle={jest.fn()} />
    )

    const dragHandle = screen.getByText('⋮⋮')
    expect(dragHandle).toBeInTheDocument()
  })
})
