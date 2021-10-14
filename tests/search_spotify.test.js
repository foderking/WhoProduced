const { search } = require('../services/search_spotify')

describe("Check that searching spotify works", () => {
	const request = {
		normal_body : {
			query: "omerta",
		},
		no_query : {
			limit: 10
		},
		empty_body: {
		},
		query_is_object: {
			query: {}
		},
		type_is_number: {
			query: 'omerta',
			type: 39
		},
		type_is_obj : {
			query: 'omerta',
			type: {}
		},
		limit_is_string: {
			query: 'omerta',
			limit: 'lmao'
		},
		offset_is_string: {
			query: 'omerta',
			offset: 'lmao'
		}
	}

	const response_schema = {
		tracks : {
			href   : expect.stringMatching(/https:\/\/api\.spotify\.com\/v1\/search\?query=.*?&type=.*?&offset=[0-9]+&limit=[0-9]+/),
			next   : expect.stringMatching(/https:\/\/api\.spotify\.com\/v1\/search\?query=.*?&type=.*?&offset=[0-9]+&limit=[0-9]+/),
			limit  : expect.any(Number),
			offset : expect.any(Number),
			total  : expect.any(Number),
			items  : expect.any(Array)
		}
	}

	test('request with normal body', async()=> {
		const res = await search(request.normal_body)
		expect(res).toMatchObject(response_schema)
	})

	// test('request with no query in body', ()=> {
		// const res = await search(request.no_query)
		// await expect(() => {
			// search(request.no_query)
	// }).rejects.toThrow()
		// expect(res).toMatchObject(response_schema)
	// })
	// test('request with empty body', async()=> {
	// 	const res = await search(request.empty_body)
	// 	expect(res).toMatchObject(response_schema)
	// })
	// test('request with wrong query parameter ', async()=> {
	// 	const res = await search(request.query_is_object)
	// 	expect(res).toMatchObject(response_schema)
	// })
	// test('request with type as number', async()=> {
	// 	const res = await search(request.type_is_number)
	// 	expect(res).toMatchObject(response_schema)
	// })
	// test('request with type as object', async()=> {
	// 	const res = await search(request.type_is_obj)
	// 	expect(res).toMatchObject(response_schema)
	// })
	// test('request with wrong limit parameter', async()=> {
	// 	const res = await search(request.limit_is_string)
	// 	expect(res).toMatchObject(response_schema)
	// })
	// test('request with wrong offset parameter', async()=> {
	// 	const res = await search(request.offset_is_string)
	// 	expect(res).toMatchObject(response_schema)
	// })
})