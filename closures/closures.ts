export function useState<T>(initialState: T): [() => T, (newState: T) => void] {
	let state = initialState

	const setState = (newState: T) => {
		state = newState
	}

	return [() => state, setState]
}

const [count, setCount] = useState(0)

console.log(count())
setCount(10)
console.log(count())
