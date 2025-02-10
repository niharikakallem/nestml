import { Test, TestingModule } from '@nestjs/testing';
import { ProtectedController } from './protect.controller';

describe('ProtectController', () => {
  let controller: ProtectedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProtectedController],
    }).compile();

    controller = module.get<ProtectedController>(ProtectedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
