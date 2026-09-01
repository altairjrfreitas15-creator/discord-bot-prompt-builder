import { create } from 'zustand'

interface KeyboardStore {
  registerShortcut: (key: string, ctrl: boolean, callback: () => void) => void
  shortcuts: Map<string, () => void>
}

const createShortcutKey = (key: string, ctrl: boolean): string => {
  return `${ctrl ? 'ctrl+' : ''}${key.toLowerCase()}`
}

export const useKeyboardStore = create<KeyboardStore>((set, get) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = createShortcutKey(e.key, e.ctrlKey || e.metaKey)
      const callback = get().shortcuts.get(key)
      if (callback) {
        e.preventDefault()
        callback()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return {
    shortcuts: new Map(),
    registerShortcut: (key: string, ctrl: boolean, callback: () => void) => {
      const shortcutKey = createShortcutKey(key, ctrl)
      set((state) => {
        const newShortcuts = new Map(state.shortcuts)
        newShortcuts.set(shortcutKey, callback)
        return { shortcuts: newShortcuts }
      })
    },
  }
})

import React from 'react'
