import { SwModuleModule } from './sw-module.module';

describe('SwModuleModule', () => {
  let swModuleModule: SwModuleModule;

  beforeEach(() => {
    swModuleModule = new SwModuleModule();
  });

  it('should create an instance', () => {
    expect(swModuleModule).toBeTruthy();
  });
});
