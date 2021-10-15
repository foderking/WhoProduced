const { error_table } = require('../services/custom_errors')
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

	it('should work with normal body', async()=> {
		const res = await search(request.normal_body)
		expect(res).toMatchObject(response_schema)
	})

	it('should throw with no query in body', async()=> {
		await expect(search(request.no_query))
			.rejects
			.toHaveProperty('message', error_table.EmptySearchError); 
	})

	it('should throw with empty body', async()=> {
		await expect(search(request.empty_body))
			.rejects
			.toHaveProperty('message', error_table.EmptySearchError); 
	})

	it('should throw with query as object', async()=> {
		await expect(search(request.query_is_object))
			.rejects
			.toHaveProperty('message', error_table.RequestKeyError); 
	})

	it('should throw when type is number', async()=> {
		await expect(search(request.type_is_number))
			.rejects
			.toHaveProperty('message', error_table.RequestKeyError); 
	})

	it('should throw when type is object', async()=> {
		await expect(search(request.type_is_obj))
			.rejects
			.toHaveProperty('message', error_table.RequestKeyError); 
	})

	it('should throw when limit is string', async()=> {
		await expect(search(request.limit_is_string))
			.rejects
			.toHaveProperty('message', error_table.RequestKeyError); 
	})

	it('should throw when offset is string', async()=> {
		await expect(search(request.offset_is_string))
			.rejects
			.toHaveProperty('message', error_table.RequestKeyError); 
	})
})