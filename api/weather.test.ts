import mapWeatherIdToWeatherType from "./helper/mapWeatherIdToWeatherType";

describe('weather', () => {
  it('returns not null', () => {
    expect(mapWeatherIdToWeatherType(200)).not.toBe(null);
  })
});
