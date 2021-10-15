const { error_table } = require("../services/custom_errors");
const { search_genius } = require("../services/search_genius");

describe("Check that searching genius works", () => {
	const request = {
		normal: "Kendrick Lamar",
		empty: "",
		obj: {},
		number:3,
		undefined: null
	}

	const response_schema = {
		meta : {
			status: expect.any(Number)
		},
		response: {
			hits: expect.any(Array)
		}
	}

	it("should work with normal query", async() => {
		const res = await search_genius(request.normal)
		console.log(res)
		expect(res).toMatchObject(response_schema)
	})

	it("should throw on empty query", async() => {
		await expect(search_genius(request.empty))
			.rejects
			.toHaveProperty('message', error_table.EmptySearchError); 
	})

	it("should throw on query that isn't string", async() => {
		await expect(search_genius(request.obj))
			.rejects
			.toHaveProperty('message', error_table.RequestKeyError); 
	})

	it("should throw on query that is undefined", async() => {
		await expect(search_genius(request.undefined))
			.rejects
			.toHaveProperty('message', error_table.EmptySearchError); 
	})
})