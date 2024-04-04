/* eslint-disable @typescript-eslint/no-explicit-any */
import autobase from '../src/index';

const Owner = 'hankliu62';
const Repo = 'vite-plugin-autobase';

// 在你的测试文件中
describe('createPlugin', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules() // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
    process.env.GITHUB_ACTIONS = "TRUE";
    process.env.GITHUB_REPOSITORY = `${Owner}/${Repo}`;
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
    jest.restoreAllMocks(); // 确保在每个测试后恢复所有mock
  });

  test('returns the correct config value', () => {
    const plugin = autobase().config as any;
    const config = plugin({}, { command: 'build' })
    const expectDefine = {
      ["process.env"]: {
        "ROUTE_PREFIX": `/${Repo}`
      }
    }

    expect(config.base).toEqual(`/${Repo}/`);
    expect(config.define).toMatchObject(expectDefine);
  });
});
