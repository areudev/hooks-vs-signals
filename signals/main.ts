import { createSignal, createEffect, createMemo } from './reactive'

const [count, setCount] = createSignal(0)
const [count2, setCount2] = createSignal(2)
const [show, setShow] = createSignal(true)

const sum = createMemo(() => count() + count2())

createEffect(() => {
	console.log('sum:', sum())
})

createEffect(() => {
	if (show()) {
		console.log('count:', count())
	} else {
		console.log('count2:', count2())
	}
})
setShow(false)

setCount(10)
