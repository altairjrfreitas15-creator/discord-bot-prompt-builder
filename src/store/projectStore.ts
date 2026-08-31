import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { BotProject, BotConfiguration } from '@/types'
import { v4 as uuidv4 } from 'uuid'

interface ProjectStore {
  projects: BotProject[]
  currentProject: BotProject | null
  createProject: (name: string) => BotProject
  loadProject: (id: string) => void
  updateProject: (updates: Partial<BotProject>) => void
  deleteProject: (id: string) => void
  duplicateProject: (id: string) => BotProject
  listProjects: () => BotProject[]
  saveProject: () => void
}

const createDefaultConfig = (): BotConfiguration => ({
  products: [],
  categories: [],
  cart: {
    enabled: true,
    maxItems: 100,
    taxPercentage: 0,
  },
  coupons: [],
  payments: {
    provider: 'stripe',
    enabled: false,
    methods: [],
  },
  orders: {
    statuses: [
      { id: '1', name: 'Aguardando pagamento', color: '#EAB308', emoji: '🟡', description: '' },
      { id: '2', name: 'Pagamento processando', color: '#3B82F6', emoji: '🔵', description: '' },
      { id: '3', name: 'Pago', color: '#10B981', emoji: '🟢', description: '' },
      { id: '4', name: 'Processando entrega', color: '#A855F7', emoji: '🟣', description: '' },
      { id: '5', name: 'Entregue', color: '#22C55E', emoji: '✅', description: '' },
      { id: '6', name: 'Cancelado', color: '#EF4444', emoji: '🔴', description: '' },
      { id: '7', name: 'Reembolsado', color: '#000000', emoji: '⚫', description: '' },
    ],
    notificationChannel: '',
    logChannel: '',
  },
  inventory: {
    trackingEnabled: true,
    lowStockAlertThreshold: 5,
    logChannel: '',
  },
  tickets: {
    enabled: false,
    categories: [],
    supportRoles: [],
    logChannel: '',
    closeMessage: 'Ticket fechado.',
  },
  admin: {
    adminRoles: [],
    supportRoles: [],
    logChannels: {},
  },
  logs: {
    enabled: true,
    channels: {
      sales: '',
      payments: '',
      inventory: '',
      admin: '',
      tickets: '',
      errors: '',
    },
  },
  appearance: {
    botName: 'Bot Store',
    primaryColor: '#0ea5e9',
    secondaryColor: '#475569',
    theme: 'dark',
    embedStyle: 'detailed',
    customEmojis: {},
    welcomeMessage: 'Bem-vindo à nossa loja!',
  },
  database: {
    type: 'sqlite',
    tables: [
      'users',
      'products',
      'categories',
      'orders',
      'order_items',
      'payments',
      'inventory',
      'coupons',
      'tickets',
      'ticket_messages',
      'logs',
      'settings',
    ],
  },
  customCommands: [],
})

export const useProjectStore = create<ProjectStore>()(persist(
  (set, get) => ({
    projects: [],
    currentProject: null,

    createProject: (name: string) => {
      const newProject: BotProject = {
        id: uuidv4(),
        name,
        botName: 'MyBot',
        storeName: name,
        description: '',
        language: 'pt-BR',
        currency: 'BRL',
        serverType: 'store',
        createdAt: new Date(),
        updatedAt: new Date(),
        version: '1.0.0',
        status: 'draft',
        config: createDefaultConfig(),
      }

      set((state) => ({
        projects: [...state.projects, newProject],
        currentProject: newProject,
      }))

      return newProject
    },

    loadProject: (id: string) => {
      const project = get().projects.find((p) => p.id === id)
      if (project) {
        set({ currentProject: project })
      }
    },

    updateProject: (updates: Partial<BotProject>) => {
      const { currentProject } = get()
      if (!currentProject) return

      const updated = {
        ...currentProject,
        ...updates,
        updatedAt: new Date(),
      }

      set((state) => ({
        projects: state.projects.map((p) => (p.id === currentProject.id ? updated : p)),
        currentProject: updated,
      }))
    },

    deleteProject: (id: string) => {
      set((state) => ({
        projects: state.projects.filter((p) => p.id !== id),
        currentProject: state.currentProject?.id === id ? null : state.currentProject,
      }))
    },

    duplicateProject: (id: string) => {
      const original = get().projects.find((p) => p.id === id)
      if (!original) throw new Error('Project not found')

      const duplicated: BotProject = {
        ...original,
        id: uuidv4(),
        name: `${original.name} (Cópia)`,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'draft',
      }

      set((state) => ({
        projects: [...state.projects, duplicated],
      }))

      return duplicated
    },

    listProjects: () => get().projects,

    saveProject: () => {
      const { currentProject } = get()
      if (currentProject) {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === currentProject.id ? { ...currentProject, updatedAt: new Date() } : p,
          ),
        }))
      }
    },
  }),
  {
    name: 'project-store',
  },
))
