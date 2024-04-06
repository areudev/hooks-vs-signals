import { createSignal, createEffect } from './reactive'

const [count, setCount] = createSignal(0)

createEffect(() => {
	console.log('count:', count())
})

setCount(5)
setCount(10)
