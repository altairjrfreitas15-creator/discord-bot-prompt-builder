import React from 'react'
import { Card } from '@/components'
import { X, Plus } from 'lucide-react'
import Button from './Button'
import Input from './Input'
import { Product } from '@/types'

interface ProductBuilderProps {
  product: Partial<Product> | null
  onSave: (product: Product) => void
  onCancel: () => void
  isLoading?: boolean
}

const ProductBuilder: React.FC<ProductBuilderProps> = ({ product, onSave, onCancel, isLoading }) => {
  const [formData, setFormData] = React.useState<Partial<Product>>(product || {})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as any
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as any).checked : type === 'number' ? parseFloat(value) : value,
    }))
  }

  const handleSave = () => {
    onSave(formData as Product)
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-dark-50">{product ? 'Editar Produto' : 'Novo Produto'}</h3>
        <button onClick={onCancel} className="text-dark-400 hover:text-dark-50">
          <X size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Input label="Nome" name="name" value={formData.name || ''} onChange={handleChange} placeholder="Nome do produto" />
        <Input label="ID" name="id" value={formData.id || ''} onChange={handleChange} placeholder="ID único" disabled={!!product} />

        <Input label="Preço" name="price" type="number" value={formData.price || ''} onChange={handleChange} placeholder="0.00" />
        <Input label="Estoque" name="stock" type="number" value={formData.stock || 0} onChange={handleChange} placeholder="0" />

        <Input label="Categoria" name="category" value={formData.category || ''} onChange={handleChange} placeholder="Categoria" />
        <Input label="Imagem URL" name="image" value={formData.image || ''} onChange={handleChange} placeholder="https://..." />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-dark-300">Descrição</label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          placeholder="Descrição detalhada do produto..."
          className="input-base resize-none h-20"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="isDigital"
            checked={formData.isDigital || false}
            onChange={handleChange}
            className="w-4 h-4 rounded"
          />
          <span className="text-sm text-dark-300">Produto Digital</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="autoDelivery"
            checked={formData.autoDelivery || false}
            onChange={handleChange}
            className="w-4 h-4 rounded"
          />
          <span className="text-sm text-dark-300">Entrega Automática</span>
        </label>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} isLoading={isLoading}>
          <Plus size={20} />
          Salvar Produto
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </Card>
  )
}

export default ProductBuilder
