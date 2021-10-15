const { error_table } = require("../services/custom_errors");
const { GetTrack } = require("../services/get_track_spotify");

describe("Testing that getting specific track from genius works", () => {
	const request = {
		normal : {
			id: "1AHfovSnGPVYKaahRtA0U6"
		}, 
		empty : {
			id: ""
		}, 
	}
	const response_schema = {
		album: {
			album_type: expect.any(String),
			artists: expect.any(Array),
			available_markets: expect.any(Array), 
			external_urls: {
				spotify: expect.any(String),
			},
			href: expect.any(String),
			id: expect.any(String),
			images: expect.any(Array),
			name: expect.any(String),
			release_date: expect.any(String),
			release_date_precision: expect.any(String),
			total_tracks: expect.any(Number),
			type: expect.any(String),
			uri: expect.any(String),
		},
		artists: expect.any(Array),
		available_markets: expect.any(Array),
		disc_number: expect.any(Number),
		duration_ms: expect.any(Number),
		external_ids: { isrc: expect.any(String) },
		external_urls: { spotify: expect.any(String)},
		href: expect.any(String),
		id: expect.any(String),
		name: expect.any(String),
		popularity: expect.any(Number),
		preview_url: expect.any(String),
		track_number: expect.any(Number),
		type: expect.any(String),
		uri: expect.any(String),
	}

	describe("should work", () => {
		it("with normal id", async() => {
			const res = await GetTrack(request.normal)
			// console.log(res)
			expect(res).toMatchObject(response_schema)
		})
	})

	describe("should throw", () => {
		it('with empty id', async()=> {
			await expect(GetTrack(request.empty))
				.rejects
				.toHaveProperty('message', error_table.RequestKeyError); 
		})
	})
})