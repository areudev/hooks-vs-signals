import { useState, render } from './closures'
export function Component() {
	const [count, setCount] = useState(1)
	const [text, setText] = useState('apple')
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
