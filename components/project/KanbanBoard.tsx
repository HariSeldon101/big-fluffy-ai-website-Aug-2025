'use client'

import { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Plus, MoreHorizontal, Calendar, User } from 'lucide-react'

interface Task {
  id: string
  title: string
  description?: string
  assignee?: string
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
  labels?: string[]
}

interface Column {
  id: string
  title: string
  tasks: Task[]
  color: string
}

interface KanbanBoardProps {
  projectId: string
}

function SortableTask({ task }: { task: Task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const priorityColors = {
    low: 'border-l-green-500',
    medium: 'border-l-light-blue-500',
    high: 'border-l-red-500',
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-gray-800 border border-gray-700 ${priorityColors[task.priority]} border-l-4 rounded-lg p-4 mb-3 cursor-pointer hover:bg-gray-750 transition-colors ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-white text-sm">{task.title}</h4>
        <button className="text-gray-400 hover:text-white">
          <MoreHorizontal size={16} />
        </button>
      </div>
      
      {task.description && (
        <p className="text-gray-400 text-xs mb-3 line-clamp-2">
          {task.description}
        </p>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {task.assignee && (
            <div className="flex items-center text-xs text-gray-400">
              <User size={12} className="mr-1" />
              {task.assignee}
            </div>
          )}
        </div>
        
        {task.dueDate && (
          <div className="flex items-center text-xs text-gray-400">
            <Calendar size={12} className="mr-1" />
            {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )}
      </div>
      
      {task.labels && task.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {task.labels.map((label) => (
            <span
              key={label}
              className="px-2 py-1 text-xs bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded shadow-sm"
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function KanbanColumn({ 
  column, 
  tasks 
}: { 
  column: Column
  tasks: Task[]
}) {
  return (
    <div className="bg-gray-900 rounded-lg p-4 w-80 flex-shrink-0">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full ${column.color} mr-2`}></div>
          <h3 className="font-semibold text-white">{column.title}</h3>
          <span className="ml-2 px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded">
            {tasks.length}
          </span>
        </div>
        <button className="text-gray-400 hover:text-white">
          <Plus size={18} />
        </button>
      </div>
      
      <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2 min-h-[200px]">
          {tasks.map((task) => (
            <SortableTask key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
      
      <button className="w-full mt-4 py-2 text-gray-400 hover:text-white border-2 border-dashed border-gray-600 hover:border-gray-500 rounded-lg transition-colors">
        + Add Task
      </button>
    </div>
  )
}

export default function KanbanBoard({ projectId }: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'backlog',
      title: 'Backlog',
      color: 'bg-gray-500',
      tasks: [
        {
          id: '1',
          title: 'Define project requirements',
          description: 'Gather and document all functional and non-functional requirements',
          assignee: 'John Doe',
          priority: 'high',
          dueDate: '2024-01-15',
          labels: ['planning', 'requirements']
        },
        {
          id: '2',
          title: 'Set up development environment',
          description: 'Configure development tools and environments',
          assignee: 'Jane Smith',
          priority: 'medium',
          dueDate: '2024-01-20',
          labels: ['setup']
        }
      ]
    },
    {
      id: 'todo',
      title: 'To Do',
      color: 'bg-blue-500',
      tasks: [
        {
          id: '3',
          title: 'Create database schema',
          description: 'Design and implement the database structure',
          assignee: 'Mike Johnson',
          priority: 'high',
          dueDate: '2024-01-25',
          labels: ['database']
        }
      ]
    },
    {
      id: 'progress',
      title: 'In Progress',
      color: 'bg-light-blue-500',
      tasks: [
        {
          id: '4',
          title: 'Implement authentication',
          description: 'Build user authentication and authorization system',
          assignee: 'Sarah Wilson',
          priority: 'high',
          dueDate: '2024-02-01',
          labels: ['auth', 'security']
        }
      ]
    },
    {
      id: 'review',
      title: 'Review',
      color: 'bg-purple-500',
      tasks: []
    },
    {
      id: 'done',
      title: 'Done',
      color: 'bg-green-500',
      tasks: [
        {
          id: '5',
          title: 'Initial project setup',
          description: 'Created repository and basic project structure',
          assignee: 'Team Lead',
          priority: 'low',
          labels: ['setup', 'completed']
        }
      ]
    }
  ])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function findContainer(id: string) {
    if (columns.some(col => col.id === id)) {
      return id
    }

    return columns.find(col => 
      col.tasks.some(task => task.id === id)
    )?.id
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!over) {
      setActiveId(null)
      return
    }

    const activeId = active.id as string
    const overId = over.id as string

    const activeContainer = findContainer(activeId)
    const overContainer = findContainer(overId)

    if (!activeContainer || !overContainer) {
      setActiveId(null)
      return
    }

    if (activeContainer !== overContainer) {
      setColumns((prev) => {
        const activeColumn = prev.find(col => col.id === activeContainer)!
        const overColumn = prev.find(col => col.id === overContainer)!
        
        const activeTask = activeColumn.tasks.find(task => task.id === activeId)!
        
        return prev.map(col => {
          if (col.id === activeContainer) {
            return {
              ...col,
              tasks: col.tasks.filter(task => task.id !== activeId)
            }
          } else if (col.id === overContainer) {
            return {
              ...col,
              tasks: [...col.tasks, activeTask]
            }
          }
          return col
        })
      })
    }

    setActiveId(null)
  }

  const activeTask = activeId ? 
    columns.flatMap(col => col.tasks).find(task => task.id === activeId) : null

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Kanban Board</h2>
        <button className="bg-gradient-to-br from-primary-500 to-primary-600 text-white px-4 py-2 rounded-lg hover:from-primary-400 hover:to-primary-500 transition-all shadow-lg">
          + Add Column
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex space-x-6 overflow-x-auto pb-4">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={column.tasks}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <div className="bg-gray-800 border border-gray-700 border-l-4 border-l-light-blue-500 rounded-lg p-4 cursor-pointer rotate-3 opacity-90">
              <h4 className="font-medium text-white text-sm">{activeTask.title}</h4>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}