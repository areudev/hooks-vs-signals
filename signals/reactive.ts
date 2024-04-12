interface Observer {
	execute: () => void
	depedencies: Set<Set<Observer>>
}

let context: Array<Observer> = []

export function untrack(fn: () => {}) {
	const prevContext = context
	context = []
	const res = fn()
	context = prevContext
	return res
}

function subscribe(observer: Observer, subscriptions: Set<Observer>) {
	if (observer.depedencies.has(subscriptions)) return
	subscriptions.add(observer)
	observer.depedencies.add(subscriptions)
}

function cleanup(observer: Observer) {
	for (const dep of observer.depedencies) {
		dep.delete(observer)
	}
	observer.depedencies.clear()
}

export function createSignal<T>(
	initialValue: T
): [() => T, (newValue: T) => void] {
	let subscriptions = new Set<Observer>()

	let value: T = initialValue

	const read = (): T => {
		const observer = context[context.length - 1]
		if (observer) subscribe(observer, subscriptions)

		return value
	}
	const write = (newValue: T): void => {
		value = newValue
		for (const observer of [...subscriptions]) {
			observer.execute()
		}
	}

	return [read, write]
}

export function createEffect(fn: () => void): void {
	const effect = {
		execute() {
			cleanup(effect)
			context.push(effect)
			fn()
			context.pop()
		},
		depedencies: new Set<Set<Observer>>(),
	}

	effect.execute()
}

export function createMemo<T>(fn: () => T): () => T {
	const [signal, setSignal] = createSignal<T>(undefined as any)
	createEffect(() => setSignal(fn()))
	return signal
}
