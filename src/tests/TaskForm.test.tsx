import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import TaskForm from '../components/TaskForm'
import { useTaskForm } from '../hooks/useTaskForm'

jest.mock('../hooks/useTaskForm', () => ({
  useTaskForm: jest.fn(),
}))

describe('<TaskForm />', () => {
  const mockHandleSubmit = jest.fn()
  const mockSetTitle = jest.fn()
  const mockSetDescription = jest.fn()

  const mockUseTaskFormReturnValue = {
    title: '',
    description: '',
    setTitle: mockSetTitle,
    setDescription: mockSetDescription,
    loading: false,
    error: '',
    handleSubmit: mockHandleSubmit,
  }

  beforeEach(() => {
    mockHandleSubmit.mockReset()
    mockSetTitle.mockReset()
    mockSetDescription.mockReset()

    ;(useTaskForm as jest.Mock).mockReturnValue(mockUseTaskFormReturnValue)
  })

  it('deve renderizar o título, descrição e o botão de envio', () => {
    render(<TaskForm />)
    expect(screen.getByLabelText(/título/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /criar tarefa/i })).toBeInTheDocument()
  })

  it('deve chamar setTitle e setDescription quando os valores forem alterados', () => {
    render(<TaskForm />)

    fireEvent.change(screen.getByLabelText(/título/i), { target: { value: 'Nova tarefa' } })
    fireEvent.change(screen.getByLabelText(/descrição/i), { target: { value: 'Descrição da tarefa' } })

    expect(mockSetTitle).toHaveBeenCalledWith('Nova tarefa')
    expect(mockSetDescription).toHaveBeenCalledWith('Descrição da tarefa')
  })
})
