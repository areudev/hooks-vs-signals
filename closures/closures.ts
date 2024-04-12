import { Component } from './main'
let hooks: unknown[] = []
let idx = 0
export function useState<T>(initialState: T): [T, (newState: T) => void] {
	let state = (hooks[idx] as T) || initialState
	const _idx = idx
	const setState = (newState: T) => {
		hooks[_idx] = newState
	}
	idx++
	return [state, setState]
}

export function useEffect(fn: () => void, deps: unknown[]) {
	const oldDeps = hooks[idx] as unknown[]
	let hasChanged = true

	if (hasChanged) fn()
	hooks[idx] = deps
	idx++
}

export function render(component: typeof Component) {
	idx = 0
	const instance = component()

	instance.render()
	return instance
}
