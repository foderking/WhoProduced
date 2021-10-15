const { error_table } = require("../services/custom_errors");
const { GetTrackGenius } = require("../services/get_track_genius");


describe("Testing that getting specific track from genius works", () => {
	const request = {
		normal : parseInt(Math.random() * 100000),
		string_no: String(parseInt(Math.random() * 100000)),
		string_inv: 'eafakf',
		empty_str: '',
		obj_str: {}
	}
	const response_schema = {
		meta : {
			status: expect.any(Number)
		},
		response: {
			song: {
				api_path: expect.any(String),
				description: expect.any(Object),
				embed_content: expect.any(String),
				full_title: expect.any(String),
				header_image_thumbnail_url: expect.any(String),
				header_image_url: expect.any(String),
				id: expect.any(Number),
				lyrics_owner_id: expect.any(Number),
				path: expect.any(String),
				song_art_image_thumbnail_url: expect.any(String),
				song_art_image_url: expect.any(String),
				title: expect.any(String),
				url: expect.any(String),
				album: expect.any(Object),
				custom_performances: expect.any(Array),
				description_annotation: expect.any(Object),
				primary_artist: expect.any(Object),
				producer_artists: expect.any(Array),
				song_relationships: expect.any(Array),
				writer_artists: expect.any(Array),
			},
		}
	}

	describe("should work", () => {
		it("with normal id", async() => {
			const res = await GetTrackGenius(request.normal)
			console.log('id =>', request.normal)
			expect(res).toMatchObject(response_schema)
		})

		it("with string id", async() => {
			const res = await GetTrackGenius(request.string_no)
			console.log('id =>', request.normal, res)
			expect(res).toMatchObject(response_schema)
		})
	})

	describe("should throw", () => {
		it('with non numeric id', async()=> {
			await expect(GetTrackGenius(request.string_inv))
				.rejects
				.toHaveProperty('message', error_table.RequestKeyError); 
		})

		it('with empty id', async()=> {
			await expect(GetTrackGenius(request.empty_str))
				.rejects
				.toHaveProperty('message', error_table.RequestKeyError); 
		})

		it('with id as object', async()=> {
			await expect(GetTrackGenius(request.obj_str))
				.rejects
				.toHaveProperty('message', error_table.RequestKeyError); 
		})
	})
})