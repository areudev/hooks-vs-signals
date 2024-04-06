export function createSignal<T>(
	initialValue: T
): [() => T, (newValue: T) => void] {
	let value: T = initialValue
	const read = (): T => value
	const write = (newValue: T): void => {
		value = newValue
	}

	return [read, write]
}
