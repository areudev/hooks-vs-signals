import { useState, render, useEffect } from './closures'
export function Component() {
	const [count, setCount] = useState(1)
	const [text, setText] = useState('apple')

	useEffect(() => {
		console.log('effect')

		return () => {
			console.log('cleanup')
		}
	}, [text])

	return {
		render: () => {
			console.log({
				count,
				text,
			})
		},
		click: () => {
			setCount(count + 1)
		},
		type: (word: string) => {
			setText(word)
		},
	}
}

let app = render(Component)
app.click()

render(Component)

app.type('cherry')

render(Component)
