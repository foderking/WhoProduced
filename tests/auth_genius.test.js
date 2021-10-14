
const { GetTokenHeader }  = require("../services/auth_genius");

describe("Testing genius authentication", () => {
	test("Getting token works in auth_genius", async() => {
		const token = await GetTokenHeader()

		expect(token).toMatchObject({
			Authorization: expect.stringMatching(/bearer [a-zA-z0-9\-]+/)
		})
	})

})