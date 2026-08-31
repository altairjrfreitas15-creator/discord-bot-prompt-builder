export interface BotProject {
  id: string
  name: string
  botName: string
  storeName: string
  description: string
  language: 'pt-BR' | 'en-US' | 'es-ES' | 'fr-FR'
  currency: 'BRL' | 'USD' | 'EUR' | 'GBP'
  serverType: 'store' | 'marketplace' | 'community' | 'support' | 'game-store' | 'digital-products'
  createdAt: Date
  updatedAt: Date
  version: string
  status: 'draft' | 'published'
  config: BotConfiguration
}

export interface BotConfiguration {
  products: Product[]
  categories: Category[]
  cart: CartConfig
  coupons: Coupon[]
  payments: PaymentConfig
  orders: OrderConfig
  inventory: InventoryConfig
  tickets: TicketConfig
  admin: AdminConfig
  logs: LogConfig
  appearance: AppearanceConfig
  database: DatabaseConfig
  customCommands: CustomCommand[]
}

export interface Product {
  id: string
  name: string
  description: string
  category: string
  price: number
  image?: string
  stock: number
  quantity: number
  isDigital: boolean
  autoDelivery: boolean
  isActive: boolean
  deliveryMethod?: 'code' | 'key' | 'file' | 'link' | 'instructions' | 'manual'
  items?: string[]
}

export interface Category {
  id: string
  name: string
  emoji: string
  description: string
  image?: string
  order: number
  subcategories?: string[]
}

export interface CartConfig {
  enabled: boolean
  maxItems: number
  taxPercentage: number
}

export interface Coupon {
  id: string
  code: string
  type: 'percentage' | 'fixed'
  value: number
  expiryDate?: Date
  maxUses: number
  maxUsesPerUser: number
  applicableProducts?: string[]
  applicableCategories?: string[]
  isActive: boolean
}

export interface PaymentConfig {
  provider: 'stripe' | 'mercado-pago' | 'pix'
  webhookUrl?: string
  enabled: boolean
  methods: PaymentMethod[]
}

export interface PaymentMethod {
  id: string
  type: 'credit-card' | 'pix' | 'boleto' | 'transfer'
  enabled: boolean
  expiryTime?: number
}

export interface OrderConfig {
  statuses: OrderStatus[]
  notificationChannel?: string
  logChannel?: string
}

export interface OrderStatus {
  id: string
  name: string
  color: string
  emoji: string
  description: string
}

export interface InventoryConfig {
  trackingEnabled: boolean
  lowStockAlertThreshold: number
  logChannel?: string
}

export interface TicketConfig {
  enabled: boolean
  categories: TicketCategory[]
  supportRoles: string[]
  logChannel?: string
  closeMessage: string
}

export interface TicketCategory {
  id: string
  name: string
  emoji: string
  description: string
}

export interface AdminConfig {
  adminRoles: string[]
  supportRoles: string[]
  logChannels: {
    sales?: string
    payments?: string
    inventory?: string
    admin?: string
    tickets?: string
    errors?: string
  }
}

export interface LogConfig {
  enabled: boolean
  channels: {
    sales: string
    payments: string
    inventory: string
    admin: string
    tickets: string
    errors: string
  }
}

export interface AppearanceConfig {
  botName: string
  avatar?: string
  primaryColor: string
  secondaryColor: string
  theme: 'dark' | 'neon' | 'minimal' | 'gaming' | 'professional'
  embedStyle: 'compact' | 'detailed' | 'minimal'
  customEmojis: Record<string, string>
  welcomeMessage: string
}

export interface DatabaseConfig {
  type: 'sqlite' | 'postgresql' | 'mongodb'
  connectionString?: string
  tables: string[]
}

export interface CustomCommand {
  id: string
  name: string
  description: string
  permission: 'everyone' | 'members' | 'admin'
  response: string
  type: 'slash' | 'button' | 'menu' | 'modal'
  isActive: boolean
}

export interface GeneratedPrompt {
  id: string
  projectId: string
  content: string
  createdAt: Date
  updatedAt: Date
  version: number
}
