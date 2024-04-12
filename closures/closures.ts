import { Component } from './main'
let hooks: unknown[] = []
let idx = 0
export function useState<T>(initialState: T): [T, (newState: T) => void] {
	let state = (hooks[idx] as T) || initialState
	const setState = (newState: T) => {
		state = newState
	}
	idx++
	return [state, setState]
}

export function render(component: typeof Component) {
	idx = 0
	const instance = component()

	instance.render()
	return instance
}
