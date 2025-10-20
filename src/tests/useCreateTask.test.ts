import { renderHook, act } from '@testing-library/react';
import { useCreateTask } from '../hooks/useCreateTask';
import * as api from '../api';

jest.mock('../api', () => ({
  createTask: jest.fn(),
  getTasks: jest.fn(),
  deleteTask: jest.fn(),
  toggleComplete: jest.fn(),
}));

describe('useCreateTask', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve inicializar com estados padrão', () => {
    const { result } = renderHook(() => useCreateTask());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('deve criar uma tarefa com sucesso', async () => {
    (api.createTask as jest.Mock).mockResolvedValueOnce({});

    const { result } = renderHook(() => useCreateTask());

    const payload = { title: 'Nova tarefa', description: 'Descrição' };
    const dispatchSpy = jest.spyOn(window, 'dispatchEvent');

    await act(async () => {
      await result.current.handleCreateTask(payload);
    });

    expect(api.createTask).toHaveBeenCalledWith(payload);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(dispatchSpy).toHaveBeenCalledWith(expect.any(CustomEvent));
  });

  it('deve tratar erro na criação da tarefa', async () => {
    const mockError = new Error('Falha API');
    (api.createTask as jest.Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useCreateTask());
    const payload = { title: 'Falha' };

    await act(async () => {
      try {
        await result.current.handleCreateTask(payload);
      } catch (err) {
        expect(err).toEqual(mockError);
      }
    });

    expect(api.createTask).toHaveBeenCalledWith(payload);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Falha ao criar a tarefa');
  });
});

