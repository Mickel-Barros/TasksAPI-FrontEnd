import React, { useEffect, useState } from 'react'
import { getTasks, deleteTask, toggleComplete, TaskDTO } from '../api'
import TaskItem from './TaskItem'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

export default function TaskList(){
  const [tasks, setTasks] = useState<TaskDTO[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = async ()=>{
    setLoading(true); setError(null)
    try{
      const res = await getTasks()
      let data = res.data
      const order = JSON.parse(localStorage.getItem('todo_order' ) || '[]') as number[]
      if(order && order.length){
        data = data.slice().sort((a,b)=>{
          const ia = order.indexOf(a.id), ib = order.indexOf(b.id)
          if(ia === -1 && ib === -1) return 0
          if(ia === -1) return 1
          if(ib === -1) return -1
          return ia - ib
        })
      }
      setTasks(data)
    }catch(e){
      setError('Erro ao carregar tarefas')
    }finally{ setLoading(false) }
  }

  useEffect(()=>{ load(); const h=()=>load(); window.addEventListener('todo:created', h); return ()=>window.removeEventListener('todo:created', h) }, [])

  const onDelete = async (id:number)=>{
    if(!confirm('Deletar tarefa?')) return
    await deleteTask(id)
    setTasks(prev=>prev.filter(t=>t.id!==id))
    saveOrder(tasks.filter(t=>t.id!==id).map(t=>t.id))
  }

  const onToggle = async (id:number, completed:boolean)=>{
    await toggleComplete(id, completed)
    setTasks(prev=>prev.map(t=> t.id===id ? {...t, completed } : t))
  }

  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = (event:any)=>{
    const { active, over } = event
    if(!over) return
    if(active.id !== over.id){
      setTasks(prev=>{
        const oldIndex = prev.findIndex(i=>i.id === active.id)
        const newIndex = prev.findIndex(i=>i.id === over.id)
        const newArr = arrayMove(prev, oldIndex, newIndex)
        saveOrder(newArr.map(t=>t.id))
        return newArr
      })
    }
  }

  const saveOrder = (order:number[])=>{
    try{ localStorage.setItem('todo_order', JSON.stringify(order)) }catch(e){}
  }

  if(loading) return <div>Carregando...</div>
  if(error) return <div className="text-red-600">{error}</div>

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={tasks.map(t=>t.id)} strategy={verticalListSortingStrategy}>
        <ul className="space-y-4">
          {tasks.map(t => (
            <li key={t.id}>
              <TaskItem task={t} onDelete={onDelete} onToggle={onToggle} />
            </li>
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  )
}
