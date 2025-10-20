import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import TaskForm from '../components/TaskForm' // Ajuste o caminho conforme necessário
import { useTaskForm } from '../hooks/useTaskForm'

// Tipando a função mockada corretamente
jest.mock('../hooks/useTaskForm', () => ({
  useTaskForm: jest.fn(),
}))

describe('<TaskForm />', () => {
  const mockHandleSubmit = jest.fn()
  const mockSetTitle = jest.fn()
  const mockSetDescription = jest.fn()

  // Tipo esperado para o retorno de useTaskForm
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
    // Resetar os mocks antes de cada teste
    mockHandleSubmit.mockReset()
    mockSetTitle.mockReset()
    mockSetDescription.mockReset()

    // Mock do hook useTaskForm
    ;(useTaskForm as jest.Mock).mockReturnValue(mockUseTaskFormReturnValue)
  })

  it('deve renderizar o título, descrição e o botão de envio', () => {
    render(<TaskForm />)

    // Verificar se os campos estão sendo renderizados corretamente
    expect(screen.getByLabelText(/título/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /criar tarefa/i })).toBeInTheDocument()
  })

  it('deve exibir mensagem de erro se o erro estiver presente', () => {
    useTaskForm.mockReturnValue({
      ...mockUseTaskFormReturnValue,
      error: 'Erro ao criar tarefa',
    })

    render(<TaskForm />)

    // Verificar se a mensagem de erro é exibida
    expect(screen.getByText('Erro ao criar tarefa')).toBeInTheDocument()
  })

  it('deve chamar setTitle e setDescription quando os valores forem alterados', () => {
    render(<TaskForm />)

    // Alterar o título e a descrição
    fireEvent.change(screen.getByLabelText(/título/i), { target: { value: 'Nova tarefa' } })
    fireEvent.change(screen.getByLabelText(/descrição/i), { target: { value: 'Descrição da tarefa' } })

    // Verificar se as funções setTitle e setDescription foram chamadas
    expect(mockSetTitle).toHaveBeenCalledWith('Nova tarefa')
    expect(mockSetDescription).toHaveBeenCalledWith('Descrição da tarefa')
  })
})
