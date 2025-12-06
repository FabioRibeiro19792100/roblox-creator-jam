import { describe, it, expect } from 'vitest'
import { resolvePageFromHash } from './App'

describe('resolvePageFromHash', () => {
  it('mapeia âncoras da biblioteca para a página de biblioteca', () => {
    expect(resolvePageFromHash('#biblioteca')).toBe('biblioteca')
    expect(resolvePageFromHash('#biblioteca-tutorial')).toBe('biblioteca')
    expect(resolvePageFromHash('#biblioteca-mochilao')).toBe('biblioteca')
    expect(resolvePageFromHash('#/biblioteca-sobrevivencia')).toBe('biblioteca')
  })

  it('mantém comportamento para outras rotas conhecidas', () => {
    expect(resolvePageFromHash('#jam')).toBe('jam')
    expect(resolvePageFromHash('#/jam')).toBe('jam')
    expect(resolvePageFromHash('#expedicao-na-estrada')).toBe('expedicao-na-estrada')
    expect(resolvePageFromHash('#admin')).toBe('admin')
    expect(resolvePageFromHash('#desconhecido')).toBe('home')
  })
})
