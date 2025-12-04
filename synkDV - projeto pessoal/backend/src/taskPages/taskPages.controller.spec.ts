import { Test, TestingModule } from '@nestjs/testing';
import { TaskPagesController } from './taskPages.controller';
import { TaskPagesService } from './taskPages.service';

describe('TaskPagesController', () => {
  let controller: TaskPagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskPagesController],
      providers: [
        {
          provide: TaskPagesService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<TaskPagesController>(TaskPagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
