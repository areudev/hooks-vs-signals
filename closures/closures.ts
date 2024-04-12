import { Component } from './main'
let _state: unknown
export function useState<T>(initialState: T): [T, (newState: T) => void] {
	let state = (_state as T) || initialState
	const setState = (newState: T) => {
		state = newState
	}

	return [state, setState]
}

export function render(component: typeof Component) {
	const instance = component()

	instance.render()
	return instance
}
