const context: Array<() => void> = []

export function createSignal<T>(
	initialValue: T
): [() => T, (newValue: T) => void] {
	let subscriptions = new Set<() => void>()

	let value: T = initialValue

	const read = (): T => {
		const observer = context[context.length - 1]
		if (observer) subscriptions.add(observer)

		return value
	}
	const write = (newValue: T): void => {
		value = newValue
	}

	return [read, write]
}
