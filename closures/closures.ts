function getAdd() {
	let foo = 0
	return () => {
		foo++
		return foo
	}
}

const add = getAdd()

console.log(add())
console.log(add())
console.log(add())
console.log(add())
