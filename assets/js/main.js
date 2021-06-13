'use strict'

const generate = () => Math.random().toString(36).substring(2)

const draw = () => {
	/** @type {HTMLCanvasElement} */
	const canvas = document.getElementById('canvas')
	const ctx = canvas.getContext('2d')
	const img = document.getElementById('model')
	const text = document.getElementById('text')
	const size = document.getElementById('size')
	const save = document.getElementById('save')
	const sizePreview = document.querySelector('.text-size-preview')
	sizePreview.textContent = size.value

	ctx.canvas.width = img.width
	ctx.canvas.height = img.height
	img.onload = () => {
		ctx.drawImage(img, 0, 0, img.width, img.height)
	}
	img.src = './assets/img/raoult-kenobi.jpg'

	const redraw = () => {
		ctx.font = `${size.value}pt Arial`
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		ctx.drawImage(img, 0, 0, img.width, img.height)
		ctx.fillStyle = 'white'
		ctx.textAlign = 'center'
		ctx.fillText(text.value, (img.width / 2), (img.height - 40))
	}

	text.addEventListener('input', () => redraw())
	size.addEventListener('input', () => {
		redraw()
		sizePreview.textContent = size.value
	})

	save.addEventListener('click', event => {
		event.target.download = `raoult-${generate()}.jpg`
		event.target.href = ctx.canvas.toDataURL('image/jpeg')
	}, false)
}

document.addEventListener('DOMContentLoaded', () => {
	draw()
})
