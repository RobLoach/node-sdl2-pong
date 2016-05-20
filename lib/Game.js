import sdl from 'node-sdl2'
import Entity from './Entity'
import Player from './Player'
import AI from './AI'
import Ball from './Ball'

/**
 * The Game
 */
export default class Game extends Entity {

	/**
	 * Create the game context.
	 */
	constructor() {
		super()

		// Internal properties
		this.quit = false
		this.size.x = 800
		this.size.y = 600
		this.title = 'Node.js SDL2 Pong'

		// Initialize SDL
		if (sdl.SDL_Init(sdl.SDL_INIT_VIDEO) < 0) {
			throw new Error(SDL_GetError())
		}

		// Create the Window
		this.window = sdl.SDL_CreateWindow(
			this.title,
			sdl.SDL_WINDOWPOS_UNDEFINED,
			sdl.SDL_WINDOWPOS_UNDEFINED,
			this.size.x,
			this.size.y,
			sdl.SDL_WINDOW_SHOWN);
		if (this.window.isNull()) {
			throw new Error(sdl.SDL_GetError())
		}

		// Create a renderer to the screen
		this.renderer = sdl.SDL_CreateRenderer(
			this.window,
			-1,
			sdl.SDL_RENDERER_ACCELERATED | sdl.SDL_RENDERER_PRESENTVSYNC);
		if (this.renderer.isNull()) {
			throw new Error(sdl.SDL_GetError())
		}

		this.entities.player1 = new Player(this)
		this.entities.player2 = new AI(this)
		this.entities.ball = new Ball(this)
	}

	/**
	 * When called, will begin the event loop.
	 */
	run() {
		// Event polling
		let e = new sdl.SDL_Event()

		// Calculate the amount of time that has passed since last tick.
		let currentTime = sdl.SDL_GetTicks()
		let oldTime = currentTime
		let deltaTime = 0;

		// Create the event loop.
		while (!this.quit) {
			// Calculate the delta time.
			oldTime = currentTime
			currentTime = sdl.SDL_GetTicks()
			deltaTime = (currentTime - oldTime) / 1000

			// Check for any incoming events.
			while (sdl.SDL_PollEvent(e.ref()) != 0) {
				// Call the event handler.
				this.event(e)
			}

			// Update the game elements.
			this.update(deltaTime)

			// Display the game on the screen.
			this.render()
		}

		// Event loop is complete, so close the game.
		this.destroy()
	}

	/**
	 * Event handler
	 */
	event(e) {
		super.event(e)

		switch (e.type) {
			case sdl.SDL_EventType.SDL_QUIT:
				this.quit = true
			break
			case sdl.SDL_EventType.SDL_KEYDOWN:
				switch (e.key.keysym.scancode) {
					case sdl.SDL_SCANCODE_ESCAPE:
						this.quit = true
					break
				}
		}
	}

	/**
	 * Draw all game elements on the screen.
	 */
	render() {
		// Clear the renderer
		if (sdl.SDL_SetRenderDrawColor(this.renderer, 0, 0, 0, 0xFF) !== 0) {
			throw new Error(sdl.SDL_GetError())
		}
		if (sdl.SDL_RenderClear(this.renderer) !== 0) {
			throw new Error(sdl.SDL_GetError())
		}

		super.render()

		// Present it on the screen
		sdl.SDL_RenderPresent(this.renderer)
	}

	/**
	 * Close the game.
	 */
	destroy() {
		super.destroy()

		// Kill the renderer.
		sdl.SDL_DestroyRenderer(this.renderer)

		// Close the window.
		sdl.SDL_DestroyWindow(this.window)

		// Close the application.
		sdl.SDL_Quit()
	}
}
