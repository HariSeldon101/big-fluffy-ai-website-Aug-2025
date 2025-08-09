'use client'

import { useState, useEffect, useCallback } from 'react'
import { Responsive, WidthProvider, Layout, Layouts } from 'react-grid-layout'
import { Settings, Eye, EyeOff, RotateCcw, Save } from 'lucide-react'
import ProjectOverviewPanel from './panels/ProjectOverviewPanel'
import QuickActionsPanel from './panels/QuickActionsPanel'
import RecentActivityPanel from './panels/RecentActivityPanel'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

interface PanelConfig {
  id: string
  component: React.ComponentType<any>
  title: string
  visible: boolean
  minW?: number
  minH?: number
  maxW?: number
  maxH?: number
}

interface DashboardLayout extends Layouts {
  lg: Layout[]
  md: Layout[]
  sm: Layout[]
  xs: Layout[]
}

const defaultLayouts: DashboardLayout = {
  lg: [
    { i: 'project-overview', x: 0, y: 0, w: 2, h: 3, minW: 2, minH: 2 },
    { i: 'quick-actions', x: 2, y: 0, w: 1, h: 3, minW: 1, minH: 2 },
    { i: 'recent-activity', x: 0, y: 3, w: 3, h: 4, minW: 2, minH: 3 },
  ],
  md: [
    { i: 'project-overview', x: 0, y: 0, w: 2, h: 3, minW: 2, minH: 2 },
    { i: 'quick-actions', x: 2, y: 0, w: 1, h: 3, minW: 1, minH: 2 },
    { i: 'recent-activity', x: 0, y: 3, w: 3, h: 4, minW: 2, minH: 3 },
  ],
  sm: [
    { i: 'project-overview', x: 0, y: 0, w: 2, h: 3, minW: 1, minH: 2 },
    { i: 'quick-actions', x: 0, y: 3, w: 2, h: 3, minW: 1, minH: 2 },
    { i: 'recent-activity', x: 0, y: 6, w: 2, h: 4, minW: 1, minH: 3 },
  ],
  xs: [
    { i: 'project-overview', x: 0, y: 0, w: 1, h: 3, minW: 1, minH: 2 },
    { i: 'quick-actions', x: 0, y: 3, w: 1, h: 3, minW: 1, minH: 2 },
    { i: 'recent-activity', x: 0, y: 6, w: 1, h: 4, minW: 1, minH: 3 },
  ]
}

const panelConfigs: PanelConfig[] = [
  {
    id: 'project-overview',
    component: ProjectOverviewPanel,
    title: 'Project Overview',
    visible: true,
    minW: 2,
    minH: 2
  },
  {
    id: 'quick-actions',
    component: QuickActionsPanel,
    title: 'Quick Actions',
    visible: true,
    minW: 1,
    minH: 2
  },
  {
    id: 'recent-activity',
    component: RecentActivityPanel,
    title: 'Recent Activity',
    visible: true,
    minW: 2,
    minH: 3
  }
]

export default function DraggableDashboard() {
  const [layouts, setLayouts] = useState<DashboardLayout>(defaultLayouts)
  const [panelVisibility, setPanelVisibility] = useState<Record<string, boolean>>(
    Object.fromEntries(panelConfigs.map(panel => [panel.id, panel.visible]))
  )
  const [maximizedPanel, setMaximizedPanel] = useState<string | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Load saved layouts and visibility from localStorage
    const savedLayouts = localStorage.getItem('dashboard-layouts')
    const savedVisibility = localStorage.getItem('panel-visibility')
    
    if (savedLayouts) {
      try {
        setLayouts(JSON.parse(savedLayouts))
      } catch (e) {
        console.error('Error loading saved layouts:', e)
      }
    }
    
    if (savedVisibility) {
      try {
        setPanelVisibility(JSON.parse(savedVisibility))
      } catch (e) {
        console.error('Error loading saved visibility:', e)
      }
    }
  }, [])

  const handleLayoutChange = useCallback((layout: Layout[], allLayouts: Layouts) => {
    // Ensure all panel IDs maintain their layout positions even when hidden
    const updatedLayouts: DashboardLayout = {
      lg: allLayouts.lg || [],
      md: allLayouts.md || [],
      sm: allLayouts.sm || [],
      xs: allLayouts.xs || []
    }
    
    Object.keys(updatedLayouts).forEach(breakpoint => {
      const breakpointLayouts = updatedLayouts[breakpoint as keyof DashboardLayout]
      
      // Add missing panels back to their default positions if they don't exist
      panelConfigs.forEach(panelConfig => {
        const existsInLayout = breakpointLayouts.some(l => l.i === panelConfig.id)
        if (!existsInLayout) {
          const defaultLayout = defaultLayouts[breakpoint as keyof DashboardLayout]?.find(l => l.i === panelConfig.id)
          if (defaultLayout) {
            breakpointLayouts.push({ ...defaultLayout })
          }
        }
      })
    })
    
    setLayouts(updatedLayouts)
  }, [])

  const togglePanelVisibility = (panelId: string) => {
    setPanelVisibility(prev => {
      const updated = { ...prev, [panelId]: !prev[panelId] }
      localStorage.setItem('panel-visibility', JSON.stringify(updated))
      
      // If we're showing a panel that was hidden, ensure it has a proper layout position
      if (updated[panelId]) {
        const hasLayoutPosition = Object.keys(layouts).some(breakpoint => 
          layouts[breakpoint as keyof DashboardLayout].some(layout => layout.i === panelId)
        )
        
        if (!hasLayoutPosition) {
          // Restore the panel to its default position
          const defaultPanel = defaultLayouts.lg.find(layout => layout.i === panelId)
          if (defaultPanel) {
            setLayouts(prev => ({
              ...prev,
              lg: [...prev.lg.filter(layout => layout.i !== panelId), defaultPanel],
              md: [...prev.md.filter(layout => layout.i !== panelId), 
                   defaultLayouts.md.find(layout => layout.i === panelId) || defaultPanel],
              sm: [...prev.sm.filter(layout => layout.i !== panelId), 
                   defaultLayouts.sm.find(layout => layout.i === panelId) || defaultPanel],
              xs: [...prev.xs.filter(layout => layout.i !== panelId), 
                   defaultLayouts.xs.find(layout => layout.i === panelId) || defaultPanel]
            }))
          }
        }
      }
      
      return updated
    })
  }

  const handleMaximizePanel = (panelId: string) => {
    setMaximizedPanel(maximizedPanel === panelId ? null : panelId)
  }

  const handleClosePanel = (panelId: string) => {
    togglePanelVisibility(panelId)
  }

  const resetLayout = () => {
    setLayouts(defaultLayouts)
    setPanelVisibility(Object.fromEntries(panelConfigs.map(panel => [panel.id, panel.visible])))
    localStorage.removeItem('dashboard-layouts')
    localStorage.removeItem('panel-visibility')
  }

  const saveLayout = () => {
    // Ensure all panels have layout positions before saving
    const completeLayouts = { ...layouts }
    
    Object.keys(completeLayouts).forEach(breakpoint => {
      const breakpointLayouts = completeLayouts[breakpoint as keyof DashboardLayout]
      
      panelConfigs.forEach(panelConfig => {
        const existsInLayout = breakpointLayouts.some(l => l.i === panelConfig.id)
        if (!existsInLayout) {
          const defaultLayout = defaultLayouts[breakpoint as keyof DashboardLayout]?.find(l => l.i === panelConfig.id)
          if (defaultLayout) {
            breakpointLayouts.push({ ...defaultLayout })
          }
        }
      })
    })
    
    localStorage.setItem('dashboard-layouts', JSON.stringify(completeLayouts))
    localStorage.setItem('panel-visibility', JSON.stringify(panelVisibility))
    setLayouts(completeLayouts)
    setEditMode(false)
  }

  if (!mounted) {
    return <div className="animate-pulse bg-gray-800 rounded-lg h-96"></div>
  }

  const visiblePanels = panelConfigs.filter(panel => panelVisibility[panel.id])

  return (
    <div className="w-full">
      {/* Dashboard Controls */}
      <div className="flex items-center justify-between mb-6 p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-bold text-white">Dashboard</h2>
          <div className="flex items-center space-x-2">
            {editMode && (
              <span className="text-light-blue-400 text-sm animate-pulse">
                ✏️ Edit Mode - Drag panels to rearrange
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Panel Visibility Controls */}
          <div className="flex items-center space-x-1 mr-4">
            {panelConfigs.map(panel => (
              <button
                key={panel.id}
                onClick={() => togglePanelVisibility(panel.id)}
                className={`p-2 rounded transition-colors ${
                  panelVisibility[panel.id]
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-700 text-gray-400 hover:text-white'
                }`}
                title={`${panelVisibility[panel.id] ? 'Hide' : 'Show'} ${panel.title}`}
              >
                {panelVisibility[panel.id] ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setEditMode(!editMode)}
            className={`p-2 rounded transition-colors ${
              editMode
                ? 'bg-soft-pink-500 text-white'
                : 'bg-gray-700 text-gray-400 hover:text-white'
            }`}
            title="Toggle Edit Mode"
          >
            <Settings size={16} />
          </button>
          
          <button
            onClick={resetLayout}
            className="p-2 bg-gray-700 text-gray-400 hover:text-white rounded transition-colors"
            title="Reset Layout"
          >
            <RotateCcw size={16} />
          </button>
          
          {editMode && (
            <button
              onClick={saveLayout}
              className="p-2 bg-green-600 text-white hover:bg-green-500 rounded transition-colors"
              title="Save Layout"
            >
              <Save size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Draggable Grid Layout */}
      <ResponsiveReactGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
        cols={{ lg: 3, md: 3, sm: 2, xs: 1 }}
        rowHeight={120}
        onLayoutChange={handleLayoutChange}
        isDraggable={editMode}
        isResizable={editMode}
        draggableHandle=".drag-handle"
        margin={[16, 16]}
        containerPadding={[0, 0]}
        compactType="vertical"
        preventCollision={false}
      >
        {visiblePanels.map(panelConfig => {
          const PanelComponent = panelConfig.component
          return (
            <div key={panelConfig.id} className={editMode ? 'border-2 border-dashed border-primary-500/50 rounded-lg' : ''}>
              <PanelComponent
                onClose={() => handleClosePanel(panelConfig.id)}
                onMaximize={() => handleMaximizePanel(panelConfig.id)}
                onSettings={() => console.log(`Settings for ${panelConfig.title}`)}
                isMaximized={maximizedPanel === panelConfig.id}
              />
            </div>
          )
        })}
      </ResponsiveReactGridLayout>

      {/* Help Text */}
      {editMode && (
        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <h3 className="text-blue-400 font-semibold mb-2">📝 Edit Mode Active</h3>
          <ul className="text-blue-300 text-sm space-y-1">
            <li>• Drag panels by their title bar to rearrange</li>
            <li>• Resize panels by dragging the bottom-right corner</li>
            <li>• Use the eye icons to show/hide panels</li>
            <li>• Click the save button to persist your changes</li>
          </ul>
        </div>
      )}

      {/* Maximized Panel Overlay */}
      {maximizedPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="w-full h-full max-w-6xl">
            {(() => {
              const panelConfig = panelConfigs.find(p => p.id === maximizedPanel)
              if (!panelConfig) return null
              const PanelComponent = panelConfig.component
              return (
                <PanelComponent
                  onClose={() => handleClosePanel(maximizedPanel)}
                  onMaximize={() => handleMaximizePanel(maximizedPanel)}
                  onSettings={() => console.log(`Settings for ${panelConfig.title}`)}
                  isMaximized={true}
                />
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )
}