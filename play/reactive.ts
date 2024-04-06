interface Executable {
	execute: () => void
}

const context: Array<Executable> = []

export function createSignal<T>(
	initialValue: T
): [() => T, (newValue: T) => void] {
	let subscriptions = new Set<Executable>()

	let value: T = initialValue

	const read = (): T => {
		const observer = context[context.length - 1]
		if (observer) subscriptions.add(observer)

		return value
	}
	const write = (newValue: T): void => {
		value = newValue
		for (const subscription of subscriptions) {
			subscription.execute()
		}
	}

	return [read, write]
}

export function createEffect(fn: () => void): void {
	const effect = {
		execute() {
			context.push(effect)
			fn()
			context.pop()
		},
	}

	effect.execute()
}
