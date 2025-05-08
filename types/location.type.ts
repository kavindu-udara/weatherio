export interface LocationDetail {
    place_id: number,
    licence: string,
    osm_type: string,
    osm_id: number,
    lat: string,
    lon: string,
    class: string,
    type: string,
    place_rank: number,
    importance: number,
    addresstype: string,
    name: string,
    display_name: string,
    address: {
        country: string,
        country_code: string,
        state?: string
    },
    boundingbox: string[]
}
