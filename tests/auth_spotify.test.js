
const { GetTokenHeader }  = require("../services/auth_spotify");

describe("Testing spotify authentication", ()=> {
	test("Getting token works in auth_spotify", async() => {
		const token = await GetTokenHeader()

		expect(token).toMatchObject({
			Authorization: expect.stringMatching(/Bearer [a-zA-z0-9_-]+/)
		})
	})

})