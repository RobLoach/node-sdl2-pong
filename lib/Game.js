import sdl from 'node-sdl2'

/**
 * The Game
 */
export default class Game {

	/**
	 * Create the game context.
	 */
	constructor() {
		// Internal properties
		this.quit = false
		this.x = 0

		// Initialize SDL
		if (sdl.SDL_Init(sdl.SDL_INIT_VIDEO) < 0) {
			throw new Error(SDL_GetError())
		}

		// Create the Window
		this.window = sdl.SDL_CreateWindow(
			'Node.js SDL2 Pong',
			sdl.SDL_WINDOWPOS_UNDEFINED,
			sdl.SDL_WINDOWPOS_UNDEFINED,
			800,
			600,
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
		this.close()
	}

	/**
	 * Event handler
	 */
	event(e) {
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
	 * Updates the movement of all game elements.
	 */
	update(delta) {
		// TODO: Update all game elements.
		this.x += 20 * delta
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

		// TODO: Render all game elements.
		if (sdl.SDL_SetRenderDrawColor(this.renderer, 0xFF, 0xFF, 0xFF, 0xFF) !== 0) {
			throw new Error(sdl.SDL_GetError())
		}
		let rectToDraw = new sdl.SDL_Rect({
			x: this.x,
			y: 100,
			w: 10,
			h: 150
		})
		sdl.SDL_RenderFillRect(this.renderer, rectToDraw.ref())

		// Present it on the screen
		sdl.SDL_RenderPresent(this.renderer)
	}

	/**
	 * Close the game.
	 */
	close() {
		// Kill the renderer.
		sdl.SDL_DestroyRenderer(this.renderer)

		// Close the window.
		sdl.SDL_DestroyWindow(this.window)

		// Close the application.
		sdl.SDL_Quit()
	}
}
