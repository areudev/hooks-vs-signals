import { Component } from './main'
let hooks: unknown[] = []
let idx = 0
export function useState<T>(initialState: T): [T, (newState: T) => void] {
	let state = (hooks[idx] as T) || initialState
	// let state =
	// 	(hooks[idx] as T) ||
	// 	(typeof initialState === 'function'
	// 		? (initialState as () => T)()
	// 		: initialState)
	const _idx = idx
	const setState = (newState: T) => {
		hooks[_idx] = newState
	}
	idx++
	return [state, setState]
}

export function useEffect(fn: () => void | (() => void), deps: unknown[]) {
	const oldDeps = hooks[idx] as unknown[]
	let hasChanged = true

	if (oldDeps) {
		hasChanged = deps.some((dep, i) => !Object.is(dep, oldDeps[i]))
	}
	if (hasChanged) {
		const returnedFn = fn()
		if (typeof returnedFn === 'function') {
			returnedFn()
		}
	}

	hooks[idx] = deps
	idx++
}

export function render(component: typeof Component) {
	idx = 0
	const instance = component()

	instance.render()
	return instance
}
